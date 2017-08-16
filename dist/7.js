webpackJsonp([7],{

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(654)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(606),
  /* template */
  __webpack_require__(639),
  /* scopeId */
  "data-v-08afbd89",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_message_js__ = __webpack_require__(215);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            loading: true,
            message: {
                id: undefined,
                senderType: undefined,
                senderId: undefined,
                senderName: undefined,
                title: undefined,
                body: undefined,
                createTime: undefined,
                senderInfo: undefined
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            this.loading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_message_js__["b" /* getMessageById */])(this.$route.params.id).then(res => {
                this.message = res;
                if (!res.isRead) {
                    this.$store.commit('DECREASE_MESSAGE_NUMBER_BY_TYPE', res.senderType);
                }
            }).catch(res => {
                if (res.code == 404) this.$router.replace({ path: '/404' });
            }).finally(() => {
                this.loading = false;
            });
        }
    }
});

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".container[data-v-08afbd89]{border:1px solid #eee}.title-container[data-v-08afbd89]{padding:10px;background-color:#f5f7fa;border-bottom:1px solid #eee}.body-container[data-v-08afbd89]{padding:20px 10px}h1[data-v-08afbd89]{padding-top:6px;margin-top:0;margin-bottom:5px;white-space:normal;word-wrap:break-word;word-break:break-all;outline:0;font-size:15px;line-height:normal;font-weight:700}.subtitle[data-v-08afbd89]{color:#a8adb8;font-size:13px;line-height:19px}.sender-name[data-v-08afbd89]{color:#20a0ff;font-weight:700}.sender-name[data-v-08afbd89]:hover{cursor:pointer}.send-time[data-v-08afbd89]{color:#7f7f7f}", ""]);

// exports


/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "container"
  }, [_c('el-popover', {
    ref: "info",
    attrs: {
      "placement": "right",
      "width": "200",
      "trigger": "hover"
    }
  }, [(_vm.message.senderType == 1) ? _c('div', [_c('div', [_vm._v("邮箱：" + _vm._s(_vm.message.senderInfo.email))]), _vm._v(" "), _c('div', [_vm._v("昵称：" + _vm._s(_vm.message.senderInfo.nickname))])]) : (_vm.message.senderType == 2) ? _c('div', [_c('div', [_vm._v("名称：" + _vm._s(_vm.message.senderInfo.name))]), _vm._v(" "), _c('div', [_vm._v("电话：" + _vm._s(_vm.message.senderInfo.phone))]), _vm._v(" "), _c('div', [_vm._v("地址：" + _vm._s(_vm.message.senderInfo.location))]), _vm._v(" "), _c('div', [_vm._v("管理员姓名：" + _vm._s(_vm.message.senderInfo.adminName))]), _vm._v(" "), _c('div', [_vm._v("管理员电话：" + _vm._s(_vm.message.senderInfo.adminPhone))])]) : (_vm.message.senderType == 3) ? _c('div', [_c('div', [_vm._v("姓名：" + _vm._s(_vm.message.senderInfo.name))]), _vm._v(" "), _c('div', [_vm._v("昵称：" + _vm._s(_vm.message.senderInfo.username))]), _vm._v(" "), _c('div', [_vm._v("手机号：" + _vm._s(_vm.message.senderInfo.phone))]), _vm._v(" "), _c('div', [_vm._v("身份证号：******")]), _vm._v(" "), _c('div', [_vm._v("地址：" + _vm._s(_vm.message.senderInfo.location))]), _vm._v(" "), _c('div', [_vm._v("邮编：" + _vm._s(_vm.message.senderInfo.postcode))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "title-container"
  }, [_c('h1', [_vm._v(_vm._s(_vm.message.title))]), _vm._v(" "), _c('div', {
    staticClass: "subtitle"
  }, [_vm._v("发件人: "), _c('span', {
    directives: [{
      name: "popover",
      rawName: "v-popover:info",
      arg: "info"
    }],
    staticClass: "sender-name"
  }, [_vm._v(_vm._s(_vm.message.senderName))])]), _vm._v(" "), _c('div', {
    staticClass: "subtitle"
  }, [_vm._v("时   间: "), _c('span', {
    staticClass: "send-time"
  }, [_vm._v(_vm._s(_vm.message.createTime))])])]), _vm._v(" "), _c('div', {
    staticClass: "body-container"
  }, [_vm._v(_vm._s(_vm.message.body))])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(617);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("4303078e", content, true);

/***/ })

});
//# sourceMappingURL=7.js.map?d380096acd37bbd2184e