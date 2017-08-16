webpackJsonp([6],{

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(662)

var Component = __webpack_require__(113)(
  /* script */
  __webpack_require__(608),
  /* template */
  __webpack_require__(645),
  /* scopeId */
  "data-v-55a1346e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_library_js__ = __webpack_require__(611);
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
                prop: 'name',
                label: '图书馆名称',
                minWidth: 200
            }, {
                prop: 'phone',
                label: '联系电话',
                width: '150',
                formatter: function (row) {
                    return row['phone'] || '---';
                }
            }, {
                prop: 'adminName',
                label: '管理员姓名',
                width: '120',
                formatter: function (row) {
                    return row['adminName'] || '---';
                }
            }, {
                prop: 'adminPhone',
                label: '管理员手机号',
                disabled: true,
                width: '150'
            }, {
                prop: 'adminPassword',
                label: '管理员密码',
                width: '120',
                isPassword: true,
                formatter: function (row) {
                    return '******';
                }
            }],
            stateOptions: [{ value: 0, label: "未审核", type: 'warning' }, { value: 1, label: "已审核", type: 'success' }, { value: 2, label: "未通过", type: 'danger' }, { value: 3, label: "已拉黑", type: 'gray' }],
            searchOptions: {
                name: undefined,
                adminPhone: undefined,
                states: []
            },
            editDialog: {
                index: undefined, // 在users数组中的下标
                visible: false,
                data: {
                    id: undefined,
                    name: undefined,
                    phone: undefined,
                    adminPhone: undefined,
                    adminName: undefined,
                    adminPassword: undefined,
                    state: undefined
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_library_js__["a" /* getUsers */])(params).then(res => {
                this.total = res.total;
                this.users = res.subjects;
            }).finally(() => this.tableLoading = false);
        },
        // 显示审核Dialog
        showApprovalDialog(index) {
            this.approvalDialog.index = index;
            this.approvalDialog.data = Object.assign({}, this.users[index]);
            this.approvalDialog.data.state = 1;
            this.approvalDialog.data.reason = "";
            this.approvalDialog.visible = true;
        },
        // 提交审核信息
        approve() {
            this.$refs.approvalForm.validate(valid => {
                if (!valid) return;
                this.approvalDialog.btnLoading = true;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_library_js__["b" /* updateStateById */])(this.approvalDialog.data.id, this.approvalDialog.data.state, this.approvalDialog.data.reason).then(() => {
                    this.approvalDialog.visible = false;
                    this.users[this.approvalDialog.index].state = this.approvalDialog.data.state;
                    this.$message.success("操作成功");
                }).finally(() => this.approvalDialog.btnLoading = false);
            });
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_library_js__["c" /* updateLibraryInfoById */])(this.editDialog.data.id, this.editDialog.data).then(() => {
                Object.keys(this.editDialog.data).forEach(key => {
                    this.users[this.editDialog.index][key] = this.editDialog.data[key];
                });
                this.editDialog.visible = false;
                this.$message.success("修改图书馆信息成功");
            }).finally(() => this.editDialog.updateBtnLoading = false);
        },
        // 将用户拉入黑名单
        moveToBlacklist(index) {
            this.$confirm('拉黑后该用户将无法使用该手机号登录系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_library_js__["d" /* block */])(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 3;
                    this.editDialog.data.state = 3;
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_library_js__["e" /* unblock */])(this.users[index].id).then(() => {
                    this.$message.success("操作成功");
                    this.users[index].state = 0;
                    this.editDialog.data.state = 0;
                });
            });
        }
    }
});

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUsers;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateLibraryInfoById;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateStateById;
/* harmony export (immutable) */ __webpack_exports__["d"] = block;
/* harmony export (immutable) */ __webpack_exports__["e"] = unblock;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch_js__ = __webpack_require__(114);


function getUsers(params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].get('/api/libraries', { params });
}

function updateLibraryInfoById(id, params) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/libraries/' + id, params);
}

function updateStateById(id, state, reason) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/libraries/' + id + '/state', {
        state,
        reason
    });
}

function block(id) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/libraries/' + id + '/block');
}

function unblock(id) {
    return __WEBPACK_IMPORTED_MODULE_0__fetch_js__["a" /* default */].post('/api/libraries/' + id + '/unblock');
}

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(undefined);
// imports


// module
exports.push([module.i, ".el-pagination[data-v-55a1346e]{margin-top:20px;text-align:center}.el-table .el-form-item[data-v-55a1346e]{margin:0}.dialog-footer>.deleteBtn[data-v-55a1346e]{float:left}", ""]);

// exports


/***/ }),

/***/ 645:
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
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "图书馆名称"
    },
    model: {
      value: (_vm.searchOptions.name),
      callback: function($$v) {
        _vm.searchOptions.name = $$v
      },
      expression: "searchOptions.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "adminPhone"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "管理员手机号"
    },
    model: {
      value: (_vm.searchOptions.adminPhone),
      callback: function($$v) {
        _vm.searchOptions.adminPhone = $$v
      },
      expression: "searchOptions.adminPhone"
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
            "label": "描述"
          }
        }, [_vm._v(_vm._s(props.row.description || '未填写'))]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "地址"
          }
        }, [_vm._v(_vm._s(props.row.location || '未填写'))]), _vm._v(" "), _c('el-form-item', {
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
              _vm.showApprovalDialog(scope.$index)
            }
          }
        }, [_vm._v("审 核")]) : _vm._e(), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.showEditDialog(scope.$index)
            }
          }
        }, [_vm._v("编 辑")]), _vm._v(" "), (scope.row.state != 0 && scope.row.state != 3) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.moveToBlacklist(scope.$index)
            }
          }
        }, [_vm._v("拉 黑")]) : _vm._e(), _vm._v(" "), (scope.row.state == 3) ? _c('el-button', {
          attrs: {
            "size": "small",
            "type": "success"
          },
          on: {
            "click": function($event) {
              _vm.moveOutBlacklist(scope.$index)
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
  }, [_vm._l((_vm.columns), function(item) {
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
  }), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "账号状态"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.editDialog.data.state),
      callback: function($$v) {
        _vm.editDialog.data.state = $$v
      },
      expression: "editDialog.data.state"
    }
  }, _vm._l((_vm.stateOptions), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1)], 2), _vm._v(" "), _c('div', {
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
        _vm.moveToBlacklist(_vm.editDialog.index)
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
  }, [_vm._l((_vm.columns), function(item) {
    return _c('el-form-item', {
      attrs: {
        "label": item.label
      }
    }, [_vm._v(_vm._s(item.isPassword ? "******" : (_vm.approvalDialog.data[item.prop] || '未填写')))])
  }), _vm._v(" "), _c('el-form-item', {
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
  })], 1) : _vm._e()], 2), _vm._v(" "), _c('div', {
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

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(625);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(112)("d71c788a", content, true);

/***/ })

});
//# sourceMappingURL=6.js.map?8beeeceaeb40eae7ac43