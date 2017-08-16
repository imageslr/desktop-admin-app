webpackJsonp([4],{

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(666)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(610),
  /* template */
  __webpack_require__(650),
  /* scopeId */
  "data-v-7c0554e6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_wiki_js__ = __webpack_require__(613);
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data: () => {
        return {
            tableLoading: false,
            currentTableType: 'all', // all || search
            pageSize: 20,
            currentPage: 1,
            total: 0, // 用户总数
            users: [], // 表格数据
            columns: [{
                prop: 'email',
                label: '邮箱',
                disabled: true,
                minWidth: '150'
            }, {
                prop: 'nickname',
                label: '昵称',
                minWidth: '150'
            }, {
                prop: 'password',
                label: '密码',
                minWidth: '120',
                isPassword: true,
                formatter: function (row) {
                    return '******';
                }
            }],
            searchOptions: {
                nickname: undefined,
                email: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    id: undefined,
                    nickname: undefined,
                    email: undefined,
                    password: undefined,
                    isAdmin: undefined,
                    state: undefined
                },
                updateBtnLoading: false, // 编辑用户信息的提交按钮
                blacklistBtnLoading: false // 拉黑按钮
            }
        };
    },
    filters: {
        type(state) {
            return state == 0 ? 'danger' : 'gray';
        },
        label(state) {
            return state == 0 ? '已拉黑' : '正常';
        }
    },
    created: function () {
        this.fetchData(1);
    },
    methods: {
        // 搜索
        handleSearch() {
            this.currentTableType = 'search';
            if (this.currentPage == 1) this.fetchData(1);else this.currentPage = 1;
        },
        // 重置表格，取消搜索状态
        resetTable() {
            this.$refs.searchForm.resetFields();
            this.currentTableType = 'all';
            if (this.currentPage == 1) this.fetchData(1);else this.currentPage = 1;
        },
        // 获取数据
        fetchData(p) {
            this.tableLoading = true;
            var params = {};
            if (this.currentTableType == 'search') {
                params = Object.assign({}, this.searchOptions);
            }
            params.start = (p - 1) * this.pageSize;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["a" /* getUsers */])(params).then(res => {
                this.total = res.total;
                this.users = res.subjects;
            }).finally(() => this.tableLoading = false);
        },
        // 显示编辑Dialog
        showEditDialog(index) {
            this.editDialog.index = index;
            this.editDialog.data = Object.assign({}, this.users[index]);
            this.editDialog.visible = true;
        },
        // 编辑用户信息
        updateUserInfo() {
            this.editDialog.updateBtnLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["b" /* updateUserInfoById */])(this.editDialog.data.id, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach(key => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                });
                this.editDialog.visible = false;
                this.$message.success("修改用户信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(index) {
            this.$confirm('拉黑后该用户将无法登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["c" /* block */])(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                });
            });
        },
        // 将用户移出黑名单
        moveOutBlacklist(index) {
            this.$confirm('解除拉黑后该用户可正常登录系统并使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["d" /* unblock */])(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 1;
                    this.editDialog.data.state = 1;
                });
            });
        },
        // 将用户设为管理员
        setAdmin(index) {
            this.$confirm('该用户可以管理员身份登录此系统并进行相关操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["b" /* updateUserInfoById */])(this.users[index].id, { isAdmin: true }).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].isAdmin = true;
                });
            });
        },
        // 取消管理员
        cancelAdmin(index) {
            this.$confirm('该用户将不能以管理员身份登录此系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wiki_js__["b" /* updateUserInfoById */])(this.users[index].id, { isAdmin: false }).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].isAdmin = false;
                });
            });
        }
    }
});

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUsers;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateUserInfoById;
/* harmony export (immutable) */ __webpack_exports__["c"] = block;
/* harmony export (immutable) */ __webpack_exports__["d"] = unblock;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch_js__ = __webpack_require__(114);


function getUsers(params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].get('/api/wiki/users', { params });
}

function updateUserInfoById(id, params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/wiki/users/' + id, params);
}

function block(id) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/wiki/users/' + id + '/block');
}

function unblock(id) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/wiki/users/' + id + '/unblock');
}

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".el-pagination[data-v-7c0554e6]{margin-top:20px;text-align:center}.el-table .el-form-item[data-v-7c0554e6]{margin:0}.dialog-footer>.deleteBtn[data-v-7c0554e6]{float:left}", ""]);

// exports


/***/ }),

