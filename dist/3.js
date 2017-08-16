webpackJsonp([3],{

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(661)
__webpack_require__(660)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(599),
  /* template */
  __webpack_require__(644),
  /* scopeId */
  "data-v-4456b950",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_count_to__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_count_to___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_count_to__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_index_js__ = __webpack_require__(214);
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





// 最近7天对应的日期字符串数组
var date = [];
var now = new Date().getTime();
for (let i = 0; i < 7; i++) {
    let time = new Date(now - i * 24 * 3600 * 1000);
    date.unshift([time.getMonth() + 1, time.getDate()].join('/'));
}

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        CountTo: __WEBPACK_IMPORTED_MODULE_1_vue_count_to___default.a
    },
    data() {
        return {
            numbers: {
                wechat: 0,
                library: 0,
                wiki: 0,
                book: 0,
                order: 0,
                collection: 0
            },
            loading: true
        };
    },
    methods: {
        drawUserChart(data) {
            var chartLine = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById('userChart'));
            chartLine.setOption({
                title: {
                    text: '近7日用户增长数量',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    },
                    left: '3%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                //图例配置
                legend: {
                    itemGap: 13,
                    data: ['小程序', '图书馆', 'Wiki'],
                    top: 10,
                    right: '4%',
                    textStyle: {
                        fontSize: 12
                    }
                },
                calculable: true,
                //x轴配置
                xAxis: [{
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        alignWithLabel: true,
                        inside: true,
                        interval: 1
                    },
                    boundaryGap: false,
                    data: date,
                    name: "日期" // ** x轴配置:name
                }],
                // Y轴配置
                yAxis: [{
                    type: 'value',
                    name: "新增人数"
                }],
                series: [{
                    name: "小程序",
                    type: 'line',
                    data: data.wechat,
                    smooth: true
                }, {
                    name: "图书馆",
                    type: 'line',
                    data: data.library,
                    smooth: true
                }, {
                    name: "Wiki",
                    type: 'line',
                    data: data.wiki,
                    smooth: true
                }],
                color: ['#00a2ae', '#108ee9', '#ffbf00']
            });
        },
        drawOrderChart(data) {
            var chartLine = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById('orderChart'));
            chartLine.setOption({
                title: {
                    text: '近7日订单数量',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    },
                    left: '3%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                calculable: true,
                //x轴配置
                xAxis: [{
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        alignWithLabel: true,
                        inside: true,
                        interval: 1
                    },
                    boundaryGap: false,
                    data: date,
                    name: "日期" // ** x轴配置:name
                }],
                // Y轴配置
                yAxis: [{
                    type: 'value',
                    name: "订单数"
                }],
                series: [{
                    name: "订单数量",
                    type: 'line',
                    data: data,
                    smooth: true
                }],
                color: ['#20A0FF']
            });
        }
    },
    mounted: function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_index_js__["b" /* getSummary */])().then(res => {
            this.loading = false;
            this.$nextTick().then(() => {
                this.drawUserChart(res.numberChangeLog);
                this.drawOrderChart(res.numberChangeLog.order);
                this.numbers = res.number;
                Object.keys(this.numbers).forEach(key => this.$refs[key].start());
            });
        }).catch(() => this.loading = false);
    }
});

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".number-card-container .icon{width:30px;height:30px;margin-left:20px}.number-card-container .el-card__body{-ms-flex-align:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.number-card-container .description,.number-card-container .el-card__body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;align-items:center}.number-card-container .description{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center}", ""]);

// exports


/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".container[data-v-4456b950]{padding:0 15px}.el-col[data-v-4456b950]{margin-bottom:15px}.el-row[data-v-4456b950]{margin-bottom:10px}.number-card-container[data-v-4456b950]{font-size:12px;color:#8492a6}.count-to[data-v-4456b950]{color:#1f2d3d;font-size:24px;font-weight:500}", ""]);

// exports


/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("CountTo",[],e):"object"==typeof exports?exports.CountTo=e():t.CountTo=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=5)}([function(t,e,i){var n=i(3)(i(1),i(4),null,null);t.exports=n.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(2);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,i,n){return i*(1-Math.pow(2,-10*t/n))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var e=t.split("."),i=e[0],n=e.length>1?this.decimal+e[1]:"",a=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;a.test(i);)i=i.replace(a,"$1"+this.separator+"$2");return this.prefix+i+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var n=0,a="webkit moz ms o".split(" "),r=window.requestAnimationFrame,s=window.cancelAnimationFrame,o=void 0,u=0;u<a.length&&(!r||!s);u++)o=a[u],e.requestAnimationFrame=r=r||window[o+"RequestAnimationFrame"],e.cancelAnimationFrame=s=s||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];r&&s||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),a=window.setTimeout(function(){t(e+i)},i);return n=e+i,a},e.cancelAnimationFrame=s=function(t){window.clearTimeout(t)}),e.requestAnimationFrame=r,e.cancelAnimationFrame=s},function(t,e){t.exports=function(t,e,i,n){var a,r=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(a=t,r=t.default);var o="function"==typeof r?r.options:r;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),i&&(o._scopeId=i),n){var u=Object.create(o.computed||null);Object.keys(n).forEach(function(t){var e=n[t];u[t]=function(){return e}}),o.computed=u}return{esModule:a,exports:r,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(0),r=n(a);e.default=r.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",r.default)}])});
//# sourceMappingURL=vue-count-to.min.js.map

/***/ }),

/***/ 644:
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
  }, [(!_vm.loading) ? _c('el-row', {
    staticClass: "number-card-container",
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "account"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "wechat",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.wechat,
      "duration": 3000,
      "autoplay": false
    }
  }), _vm._v("人")], 1), _vm._v(" "), _c('div', [_vm._v("已有小程序用户")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "supplierfeatures"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "library",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.library,
      "duration": 3000,
      "autoplay": false
    }
  }), _vm._v("个")], 1), _vm._v(" "), _c('div', [_vm._v("已入驻图书馆")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "smile"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "wiki",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.wiki,
      "duration": 3000,
      "autoplay": false
    }
  }), _vm._v("人")], 1), _vm._v(" "), _c('div', [_vm._v("已有Wiki系统贡献者")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "office"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "book",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.book,
      "duration": 3000,
      "autoplay": false
    }
  }), _vm._v("个")], 1), _vm._v(" "), _c('div', [_vm._v("已创建图书条目")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "category"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "collection",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.collection,
      "duration": 3000,
      "autoplay": false
    }
  }, [_vm._v("本")])], 1), _vm._v(" "), _c('div', [_vm._v("已记录图书馆馆藏")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', [_c('icon-svg', {
    staticClass: "icon",
    attrs: {
      "icon-class": "survey"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_c('div', [_c('count-to', {
    ref: "order",
    staticClass: "count-to",
    attrs: {
      "startVal": 0,
      "endVal": _vm.numbers.order,
      "duration": 3000,
      "autoplay": false
    }
  }), _vm._v("个")], 1), _vm._v(" "), _c('div', [_vm._v("已产生订单")])])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (!_vm.loading) ? _c('el-row', {
    attrs: {
      "gutter": 30
    }
  }, [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-card', [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": "orderChart"
    }
  })])], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-card', [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": "userChart"
    }
  })])], 1)], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(623);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("bdc63006", content, true);

/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(624);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("750d9091", content, true);

/***/ })

});
//# sourceMappingURL=3.js.map?218c7df3c9579429931d