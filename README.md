# 组件库

基于公司内部系统列表和表单开发，
目前内部版本已适配公司框架和从属于公共组件库
开源版本，可直接下载使用

兼容性：
兼容IE8以上，chrome，Firefox，safari等浏览器

第一版是基于jq+rq开发的，可以直接引入js和css,给一个文件开放一个入口，减少使用者的学习成本，不需要去关心文件之间的引用关系，只需关注入口文件就可以了。

后续升级可以采用npm包引入方式，或者采用ES6进行改写，毕竟如果vue里套jq有点别扭。



## docs里面是文档说明

## mudules是组件

Message全局提示
codemirror
calendar日历选择
    日历引入git上的组件进行二次封装，根据需求在原组件做了修改


### src/scss

src/scss 里面是scss-mini库是一个基于scss的小框架，其提供了很多简洁的CSS写法
API文档地址 当前工程/src/scss/index.html

#### tools里面是一些可视化的工具


