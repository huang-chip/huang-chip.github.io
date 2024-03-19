/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "60bc532499ab97e6ca679f468492a546"
  },
  {
    "url": "assets/css/0.styles.6f404eb7.css",
    "revision": "f2bede69bf687ed44fe20c73a3981146"
  },
  {
    "url": "assets/img/bg01.jpg",
    "revision": "52e1e09569dcc9ac38ae79676d95f801"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/vue.png",
    "revision": "185df28da6fb7ce44fea66d9f6ab694f"
  },
  {
    "url": "assets/js/1.1b0facc3.js",
    "revision": "1c7ae0e52a6bd8fef946249c64a67c0f"
  },
  {
    "url": "assets/js/10.7a73e9aa.js",
    "revision": "ac1830d830f4a5ddc545b8f5702d453c"
  },
  {
    "url": "assets/js/11.739f777f.js",
    "revision": "ca6714b329f56a5edbbe03bd96298169"
  },
  {
    "url": "assets/js/12.4624cd9b.js",
    "revision": "0b4d3296d58ec64db1b9259e603a71fa"
  },
  {
    "url": "assets/js/13.d19fbe91.js",
    "revision": "370da169fdc72b6a01833d0af940029c"
  },
  {
    "url": "assets/js/14.ab193c6d.js",
    "revision": "40fc4654a1d419a661923605f3c9226c"
  },
  {
    "url": "assets/js/15.690aaeb4.js",
    "revision": "7c1f51c75e2106597bc706ce1b5c99be"
  },
  {
    "url": "assets/js/16.78cf9935.js",
    "revision": "8dd5523775cde7514f8ec6893f45168f"
  },
  {
    "url": "assets/js/17.fe0bb0d4.js",
    "revision": "4dd9a6646bfdecc65134817c0ae0c26e"
  },
  {
    "url": "assets/js/18.5c461771.js",
    "revision": "8d0d25194b9f6ce0954dfa28086c7d0a"
  },
  {
    "url": "assets/js/19.85d5b285.js",
    "revision": "dccdc2acbe300af29f38cb02d1e96220"
  },
  {
    "url": "assets/js/2.e7059012.js",
    "revision": "f19aa2c024b6c34d9efa19fa015a461d"
  },
  {
    "url": "assets/js/20.1c3bf0da.js",
    "revision": "fd5300cf1d7e09306e369e80e934e40b"
  },
  {
    "url": "assets/js/21.026684e0.js",
    "revision": "5ef6d3c4e2e5a7c91d029665edeb38f2"
  },
  {
    "url": "assets/js/22.e6bd54ae.js",
    "revision": "a9be0563b791d28b92492cbfba524873"
  },
  {
    "url": "assets/js/23.2de2723d.js",
    "revision": "a097ec8da1e59f0d87fab5504f0f2e66"
  },
  {
    "url": "assets/js/24.69c05c7b.js",
    "revision": "59cc5de0296eef81f4ba23e83314897e"
  },
  {
    "url": "assets/js/25.7385a7e9.js",
    "revision": "b8705c37c10325fda0b4e30283405065"
  },
  {
    "url": "assets/js/26.e4e72e30.js",
    "revision": "b2463f7c86c536298e46bd1f28b54e8a"
  },
  {
    "url": "assets/js/27.45bbd4a6.js",
    "revision": "8d142ffa8d8bd89a572ba051387e6bc2"
  },
  {
    "url": "assets/js/28.f20c322b.js",
    "revision": "528fb578bf27c49384826301588613d6"
  },
  {
    "url": "assets/js/29.8a51d969.js",
    "revision": "98e30593661aaf48e177cd4315cf7c96"
  },
  {
    "url": "assets/js/3.218ffbac.js",
    "revision": "fa4c6c059a57f37b2d2b9ab023a34091"
  },
  {
    "url": "assets/js/30.fc78cc99.js",
    "revision": "4a69feef6c63665d32ed4b2c1aae9201"
  },
  {
    "url": "assets/js/31.ca625784.js",
    "revision": "139eba34c72b31c15489e306e14af4db"
  },
  {
    "url": "assets/js/32.ed19234b.js",
    "revision": "2b3bf4044582de039407a774265b4abe"
  },
  {
    "url": "assets/js/33.556541dc.js",
    "revision": "4952542d987eaf69b1eac7e64a045603"
  },
  {
    "url": "assets/js/34.417db715.js",
    "revision": "8148064d9d4ffbec835cc0fceab28566"
  },
  {
    "url": "assets/js/35.d7024578.js",
    "revision": "d1b8780a38472e3d390fd6051c0458b9"
  },
  {
    "url": "assets/js/36.4ffad35f.js",
    "revision": "52449d3fb629fb72c96c57d7b38a7645"
  },
  {
    "url": "assets/js/4.a7aeb368.js",
    "revision": "5bc970ee643f598fd3efabebcb1fb556"
  },
  {
    "url": "assets/js/5.6fb317e7.js",
    "revision": "52e10948c2eb8e28d542adf98a5aeb6d"
  },
  {
    "url": "assets/js/6.16b2dcbe.js",
    "revision": "77d35d09e7a6455e783bce48fa464e7d"
  },
  {
    "url": "assets/js/7.152620db.js",
    "revision": "5c62e1b02479d947b90e4645d980ad8b"
  },
  {
    "url": "assets/js/app.410475a6.js",
    "revision": "2eafabebda79281d6837d1c22ff05179"
  },
  {
    "url": "assets/js/vendors~docsearch.03d43e08.js",
    "revision": "d5220e24c285820e35c659e1cd654c22"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "66fec6638f82b87f449fec65ec494dd9"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "013e98869f016fc6422f3a972d5f21e4"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "ca796f4e97c2d29b9890009cf8f02ed6"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "b8d32489de342303c14e8433f50d7c40"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "7986832a23bf4d656eed82c86e4e1da4"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "30569e9865c982c4d5198082944dac33"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "c82cb07419b7509aeec8e91bb8ff4fd3"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "973fbcd183dc7dcc5d3d0907e2284a44"
  },
  {
    "url": "index.html",
    "revision": "12326d107e8fcc87546218c2c3f3ba8b"
  },
  {
    "url": "python/index.html",
    "revision": "696fb7bd17bbd9fb3bd313268249ca63"
  },
  {
    "url": "python/Jupyter Notebook 三分钟安装指南.html",
    "revision": "5605f651a4b169bb9b795b2a11a73505"
  },
  {
    "url": "python/MediaPipe库入门教程-Part1(初识)  前置环境安装.html",
    "revision": "d93e453f6497cc10a64ccaeeb3c75816"
  },
  {
    "url": "python/MediaPipe第二课  Holist全身识别.html",
    "revision": "4b9e2d0adb99df10181538982bd29c27"
  },
  {
    "url": "python/Python文字转语音(调研&成品函数).html",
    "revision": "e9266f3d6b63a2a24ea629c467e33ff5"
  },
  {
    "url": "python/Python环境三分钟安装指南.html",
    "revision": "783e758594b5f2daded9ca57fe8bcc59"
  },
  {
    "url": "python/十个例子带你入门ssd1306屏幕(mircopython).html",
    "revision": "779112bd5d0a0a3883ac9bacdcb3406c"
  },
  {
    "url": "python/听说你想在程序退出前执行代码.html",
    "revision": "6381b02f417a59605b8a732f7f653f16"
  },
  {
    "url": "python/如何使用百度菜品识别API识别菜品.html",
    "revision": "cf2344ae0ce3b8d7fce686054d781a3a"
  },
  {
    "url": "python/我的单片机之旅00-树莓派Pico开发软件安装及烧录(flash).html",
    "revision": "fc26f8550d17630755190bddaa2e43b0"
  },
  {
    "url": "python/我的单片机之旅01-超声波.html",
    "revision": "0f2cbfb8afb0ec4c093c2ee29397b666"
  },
  {
    "url": "python/短篇小说阅读器(github个人项目)--说明书.html",
    "revision": "3eed38994ed0a802fe7254e7ca09a00d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
