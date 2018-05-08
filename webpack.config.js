const path=require('path')  //绝对路径（保证不出错误），path是nodejs里的一个基本包

const HTMLPlugin = require('html-webpack-plugin') //载入插件

const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin') //用来把非js的文件打包成静态资源文件
const isDev=process.env.NODE_ENV ==='development'  //设置变量，（===）是否等于development

const config={
    target:'web',  //指明目标是web界面
    entry:path.join(__dirname,'src/index.js'),  //入口:设置当前目录下的绝对路径
    output:{
        filename:'bundle.[hash:8].js',  //输出出口的文件名
        path:path.join(__dirname,'dist') //设置出口文件的绝对路径（当前目录，文件夹名）
    },
    module:{
        rules:[
            {
                test:/\.vue$/,  //正则表达式，表明是以.vue结尾的文件, \用来转义
                loader:'vue-loader'  //使用该文件来处理.vue类型的文件
            },
            {
                test:/\.css$/,  //声明css文件
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'

            },            
            {
                test:/\.(gif|jpg|svg|png|jpeg)$/,
                use:{
                    loader:'url-loader',  //可配置选项,判断图片大小来选择文件输出方式
                    options:{  //对象声明指定输出方式
                        limit:1024,    //当图片大小小于1024kb时，自动存储为base64代码，写到代码里，减少http请求
                        name:'[name]-aa.[ext]'  //指定输出图片文件的名字
                    }                    
                }
            }
        ]
    },
    plugins:[      //plugin的基础配置
        new webpack.DefinePlugin({   //判断环境，使用变量进行区分，在打包时使用正式环境
            'process.env':{
                NODE_ENV:isDev?'"development"' : '"production"'  //双引号一定要加
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){   //配置
    config.module.rules.push({  //开发环境
        test:/\.styl/,    //css预处理器stylus,配置要区分环境
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true,
                }
            },
            'stylus-loader'
        ]

    }),
    config.devtool='#cheap-module-eval-source-map',  //帮助调试代码
    config.devServer={    //配置对象
        port:8080,      //设置启动服务监听的端口
        host:'0.0.0.0', //监听，可通过本机的内网IP访问，也可通过外网访问
        overlay:{   //设置当编译出现错误时把错误展示在网页上，便于随时查看
            errors:true
        },
        hot:true  //编译时只刷新更新部分，热加载
       // open:true   //设置启动webpack dev server时自动打开浏览器
    },
    config.plugins.push(  //
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin() //减少一些不必要的信息的展示
    )
} else{
    //config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({   //正式环境配置
        test:/\.styl/,    //css预处理器stylus
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true,
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
    )
}
module.exports=config