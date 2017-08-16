webpackJsonp([5],{

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(664)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(609),
  /* template */
  __webpack_require__(648),
  /* scopeId */
  "data-v-6c706e7a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_wechat_js__ = __webpack_require__(612);
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
                prop: 'phone',
                label: '手机号',
                width: '150'
            }, {
                prop: 'name',
                label: '姓名',
                formatter: function (row) {
                    return row['name'] || '---';
                }
            }, {
                prop: 'username',
                label: '昵称',
                minWidth: '150'
            }, {
                prop: 'idNumber',
                label: '身份证号',
                width: '150',
                formatter: function (row) {
                    if (!row['idNumber']) return '---';
                    return row['idNumber'].slice(0, 6) + '******';
                }
            }],
            stateOptions: [{ value: 0, label: "未审核", type: 'warning' }, { value: 1, label: "已审核", type: 'success' }, { value: 2, label: "未通过", type: 'danger' }, { value: 3, label: "已拉黑", type: 'gray' }],
            searchOptions: {
                phone: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    phone: undefined,
                    name: undefined,
                    idNumber: undefined,
                    location: undefined,
                    postcode: undefined
                    //state: undefined
                },
                updateBtnLoading: false, // 编辑用户信息的提交按钮
                blacklistBtnLoading: false // 拉黑按钮
            },
            approvalDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {},
                btnLoading: false,
                reasonRule: { required: true, message: '请填写反馈信息', trigger: 'blur' }
            }
        };
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wechat_js__["a" /* getUsers */])(params).then(res => {
                this.total = res.total;
                this.users = res.subjects;
            }).finally(() => this.tableLoading = false);
        },
        // 显示审核Dialog
        showApprovalDialog(row, index) {
            this.approvalDialog.index = index;
            this.approvalDialog.data = Object.assign({}, row);
            this.approvalDialog.data.state = 1;
            this.approvalDialog.data.reason = "";
            this.approvalDialog.visible = true;
        },
        // 提交审核信息
        approve() {
            this.$refs.approvalForm.validate(valid => {
                if (!valid) return;
                this.approvalDialog.btnLoading = true;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wechat_js__["b" /* updateStateByPhone */])(this.approvalDialog.data.phone, this.approvalDialog.data.state, this.approvalDialog.data.reason).then(() => {
                    this.approvalDialog.visible = false;
                    this.users[this.approvalDialog.index].state = this.approvalDialog.data.state;
                    this.$message.success("操作成功");
                }).finally(() => this.approvalDialog.btnLoading = false);
            });
        },
        // 显示编辑Dialog
        showEditDialog(row, index) {
            this.editDialog.index = index;
            this.editDialog.data = Object.assign({}, row);
            this.editDialog.visible = true;
        },
        // 编辑用户信息
        updateUserInfo() {
            this.editDialog.updateBtnLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wechat_js__["c" /* updateUserInfoByPhone */])(this.editDialog.data.phone, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach(key => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                });
                this.editDialog.visible = false;
                this.$message.success("修改用户信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(phone, index) {
            this.$confirm('拉黑后该用户将无法使用该手机号登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wechat_js__["d" /* block */])(phone).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 3;
                    this.editDialog.data.state = 3;
                });
            });
        },
        // 将用户移出黑名单
        moveOutBlacklist(phone, index) {
            this.$confirm('解除拉黑后该用户可正常登录系统并使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_wechat_js__["e" /* unblock */])(phone).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                });
            });
        }
    }
});

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUsers;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateUserInfoByPhone;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateStateByPhone;
/* harmony export (immutable) */ __webpack_exports__["d"] = block;
/* harmony export (immutable) */ __webpack_exports__["e"] = unblock;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch_js__ = __webpack_require__(114);


function getUsers(params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].get('/api/users', { params });
}

function updateUserInfoByPhone(phone, params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/users/' + phone, params);
}

function updateStateByPhone(phone, state, reason) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/users/' + phone + '/state', {
        state,
        reason
    });
}

function block(phone) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/users/' + phone + '/block');
}

function unblock(phone) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/users/' + phone + '/unblock');
}

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".el-pagination[data-v-6c706e7a]{margin-top:20px;text-align:center}.el-table .el-form-item[data-v-6c706e7a]{margin:0}.dialog-footer>.deleteBtn[data-v-6c706e7a]{float:left}", ""]);

// exports


/***/ }),

