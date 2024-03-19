(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{319:function(t,s,a){"use strict";a.r(s);var n=a(17),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"如何使用百度菜品识别api识别菜品"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何使用百度菜品识别api识别菜品"}},[t._v("#")]),t._v(" 如何使用百度菜品识别API识别菜品")]),t._v(" "),s("blockquote",[s("h4",{attrs:{id:"在阅读本篇文章之前-你需要掌握python基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在阅读本篇文章之前-你需要掌握python基础"}},[t._v("#")]),t._v(" 在阅读本篇文章之前, 你需要掌握Python基础")])]),t._v(" "),s("h2",{attrs:{id:"_01-注册-登录百度账号"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_01-注册-登录百度账号"}},[t._v("#")]),t._v(" 01 注册/登录百度账号")]),t._v(" "),s("p",[t._v("进入"),s("a",{attrs:{href:"https://ai.baidu.com/tech/imagerecognition/dish",target:"_blank",rel:"noopener noreferrer"}},[t._v("百度AI开放平台-菜品识别官网"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v('点击该页面的 "'),s("strong",[t._v("控制台")]),t._v('" 进行登陆操作')]),t._v(" "),s("p",[s("a",{attrs:{href:"https://ai.baidu.com/tech/imagerecognition/dish",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://www.helloimg.com/images/2022/10/02/ZKYx5X.png",alt:"百度智能平台入口"}}),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"_02-进入官方文档查看代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_02-进入官方文档查看代码"}},[t._v("#")]),t._v(" 02 进入官方文档查看代码")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://ai.baidu.com/ai-doc/IMAGERECOGNITION/tk3bcxbb0",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方帮助文档 > 图像识别"),s("OutboundLink")],1)]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 官方提供的python代码, 以此为例进行讲解")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" requests\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" base64\n"),s("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v("'''\n菜品识别\n'''")]),t._v("\n\nrequest_url "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://aip.baidubce.com/rest/2.0/image-classify/v2/dish"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 二进制方式打开图片文件")]),t._v("\nf "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[本地文件]'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'rb'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nimg "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" base64"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("b64encode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nparams "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"image"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("img"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"top_num"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v("'''\n------------------------------\nparams存储的是请求参数\n请参照图1.1, 修改你需要的请求参数\n------------------------------\n'''")]),t._v("\naccess_token "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[调用鉴权接口获取的token]'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v("'''\n----------------------------------\naccess_token的获取方法请见代码块1.2\n----------------------------------\n'''")]),t._v("\nrequest_url "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" request_url "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"?access_token="')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" access_token\nheaders "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-type'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/x-www-form-urlencoded'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nresponse "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" requests"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("post"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request_url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("params"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" headers"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("headers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("json"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"下面这张图片展示了请求参数如何使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下面这张图片展示了请求参数如何使用"}},[t._v("#")]),t._v(" 下面这张图片展示了"),s("em",[t._v("请求参数如何使用")])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://ai.baidu.com/ai-doc/IMAGERECOGNITION/tk3bcxbb0#%E8%AF%B7%E6%B1%82%E8%AF%B4%E6%98%8E",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://www.helloimg.com/images/2022/10/02/ZKYEmg.png",alt:"百度菜品识别-传入参数表"}}),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"运行如下代码即可获取assess-token"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行如下代码即可获取assess-token"}},[t._v("#")]),t._v(" 运行如下代码即可获取assess_token")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" requests\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" json\n\nurl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://aip.baidubce.com/oauth/2.0/token"')]),t._v("\ndata "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'grant_type'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'client_credentials'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'client_id'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[自己的API Key]'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'client_secret'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[自己的Secret Key]'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nresponse "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" requests"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("post"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ntemp1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" json"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loads"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("f\"\\n\\n 'access_token': ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("temp1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'access_token'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("blockquote",[s("h4",{attrs:{id:"如何查看自己的api-key和secret-key"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何查看自己的api-key和secret-key"}},[t._v("#")]),t._v(" 如何查看自己的API Key和Secret Key?")]),t._v(" "),s("h6",{attrs:{id:"参考自百度帮助文档-通用参考-鉴权认证机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考自百度帮助文档-通用参考-鉴权认证机制"}},[t._v("#")]),t._v(" 参考自"),s("a",{attrs:{href:"https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu",target:"_blank",rel:"noopener noreferrer"}},[t._v("百度帮助文档 >通用参考 >鉴权认证机制"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("API Key、Secret Key 均可在百度智能云控制台"),s("a",{attrs:{href:"https://console.bce.baidu.com/ai/#/ai/imagerecognition/app/list",target:"_blank",rel:"noopener noreferrer"}},[s("strong",[t._v("人工智能-图像识别的应用列表")]),t._v(" "),s("OutboundLink")],1),t._v(" 处获取，"),s("br"),t._v(" "),s("a",{attrs:{href:"https://console.bce.baidu.com/ai/#/ai/imagerecognition/app/list",target:"_blank",rel:"noopener noreferrer"}},[t._v("若无应用, 请先进行创建"),s("OutboundLink")],1)])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://console.bce.baidu.com/ai/#/ai/imagerecognition/app/list",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://www.helloimg.com/images/2022/10/02/ZKYep9.png",alt:"百度控制台-创建应用"}}),s("OutboundLink")],1)]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("恭喜你, 已经学会了如何使用API了, 照着教程来做, 在5min内可以操作完毕"),s("br"),t._v("\n效果如下")]),t._v(" "),s("h4",{attrs:{id:"input"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#input"}},[t._v("#")]),t._v(" INPUT:")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://www.helloimg.com/images/2022/10/02/ZKYXSY.jpg",alt:"输入: 鱼香肉丝"}})]),t._v(" "),s("h4",{attrs:{id:"output"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output"}},[t._v("#")]),t._v(" OUTPUT:")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出结果")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'result_num'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'result'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'鱼香肉丝'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'154'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'probability'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.926121'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'has_calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'肉丝饭'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'268'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'probability'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.0239723'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'has_calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'酱肉丝'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'240'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'probability'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.0215441'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'has_calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'盖浇饭'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'probability'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.00481077'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'has_calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'青椒肉丝'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'99'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'probability'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0.0038566'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'has_calorie'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'log_id'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1576584966891078767")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"以下是参数说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#以下是参数说明"}},[t._v("#")]),t._v(" 以下是参数说明:\n"),s("a",{attrs:{href:"https://ai.baidu.com/ai-doc/IMAGERECOGNITION/tk3bcxbb0#%E8%BF%94%E5%9B%9E%E8%AF%B4%E6%98%8E",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://www.helloimg.com/images/2022/10/02/ZKY3oE.png",alt:"百度菜品识别-传出参数表"}}),s("OutboundLink")],1)]),t._v(" "),s("div",{staticStyle:{color:"hotpink","text-align":"center"}},[s("div",[t._v('那么以上就是"五分钟入门百度API菜品识别"的全部内容了')]),t._v(" "),s("div",[t._v("如果你有好的建议或者idea, 欢迎到 "),s("a",{staticStyle:{"font-weight":"bolder"},attrs:{href:"http://huangxinyuan.cn/BaiDuAPI-dish"}},[t._v("原帖下留言")])]),t._v(" "),s("div",[t._v("最后由黄鑫远编辑于2022/10/2  23:01")]),t._v(" "),s("div",[s("h2",{attrs:{id:"概要"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概要"}},[t._v("#")]),t._v(" 概要")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("文章标题")]),t._v(" "),s("th",[t._v("Python文字转语音(调研&成品函数)")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("作者")]),t._v(" "),s("td",[t._v("Master（Mio）")])]),t._v(" "),s("tr",[s("td",[t._v("发布时间")]),t._v(" "),s("td",[s("strong",[t._v("2022年10月2日 23:09")])])]),t._v(" "),s("tr",[s("td",[t._v("状态")]),t._v(" "),s("td",[t._v("已发布")])]),t._v(" "),s("tr",[s("td",[t._v("阅读量")]),t._v(" "),s("td",[t._v("662")])])])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);