/***/ 650:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-form', {
    ref: "searchForm",
    attrs: {
      "inline": "",
      "model": _vm.searchOptions
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "email"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "邮箱"
    },
    model: {
      value: (_vm.searchOptions.email),
      callback: function($$v) {
        _vm.searchOptions.email = $$v
      },
      expression: "searchOptions.email"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "昵称"
    },
    model: {
      value: (_vm.searchOptions.nickname),
      callback: function($$v) {
        _vm.searchOptions.nickname = $$v
      },
      expression: "searchOptions.nickname"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "states"
    }
  }, [_c('el-select', {
    attrs: {
      "multiple": "",
      "placeholder": "账号状态"
    },
    model: {
      value: (_vm.searchOptions.states),
      callback: function($$v) {
        _vm.searchOptions.states = $$v
      },
      expression: "searchOptions.states"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "正常",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "已拉黑",
      "value": "0"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.handleSearch()
      }
    }
  }, [_vm._v("搜索")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.resetTable()
      }
    }
  }, [_vm._v("重置")])], 1)], 1), _vm._v(" "), _c('el-table', {
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
      "data": _vm.users,
      "stripe": ""
    }
  }, [_vm._l((_vm.columns), function(column) {
    return _c('el-table-column', {
      attrs: {
        "prop": column.prop,
        "label": column.label,
        "width": column.width,
        "min-width": column.minWidth,
        "show-overflow-tooltip": "",
        "formatter": column.formatter
      }
    })
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "状态",
      "min-width": "90"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.isAdmin == 1) ? _c('el-tag', {
          attrs: {
            "type": "primary"
          }
        }, [_vm._v("管理员")]) : _c('el-tag', {
          attrs: {
            "type": _vm._f("type")(scope.row.state)
          }
        }, [_vm._v(_vm._s(_vm._f("label")(scope.row.state)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "170"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showEditDialog(scope.$index)
            }
          }
        }, [_vm._v("编 辑")]), _vm._v(" "), (scope.row.state == 0) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "success"
          },
          on: {
            "click": function($event) {
              _vm.moveOutBlacklist(scope.$index)
            }
          }
        }, [_vm._v("解 除")]) : (scope.row.isAdmin == 0) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.setAdmin(scope.$index)
            }
          }
        }, [_vm._v("设为管理员")]) : _c('el-button', {
          attrs: {
            "size": "small",
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.cancelAdmin(scope.$index)
            }
          }
        }, [_vm._v("取消管理员")])]
      }
    }])
  })], 2), _vm._v(" "), _c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "total": _vm.total,
      "page-size": _vm.pageSize,
      "current-page": _vm.currentPage
    },
    on: {
      "update:currentPage": function($event) {
        _vm.currentPage = $event
      },
      "current-change": _vm.fetchData
    }
  }), _vm._v(" "), _c('div', [_vm._v("一共" + _vm._s(_vm.total) + "个用户")]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "图书馆信息",
      "visible": _vm.editDialog.visible
    },
    on: {
      "update:visible": function($event) {
        _vm.editDialog.visible = $event
      }
    }
  }, [_c('el-form', {
    attrs: {
      "label-width": "120px",
      "label-position": "left",
      "model": _vm.editDialog.data
    }
  }, _vm._l((_vm.columns), function(item) {
    return _c('el-form-item', {
      attrs: {
        "label": item.label
      }
    }, [_c('el-input', {
      attrs: {
        "disabled": item.disabled,
        "type": item.isPassword ? 'password' : ''
      },
      model: {
        value: (_vm.editDialog.data[item.prop]),
        callback: function($$v) {
          _vm.$set(_vm.editDialog.data, item.prop, $$v)
        },
        expression: "editDialog.data[item.prop]"
      }
    })], 1)
  })), _vm._v(" "), _c('div', {
    slot: "footer"
  }, [(_vm.users[_vm.editDialog.index] && _vm.users[_vm.editDialog.index].state == 1 && _vm.users[_vm.editDialog.index].isAdmin == 0) ? _c('el-button', {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      "type": "danger",
      "loading": _vm.editDialog.blacklistBtnLoading
    },
    on: {
      "click": function($event) {
        _vm.moveToBlacklist(_vm.editDialog.index)
      }
    }
  }, [_vm._v("拉 黑")]) : _vm._e(), _vm._v(" "), (_vm.users[_vm.editDialog.index] && _vm.users[_vm.editDialog.index].state == 0) ? _c('el-button', {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      "type": "success",
      "loading": _vm.editDialog.blacklistBtnLoading
    },
    on: {
      "click": function($event) {
        _vm.moveOutBlacklist(_vm.editDialog.index)
      }
    }
  }, [_vm._v("解除拉黑")]) : _vm._e(), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.editDialog.visible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.editDialog.updateBtnLoading
    },
    on: {
      "click": _vm.updateUserInfo
    }
  }, [_vm._v("确 定")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(629);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("0a1990cf", content, true);

/***/ })

});
//# sourceMappingURL=4.js.map?d31d43dcea196b97852f