#vue项目公共组件
#1、目录结构
  |_dist：存放打包后的文件
  |_src：项目前端编写目录
  |_App.vue：第一个vue模板文件，编写内容是否成功
  |_main.js：入口文件
  |_index.html：vue的模板文件（为空的html5）
  |_package.json：npm安装依赖文件
  |_webpack.config.js：wepack配置
  |_.babelrc 用来设置转码的规则和插件，在执行babel-loader的时候默认会去读.babelrc中的配置。
  |_.gitignore忽略文件
#2、部分依赖包文件说明
    #(1)loader说明
      babel-loader:babel基于webpack主要用于解析的loader
      vue-loader:解析和转换.vue文件，提取出其中的逻辑代码script、样式代码style、以及HTML模板template,再分别把它们交给对应的Loader去处理。
      css-loader:加载由vue-loader提取出的CSS代码。