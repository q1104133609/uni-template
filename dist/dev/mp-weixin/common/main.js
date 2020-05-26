(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {

__webpack_require__(/*! uni-pages */ 4);

__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

__webpack_require__(/*! ./assets/scss/common.scss */ 15);

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 266));

__webpack_require__(/*! @/assets/colorui/main.css */ 12);

__webpack_require__(/*! @/assets/colorui/icon.css */ 13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//把vuex定义成全局组件
_vue.default.prototype.$store = _store.default;
_vue.default.config.productionTip = false;
var app = new _vue.default(_objectSpread({}, {
  mpType: 'app',
  globalData: {
    StatusBar: 0,
    CustomBar: 0
  },
  onLaunch: function onLaunch() {
    var info = uni.getSystemInfoSync();
    var custom = uni.getMenuButtonBoundingClientRect();
    var that = this;
    this.$store.commit('setStatusBar', info.statusBarHeight);
    this.$store.commit('setCustomBar', custom.bottom + custom.top - info.statusBarHeight);
    that.globalData.StatusBar = info.statusBarHeight;
    that.globalData.CustomBar = custom.bottom + custom.top - info.statusBarHeight;
  },
  onShow: function onShow() {
    console.log('App Show');
  },
  onHide: function onHide() {
    console.log('App Hide');
  }
}, {
  store: _store.default
}));
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map