const HtmlWebPackPlugin = require('html-webpack-plugin') //这个插件的作用是根据模板自动生成index文件
const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') //vue-loader的使用
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './index.html'), //根据指导的模板
  filename: 'index.html' // 生成的内存中首页的名称
})

module.exports = {
  mode: 'development',
  // context: path.resolve(__dirname,'./src'), //context是webpack编译时候的基础目录，入口起点（entry）会相对于此目录查找；若不配置，则默认值为当前目录
  entry: './src/main.js',
  //输出配置
  output: {
    path: path.resolve(__dirname,'./dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //.js,.vue,.json文件可以忽略后缀，按先后顺序查找
    alias: {
      'vue$': 'vue/dist/vue.min.js', //主要改变import vue时的指向。别名
      '@': path.join(__dirname, './src'),
      'src': path.join(__dirname, './src'),
      'views': path.join(__dirname, './src/views')
    }
  },
  //loader规则
  module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
  },
  plugins: [
    htmlPlugin,
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin() //热更新
  ],
  // devtoll: 'cheap-module-eval-source-map', //主要用户更快的构建速度
  // 服务器配置
  devServer: { //webpack-dev-server相关配置
      open: true, //自动打开浏览器
      port: 8088, //服务器端口号
      host: 'localhost', //服务器显示的地址
      contentBase: false, //服务器加载的目录，会自动找到该目录下的index.html文件进行页面展示
      hot: true, //页面的刷新方式,inline为自动刷新，hot为模块热替换刷新;如果你的项目中使用了热模块替换机制，HotModuleReplacementPlugin插件会自动添加到项目中，而不需要再在配置文件中做添加。
      // porxy: {//配置代理，因为是前后端分离，所以在调试的时候需要这个代理的配置才能向后台取数据，重命名可解决跨域
      //   '/': {//代理所有的Url请求
      //       target: 'http://192.168.4.70:2222' //代理的地址
      //   }
      // }
      proxy: {},
      compress: false, //采用gzip压缩。优点：对js,css资源的压缩率很高，可以极大的提高文件传输的速度，从而提升web性能；缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载。
      overlay: {// 用于在浏览器输出编译错误的，默认是关闭的，需要手动打开,warnings设置为true后可将警告一同打印出来
        warnings: true, 
        errors: true
      },
      historyApiFallback: {// 用来应对返回404页面时定向到特定页面用的。
          rewrites: [ // 语法是historyApiFallback对象中的rewrites属性传一个对象格式
            {
              form: '.*',
              to: '/404.html'
            }
          ]
      }
  }
}