/***/ 648:
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
      "prop": "phone"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "手机号"
    },
    model: {
      value: (_vm.searchOptions.phone),
      callback: function($$v) {
        _vm.searchOptions.phone = $$v
      },
      expression: "searchOptions.phone"
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
  }, _vm._l((_vm.stateOptions), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
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
  }, [_c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('el-form', {
          attrs: {
            "label-position": "left",
            "label-width": "80px"
          }
        }, [_c('el-form-item', {
          attrs: {
            "label": "地址"
          }
        }, [_vm._v(_vm._s(props.row.location || '未填写'))]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "邮政编码"
          }
        }, [_vm._v(_vm._s(props.row.postcode || '未填写'))]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "注册时间"
          }
        }, [_vm._v(_vm._s(props.row.createTime))])], 1)]
      }
    }])
  }), _vm._v(" "), _vm._l((_vm.columns), function(column) {
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
      "width": "90"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-tag', {
          attrs: {
            "type": _vm.stateOptions[scope.row.state].type
          }
        }, [_vm._v(_vm._s(_vm.stateOptions[scope.row.state].label))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "150"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.state == 0) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "primary"
          },
          on: {
            "click": function($event) {
              _vm.showApprovalDialog(scope.row, scope.$index)
            }
          }
        }, [_vm._v("审 核")]) : _vm._e(), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showEditDialog(scope.row, scope.$index)
            }
          }
        }, [_vm._v("编 辑")]), _vm._v(" "), (scope.row.state != 0 && scope.row.state != 3) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.moveToBlacklist(scope.row.phone, scope.$index)
            }
          }
        }, [_vm._v("拉 黑")]) : _vm._e(), _vm._v(" "), (scope.row.state == 3) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "success"
          },
          on: {
            "click": function($event) {
              _vm.moveOutBlacklist(scope.row.phone, scope.$index)
            }
          }
        }, [_vm._v("解 除")]) : _vm._e()]
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
      "title": "用户信息",
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
  }, [_c('el-form-item', {
    attrs: {
      "label": "手机号"
    }
  }, [_c('el-input', {
    attrs: {
      "disabled": ""
    },
    model: {
      value: (_vm.editDialog.data.phone),
      callback: function($$v) {
        _vm.editDialog.data.phone = $$v
      },
      expression: "editDialog.data.phone"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "姓名"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.editDialog.data.name),
      callback: function($$v) {
        _vm.editDialog.data.name = $$v
      },
      expression: "editDialog.data.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "身份证号"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.editDialog.data.idNumber),
      callback: function($$v) {
        _vm.editDialog.data.idNumber = $$v
      },
      expression: "editDialog.data.idNumber"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "地址"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.editDialog.data.location),
      callback: function($$v) {
        _vm.editDialog.data.location = $$v
      },
      expression: "editDialog.data.location"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "邮政编码"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.editDialog.data.postcode),
      callback: function($$v) {
        _vm.editDialog.data.postcode = $$v
      },
      expression: "editDialog.data.postcode"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    slot: "footer"
  }, [(_vm.users[_vm.editDialog.index] && _vm.users[_vm.editDialog.index].state != 3) ? _c('el-button', {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      "type": "danger",
      "loading": _vm.editDialog.blacklistBtnLoading
    },
    on: {
      "click": function($event) {
        _vm.moveToBlacklist(_vm.editDialog.data.phone, _vm.editDialog.index)
      }
    }
  }, [_vm._v("拉 黑")]) : _vm._e(), _vm._v(" "), (_vm.users[_vm.editDialog.index] && _vm.users[_vm.editDialog.index].state == 3) ? _c('el-button', {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      "type": "success",
      "loading": _vm.editDialog.blacklistBtnLoading
    },
    on: {
      "click": function($event) {
        _vm.moveOutBlacklist(_vm.editDialog.data.phone, _vm.editDialog.index)
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
  }, [_vm._v("确 定")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "审核结果",
      "visible": _vm.approvalDialog.visible
    },
    on: {
      "update:visible": function($event) {
        _vm.approvalDialog.visible = $event
      }
    }
  }, [_c('el-form', {
    ref: "approvalForm",
    attrs: {
      "label-width": "120px",
      "label-position": "left",
      "model": _vm.approvalDialog.data
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "手机号"
    }
  }, [_vm._v(_vm._s(_vm.approvalDialog.data.phone || '未填写'))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "姓名"
    }
  }, [_vm._v(_vm._s(_vm.approvalDialog.data.name || '未填写'))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "身份证号"
    }
  }, [_vm._v(_vm._s(_vm.approvalDialog.data.idNumber || '未填写'))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "地址"
    }
  }, [_vm._v(_vm._s(_vm.approvalDialog.data.location || '未填写'))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "邮政编码"
    }
  }, [_vm._v(_vm._s(_vm.approvalDialog.data.postcode || '未填写'))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "审核结果"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": 1
    },
    model: {
      value: (_vm.approvalDialog.data.state),
      callback: function($$v) {
        _vm.approvalDialog.data.state = $$v
      },
      expression: "approvalDialog.data.state"
    }
  }, [_vm._v("通过")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": 2
    },
    model: {
      value: (_vm.approvalDialog.data.state),
      callback: function($$v) {
        _vm.approvalDialog.data.state = $$v
      },
      expression: "approvalDialog.data.state"
    }
  }, [_vm._v("未通过")])], 1), _vm._v(" "), (_vm.approvalDialog.data.state == 2) ? _c('el-form-item', {
    attrs: {
      "label": "反馈信息",
      "rules": _vm.approvalDialog.reasonRule,
      "prop": "reason"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea",
      "rows": 3,
      "placeholder": "请输入审核未通过的原因"
    },
    model: {
      value: (_vm.approvalDialog.data.reason),
      callback: function($$v) {
        _vm.approvalDialog.data.reason = $$v
      },
      expression: "approvalDialog.data.reason"
    }
  })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.approvalDialog.visible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.approvalDialog.btnLoading
    },
    on: {
      "click": _vm.approve
    }
  }, [_vm._v("确 定")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(627);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("e47b5292", content, true);

/***/ })

});
//# sourceMappingURL=5.js.map?313fd44eaff3f524776c