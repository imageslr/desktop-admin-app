webpackJsonp([2],{

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(665)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(607),
  /* template */
  __webpack_require__(649),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 605:
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


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['senderType'],
    data: () => {
        return {
            tableLoading: false,
            pageSize: 15,
            messages: []
        };
    },
    computed: {
        total() {
            return this.$store.getters.messageNumbers[this.senderType - 1].total;
        },
        unReadTotal() {
            return this.$store.getters.messageNumbers[this.senderType - 1].unReadTotal;
        },
        currentPage() {
            return parseInt(this.$route.query.p) || 1;
        }
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        // 获取数据
        fetchData() {
            this.tableLoading = true;
            var params = {
                sender_type: this.senderType,
                start: (this.currentPage - 1) * this.pageSize,
                count: this.pageSize
            };
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_message_js__["a" /* getMessages */])(params).then(res => {
                this.messages = res.items;
                this.$store.commit('SET_MESSAGE_NUMBER_BY_TYPE', {
                    senderType: this.senderType,
                    total: res.total,
                    unReadTotal: res.unReadTotal
                });
            }).finally(() => this.tableLoading = false);
        },
        // 刷新页面
        refresh() {
            this.$router.replace({ path: '', query: { t: Date.now() } });
        },
        navigateToDetail(row) {
            this.$router.push({
                name: '消息详情',
                params: { id: row.id }
            });
        },
        navigateToPage(page) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    p: page
                }
            });
        },
        rowClassName(row) {
            return row.isRead == 0 ? 'unread' : '';
        },
        formatTime(row) {
            var apz = this.addPrefixZero;
            var date = new Date(row.createTime);
            var today = new Date();

            if (date.getFullYear() == today.getFullYear()) {
                if (date.getMonth() == today.getMonth() && date.getDate() == today.getDate()) {
                    return '今天' + apz(date.getHours()) + ': ' + apz(date.getMinutes());
                } else if (this.isYesterDay(date, today)) {
                    return '昨天' + apz(date.getHours()) + ': ' + apz(date.getMinutes());
                }
                return date.getMonth() + 1 + '月' + date.getDate() + '日';
            }
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        },
        isYesterDay(date, today) {
            var month1 = date.getMonth() + 1;
            var month2 = today.getMonth() + 1;
            var date1 = date.getDate();
            var date2 = today.getDate();
            if (month1 == month2 && date1 == date2 - 1) {
                return true;
            } else if (month1 == month2 - 1 && date2 == 1) {
                if (month1 == 2 && date1 < 28) return false;
                return [1, 3, 5, 7, 8, 10, 12].some(i => i == month1 && date1 == 31) || [2, 4, 6, 9, 11].some(i => i == month1 && date1 == 30);
            }
            return false;
        },
        addPrefixZero(num) {
            return num < 10 ? '0' + num : num;
        },
        showTip() {
            this.$notify.info({
                title: '提示',
                message: '这里展示了各个平台用户的意见反馈，选择邮件可查看详情'
            });
        }
    }
});

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageBox_vue__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__MessageBox_vue__);
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
    components: {
        MessageBox: __WEBPACK_IMPORTED_MODULE_0__MessageBox_vue___default.a
    },
    data() {
        return {
            tabs: [{
                label: "Wiki系统",
                type: '1',
                name: 'wiki'
            }, {
                label: "图书馆",
                type: '2',
                name: 'library'
            }, {
                label: "小程序",
                type: '3',
                name: 'wechat'
            }]
        };
    },
    computed: {
        numbers() {
            return this.$store.getters.messageNumbers.map(i => i.unReadTotal);
        },
        currentName() {
            return this.$route.params.name;
        }
    },
    methods: {
        click(e) {
            // hack方法，如果直接push会报错：offsetWidth undefined   
            this.$nextTick().then(() => {
                this.$router.push({ name: '收件箱', params: { name: e.name } });
            });
        }
    }
});

/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".message-box .el-table .cell{white-space:nowrap}.message-box .el-table__row:hover{cursor:pointer}.message-box .unread{font-weight:bolder}", ""]);

// exports


/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".el-pagination[data-v-09bca3c3]{margin-top:20px;text-align:center}.summary-text[data-v-09bca3c3]{display:inline-block;margin-bottom:15px;margin-right:10px;font-size:14px;color:#475669}.el-button[data-v-09bca3c3]{padding:0}.title[data-v-09bca3c3]{margin-right:10px}.body[data-v-09bca3c3]{color:#999;font-weight:400}", ""]);

// exports


/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".has-unread-message{font-weight:700;color:#353535}.message-tabs .is-active .has-unread-message{font-weight:400;color:#20a0ff}.el-notification{z-index:10001!important}", ""]);

// exports


/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(656)
__webpack_require__(655)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(605),
  /* template */
  __webpack_require__(640),
  /* scopeId */
  "data-v-09bca3c3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 640:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message-box"
  }, [_c('div', {
    staticClass: "summary-text"
  }, [_vm._v("一共" + _vm._s(_vm.total) + "封邮件， 其中未读邮件" + _vm._s(_vm.unReadTotal) + "封")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": _vm.refresh
    }
  }, [_vm._v("刷新")]), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "float": "right",
      "line-height": "20px"
    },
    attrs: {
      "type": "text"
    },
    on: {
      "click": _vm.showTip
    }
  }, [_vm._v("查看提示")]), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.tableLoading),
      expression: "tableLoading"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.messages,
      "row-class-name": _vm.rowClassName
    },
    on: {
      "row-click": _vm.navigateToDetail
    }
  }, [_c('el-table-column', {
    attrs: {
      "width": "40"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('icon-svg', {
          staticClass: "sidebar-icon",
          attrs: {
            "icon-class": "email"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "senderName",
      "label": "发件人",
      "width": "150",
      "show-overflow-tooltip": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "主题"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', {
          staticClass: "title"
        }, [_vm._v(_vm._s(scope.row.title))]), _c('span', {
          staticClass: "body"
        }, [_vm._v(_vm._s(scope.row.body))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "createTime",
      "label": "时间",
      "width": "130",
      "show-overflow-tooltip": "",
      "formatter": _vm.formatTime
    }
  })], 1), _vm._v(" "), _c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "total": _vm.total,
      "page-size": _vm.pageSize,
      "current-page": _vm.currentPage
    },
    on: {
      "current-change": _vm.navigateToPage
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 649:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-tabs', {
    staticClass: "message-tabs",
    attrs: {
      "value": _vm.currentName,
      "type": "card"
    },
    on: {
      "tab-click": _vm.click
    }
  }, _vm._l((_vm.tabs), function(item) {
    return _c('el-tab-pane', {
      key: item.type,
      attrs: {
        "name": item.name
      }
    }, [_c('span', {
      class: {
        'has-unread-message': _vm.numbers[item.type - 1] != 0
      },
      slot: "label"
    }, [_vm._v("\n            " + _vm._s(item.label + (_vm.numbers[item.type - 1] == 0 ? '' : ' (' + _vm.numbers[item.type - 1] + ')')) + "\n            ")]), _vm._v(" "), _c('message-box', {
      attrs: {
        "sender-type": item.type
      }
    })], 1)
  }))
},staticRenderFns: []}

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(618);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("321e7f48", content, true);

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(619);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("7efac146", content, true);

/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(628);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("53636454", content, true);

/***/ })

});
//# sourceMappingURL=2.js.map?c368fc3242b55e8fb5a0