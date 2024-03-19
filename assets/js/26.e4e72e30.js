(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{313:function(t,s,a){"use strict";a.r(s);var n=a(17),p=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"mediapipe第二课-holist全身识别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mediapipe第二课-holist全身识别"}},[t._v("#")]),t._v(" MediaPipe第二课 : Holist全身识别")]),t._v(" "),s("h2",{attrs:{id:"mediapipe-holist的官方介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mediapipe-holist的官方介绍"}},[t._v("#")]),t._v(" MediaPipe Holist的官方介绍")]),t._v(" "),s("ul",[s("li",[t._v("Holist可以"),s("strong",[t._v("实时感知")]),t._v(" : 人体姿势、面部标志和手部跟踪")]),t._v(" "),s("li",[t._v("实现各种现代生活应用 : 如"),s("strong",[t._v("健身和运动分析、手势控制和手语识别、增强现实")])]),t._v(" "),s("li",[t._v("MediaPipe Holistic "),s("a",{attrs:{href:"https://cloud.tencent.com/developer/article/1693921",target:"_blank",rel:"noopener noreferrer"}},[t._v("pipeline(流水线)"),s("OutboundLink")],1),t._v("集成了"),s("strong",[t._v("姿势、面部和手部组件")]),t._v("的单独模型")])]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"如何应用在python程序中"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何应用在python程序中"}},[t._v("#")]),t._v(" 如何应用在Python程序中")]),t._v(" "),s("ul",[s("li",[t._v('由于大框架可以直接应用, 此处以"'),s("em",[t._v("MP_Holist全身识别(实时视频).py")]),t._v('"为大家演示, 顺带交大家如何调整参数以实现自己需要的结果')])]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" cv2\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" mediapipe "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" mp\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果出现报错 : no moudle named “cv2”, 请自行安装opencv-python库")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果出现报错 : no moudle named “mediapipe”, 请自行安装mediapipe库")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# mp.solutions.drawing_utils用于绘制")]),t._v("\nmp_drawing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("solutions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("drawing_utils\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 参数：1、颜色，2、线条粗细，3、点的半径")]),t._v("\nDrawingSpec_point "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DrawingSpec"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("255")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nDrawingSpec_line "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DrawingSpec"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("255")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# 我的喜好是"绿细线&红点", 大家可以自由调整')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# mp.solutions.holistic是一个类别，是人的整体")]),t._v("\nmp_holistic "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("solutions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("holistic\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 参数：1、是否检测静态图片，2、姿态模型的复杂度，3、结果看起来平滑（用于video有效），4、检测阈值，5、跟踪阈值")]),t._v("\nholistic "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mp_holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("min_detection_confidence"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" min_tracking_confidence"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cap = cv2.VideoCapture('input.mp4')")]),t._v("\ncap "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("VideoCapture"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#笔记本自带摄像头")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" cap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isOpened"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    success"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" image "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" success"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Ignoring empty camera frame."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n    image1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cvtColor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("COLOR_BGR2RGB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 处理RGB图像")]),t._v("\n    results "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("image1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token triple-quoted-string string"}},[t._v("'''\n    mp_holistic.PoseLandmark类中共33个人体骨骼点\n    mp_holistic.HandLandmark类中共21个手部关键点\n    脸部有468个关键点\n    '''")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 绘制")]),t._v("\n    mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("draw_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" results"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("face_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mp_holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("FACEMESH_CONTOURS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_point"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_line"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("draw_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" results"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left_hand_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mp_holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("HAND_CONNECTIONS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_point"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_line"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("draw_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" results"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("right_hand_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mp_holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("HAND_CONNECTIONS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_point"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_line"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    mp_drawing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("draw_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" results"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pose_landmarks"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mp_holistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("POSE_CONNECTIONS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_point"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DrawingSpec_line"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    cv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("imshow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'MediaPipe Holistic'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" cv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("waitKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0xFF")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("ord")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'q'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n\nholistic"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("close"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ncv2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("destroyAllWindows"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ncap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("release"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),t._v(" "),s("h2",{attrs:{id:"概要"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概要"}},[t._v("#")]),t._v(" 概要")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("文章标题")]),t._v(" "),s("th",[t._v("Python文字转语音(调研&成品函数)")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("作者")]),t._v(" "),s("td",[t._v("Master（Mio）")])]),t._v(" "),s("tr",[s("td",[t._v("发布时间")]),t._v(" "),s("td",[t._v("2022年9月1日 23:07:07")])]),t._v(" "),s("tr",[s("td",[t._v("状态")]),t._v(" "),s("td",[t._v("未发布")])]),t._v(" "),s("tr",[s("td",[t._v("阅读量")]),t._v(" "),s("td",[t._v("0")])])])])])}),[],!1,null,null,null);s.default=p.exports}}]);