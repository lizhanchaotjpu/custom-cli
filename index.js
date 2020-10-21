#! /usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')
const logSymbols = require('log-symbols')
const download = require('download-git-repo')
const spinner = ora('模板初始化中...')
const templates = {
  'tpl-a': {
    url: 'https://github.com/xxxxx/tpl-a.git', //github模板地址
    downloadUrl: 'https://github.com:(用户名)/tpl-a#分支', //github模板下载地址
    des: 'a模板'
  },
  'tpl-b': {
    url: 'https://github.com/xxxxx/tpl-b.git',
    downloadUrl: 'https://github.com:(用户名)/tpl-b#分支',
    des: 'b模板'
  },
  'tpl-c': {
    url: 'https://github.com/xxxxx/tpl-c.git',
    downloadUrl: 'https://github.com:(用户名)/tpl-c#分支',
    des: 'c模板'
  }
}

program.version('0.1.0')
// itcast init a a-name
// 基于a板初始化项目
// itcast init b b-name
// 基于b板初始化项目
program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    const { downloadUrl } = templates[templateName]
    spinner.start()
    // download(仓库地址，下载路径)
    download(downloadUrl, projectName, { clone: true }, err => {
      if (err) {
        spinner.fail()
        console.log(logSymbols.error, chalk.red(err))
        return
      }
      spinner.succeed()
      console.log(logSymbols.success, chalk.green('初始化模板成功'))
      // 使用模板引擎解析数据
      inquirer
        .prompt([
          { type: 'input', name: 'name', message: '请输入名称' },
          { type: 'input', name: 'description', message: '请输入描述' },
          { type: 'input', name: 'author', message: '请输入作者' }
        ])
        .then(answers => {
          const packagePath = `${projectName}/package.json`
          const packageContent = fs.readFileSync(packagePath, 'utf8')
          const packageResult = handlebars.compile(packageContent)(answers)
          fs.writeFileSync(packageResult, packageContent)
          console.log(logSymbols.success, chalk.green('初始化模板成功'))
        })
    })
  })
program
  .command('list')
  .description('查看所有可用模板')
  .action(function () {
    for (let key in templates) {
      console.log(`${key} ${templates[key].des}`)
    }
    console.log(`
    a a模板
    b b模板
    c c模板
    `)
  })

program.parse(process.argv)
