# custom-cli

自定义项目开发脚手架
脚手架开发完毕后可上传到 npm 库进行线上下载安装 ##本地测试
项目目录下执行命令如下：

```
npm install
npm link/sudo npm link （删除npm链接   npm unlink）
itcustom init tpl-a <project-name>
```

## 命令行参数设置

```
itcustom -h|--help 查看帮助
itcustom -V|--version 查看工具版本
itcustom list 列出所有可用模板
itcustom init <template-name>  <project-name> 初始化可用模板
```

## npm 发包教程

```
1、打开npmjs.com官网
2、注册一个npm账号
3、在npm检索是否有重名的包名
4、将package.json中的name修改为发布到npm的包名（和本地项目名称无关）
5、打开控制台，执行 npm login 在控制台登录login
6、登录成功后，在项目下执行npm publish发布
```
