/**
 * @name form_configs_data
 * @description form_configs_data
 * @author kt
 * @since 2017-10-16
 */
require.config({
    baseUrl: 'http://localhost:63342/github/component-library/', //项目工程地址
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min' //引入jq
    }
});
define(['jquery', 'modules/utils/data_type'], function($, dataType) {
    //字段数据
    var data = {
        //true或者false的数据
        trueOrFalseData: [{
            id: '1',
            name: true
        }, {
            id: '2',
            name: false
        }],
        trueOrFalseValue1: {
            id: '1',
            name: true
        },
        trueOrFalseValue2: {
            id: '2',
            name: false
        },
        //布局
        layoutData: [{
            id: 'up-down',
            name: 'up-down(上下)'
        }, {
            id: 'left-right',
            name: 'left-right(左右)'
        }],
        //位置
        locationData: [{
            id: 'before',
            name: 'before(必填在前)'
        }, {
            id: 'after',
            name: 'after(必填在后)'
        }],
        //校验方式
        checkTypeData: [{
            id: 'all',
            name: 'all'
        }, {
            id: 'oneByOne',
            name: 'oneByOne'
        }],
        //校验提示方式
        checkTipTypeData: [{
                id: 'tooltip',
                name: 'tooltip'
            },
            {
                id: 'message',
                name: 'message'
            }
        ],
        //校验提示的形状
        checkTipShapeData: [{
                id: 'hollow',
                name: 'hollow'
            },
            {
                id: 'solid',
                name: 'solid'
            }
        ],
        //气泡提示方向
        checkTipDirectionData: [{
                id: 'top',
                name: 'top'
            },
            {
                id: 'bottom',
                name: 'bottom'
            },
            {
                id: 'left',
                name: 'left'
            },
            {
                id: 'right',
                name: 'right'
            }
        ],
        //index
        indexData: [{
                id: 'number',
                name: '数字'
            },
            {
                id: 'roman',
                name: '罗马数字'
            },
            {
                id: 'chinese',
                name: '中文'
            }
        ],
        //actions的language
        actionsLanguageData: [{
                id: 'icon',
                name: '图标'
            },
            {
                id: 'character',
                name: '文字'
            }
        ],
        //操作数据
        actionsData: [{
            id: "add",
            name: "add(增加)"
        }, {
            id: "remove",
            name: "remove(删除)"
        }, {
            id: "up",
            name: "up(上移)"
        }, {
            id: "down",
            name: "down(下移)"
        }, {
            id: "upToTop",
            name: "upToTop(上移到顶部)"
        }, {
            id: "downToBottom",
            name: "downToBottom(下移到底部)"
        }],
        //操作事件
        eventData: [{
            id: 'change',
            name: 'change(值改变)'
        }],
        //操作方法
        wayData: [{
            id: 'setValue',
            name: 'setValue(设置值)'
        }, {
            id: 'onlyShow',
            name: 'onlyShow（满足条件的时候展示，不满足的时候隐藏）'
        }, {
            id: 'show',
            name: 'show（显示）'
        }, {
            id: 'required',
            name: 'required（必填）'
        }, {
            id: 'setData',
            name: 'setData（设置）'
        }],
        //菜单显示形式，单行省略展示还是多行完整展示
        menuListShowWayData: [{
                id: 'one',
                name: 'one(单行省略)'
            },
            {
                id: 'all',
                name: 'all(多行完整)'
            }
        ],
        //文件限制类型
        acceptData: [{
                id: 'application/x-zip-compressed',
                name: '*.zip'
            },
            {
                id: 'image/gif',
                name: '*.gif'
            },
            {
                id: 'image/png',
                name: '*.png'
            },
            {
                id: 'image/jpeg',
                name: '*.jpeg/*.jpg'
            },
            {
                id: 'application/pdf',
                name: '*.pdf'
            },
            {
                id: 'application/msword',
                name: '*.doc/*.dot'
            },
            {
                id: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                name: '*.docx'
            },
            {
                id: 'application/vnd.ms-excel',
                name: '*.xls/*.xlc/*.xlm/*.xlt/*.xlw'
            },
            {
                id: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                name: '*.xlsx '
            },
            {
                id: 'text/plain',
                name: '*.txt'
            },
            {
                id: 'application/vnd.ms-powerpoint',
                name: '*.ppt/*.pot/*.pps'
            },
            {
                id: 'audio/3gpp, video/3gpp',
                name: '*.3gpp'
            },
            {
                id: 'audio/ac3',
                name: '*.ac3'
            },
            {
                id: 'allpication/vnd.ms-asf',
                name: '*.asf'
            },
            {
                id: 'audio/basic',
                name: '*.au'
            },
            {
                id: 'text/css',
                name: '*.css'
            },
            {
                id: 'text/csv',
                name: '*.csv'
            },
            {
                id: 'application/xml-dtd',
                name: '*.dtd'
            },
            {
                id: 'image/vnd.dwg',
                name: '*.dwg'
            },
            {
                id: 'image/vnd.dxf',
                name: '*.dxf'
            },
            {
                id: 'text/html',
                name: '*.htm/*.html'
            },
            {
                id: 'image/jp2',
                name: '*.jp2'
            },
            {
                id: 'image/jpeg',
                name: '*.jpe'
            },
            {
                id: 'text/javascript, application/javascript',
                name: '*.js'
            },
            {
                id: 'application/json',
                name: '*.json'
            },
            {
                id: 'audio/mpeg, video/mpeg',
                name: '*.mp2'
            },
            {
                id: 'audio/mpeg',
                name: '*.mp3'
            },
            {
                id: 'audio/mp4, video/mp4',
                name: '*.mp4'
            },
            {
                id: 'video/mpeg',
                name: '*.mpeg/*.mpg'
            },
            {
                id: 'application/vnd.ms-project',
                name: '*.mpp'
            },
            {
                id: 'application/ogg, audio/ogg',
                name: '*.ogg'
            },
            {
                id: 'application/rtf, text/rtf',
                name: '*.rtf'
            },
            {
                id: 'image/vnd.svf',
                name: '*.svf'
            },
            {
                id: 'image/tiff',
                name: '*.tif/*.tiff'
            },
            {
                id: 'application/vnd.ms-works',
                name: '*.wdb/*.wps'
            },
            {
                id: 'application/xhtml+xml',
                name: '*.xhtml'
            },
            {
                id: 'text/xml, application/xml',
                name: '*.xml'
            }
        ],
        //获取value值的方法
        valueFunction: function(value, data) {
            var val = '';
            $.each(data, function(iData, vData) {
                if (value == vData.id) {
                    val = vData;
                }
            });
            return val;
        }
    };
    //add回调函数
    var callback = {
        add: function() {
            var $textarea = $(this).closest('tbody').find('.form-field-textarea .form-field-element');
            $textarea.css({
                'position': 'relative',
                'height': '22px',
                'resize': 'auto'
            });
            $textarea.on('blur', function() {
                $(this).css({ 'z-index': '0' });
                $(this).stop().animate({ 'height': '22px' });
            });
            $textarea.on('focus', function() {
                $(this).css({ 'z-index': '1' });
                $(this).stop().animate({ 'height': '100px' });
            });
        }
    };
    //配置数据
    var configsData = {
        //字符串类型
        string: function(v) {
            return {
                dataType: 'string',
                valueFn: function(value) {
                    return value;
                },
                defaultValue: v
            }
        },
        //对象类型
        object: function(v) {
            return {
                type: 'textarea',
                dataType: 'object',
                valueFn: function(value) {
                    return JSON.stringify(value);
                },
                defaultValue: v
            }
        },
        //布尔类型
        boolean: function(v) {
            return {
                type: 'radio',
                getValueKey: 'name',
                data: data.trueOrFalseData,
                dataType: 'boolean',
                valueFn: function(value) {
                    return value == true ? data.trueOrFalseValue1 : data.trueOrFalseValue2;
                },
                defaultValue: v
            }
        },
        //数组类型
        array: function(v) {
            return {
                dataType: 'array',
                valueFn: function(value) {
                    return JSON.stringify(value);
                },
                defaultValue: v
            }
        },
        //函数类型
        functionType: function(v) {
            return {
                type: 'textarea',
                dataType: 'function',
                valueFn: function(value) {
                    return value;
                },
                defaultValue: v
            }
        },
        //布局
        layout: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.layoutData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.layoutData);
                },
                defaultValue: v
            };
        },
        //必填标志位置
        requiredLocation: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.locationData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.locationData);
                },
                defaultValue: v
            }
        },
        //校验方式
        checkType: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.checkTypeData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.checkTypeData);
                },
                defaultValue: v
            }
        }, //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
        //校验提示方式
        checkTipType: function(v) {
            return {
                type: 'radio',
                getValueKey: 'name',
                data: data.checkTipTypeData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.checkTipTypeData);
                },
                defaultValue: v
            }
        }, //校验提示类型,message/tooltip
        //校验提示的形状
        checkTipShape: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.checkTipShapeData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.checkTipShapeData);
                },
                defaultValue: v
            }
        },
        //气泡提示方向
        checkTipDirection: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.checkTipDirectionData,
                dataType: 'string',
                valueFn: function(value) {
                    return data.valueFunction(value, data.checkTipDirectionData);
                },
                defaultValue: v
            }
        },
        //气泡提示位置
        checkTipLocation: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                dataType: 'string',
                valueFn: function(v) {
                    return v;
                },
                defaultValue: v
            }
        },
        //校验
        validators1: function(v) {
            return {
                type: 'paraConfig',
                childrenList: [{
                        type: "single",
                        name: 'method',
                        placeholder: '请选择校验方法',
                        data: [{
                                id: 'required',
                                name: 'required'
                            },
                            {
                                id: 'equalTo',
                                name: 'equalTo'
                            },
                            {
                                id: 'maxLength',
                                name: 'maxLength'
                            },
                            {
                                id: 'minLength',
                                name: 'minLength'
                            },
                            {
                                id: 'maxValue',
                                name: 'maxValue'
                            },
                            {
                                id: 'minValue',
                                name: 'minValue'
                            },
                            {
                                id: 'gtValue',
                                name: 'gtValue'
                            },
                            {
                                id: 'ltValue',
                                name: 'ltValue'
                            },
                            {
                                id: 'remote',
                                name: 'remote'
                            },
                            {
                                id: 'function',
                                name: 'function'
                            },
                            {
                                id: 'regexp',
                                name: 'regexp'
                            }
                        ]
                    },
                    {
                        type: "text",
                        name: 'param',
                        placeholder: '请输入校验规则'
                    },
                    {
                        type: "text",
                        name: 'message',
                        placeholder: '请输入提示信息'
                    },
                    {
                        type: "actions",
                        value: ['add', 'remove'],
                        language: "icon" //图标icon ,文字character
                    }
                ],
                dataType: 'array',
                valueFn: function(v) {
                    return v;
                },
                defaultValue: v
            };
        },
        validators2: function(v) {
            return {
                type: 'paraConfig',
                childrenList: [{
                        type: "single",
                        name: 'method',
                        placeholder: '请选择校验方法',
                        data: [{
                                id: 'required',
                                name: 'required'
                            },
                            {
                                id: 'function',
                                name: 'function'
                            },
                            {
                                id: 'remote',
                                name: 'remote'
                            }
                        ]
                    },
                    {
                        type: "text",
                        name: 'param',
                        placeholder: '请输入校验规则'
                    },
                    {
                        type: "text",
                        name: 'message',
                        placeholder: '请输入提示信息'
                    },
                    {
                        type: "actions",
                        value: ['add', 'remove'],
                        language: "icon" //图标icon ,文字character
                    }
                ],
                dataType: 'array',
                valueFn: function(v) {
                    return v;
                },
                defaultValue: v
            };
        },
        //index
        indexLanguage: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.indexData,
                dataType: 'string',
                valueFn: function(value) { return data.valueFunction(value, data.indexData); },
                defaultValue: v
            }
        },
        //actions的value
        actionsValue: function(v) {
            return {
                type: 'multiple',
                getValueKey: 'id',
                getValueType: 'array',
                data: data.actionsData,
                dataType: 'string',
                valueFn: function(value) {
                    var val = [];
                    $.each(data.actionsData, function(iData, vData) {
                        $.each(value, function(iValue, vValue) {
                            if (vData.id == vValue) {
                                val.push(vData);
                            }
                        });
                    });
                    return val;
                },
                defaultValue: v
            }
        },
        //actions的language
        actionsLanguage: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.actionsLanguageData,
                dataType: 'string',
                valueFn: function(value) { return data.valueFunction(value, data.actionsLanguageData); },
                defaultValue: v
            }
        },
        //菜单显示形式，单行省略展示还是多行完整展示
        menuListShowWay: function(v) {
            return {
                type: 'radio',
                getValueKey: 'id',
                data: data.menuListShowWayData,
                dataType: 'string',
                valueFn: function(value) { return data.valueFunction(value, data.menuListShowWayData); },
                defaultValue: v
            }
        },
        //联动操作
        handlerEvent: function(v) {
            return {
                type: 'tableParaConfig',
                childrenTbody: [{
                        type: "text",
                        name: 'name',
                        placeholder: '请输入值改变的name',
                        style: {
                            'width': '110px'
                        },
                        dataType: "string"
                    },
                    {
                        type: "single",
                        name: 'event',
                        placeholder: '请选择值改变触发事件',
                        getValueKey: 'id',
                        data: data.eventData,
                        style: {
                            'width': '110px'
                        },
                        menuStyle: {
                            'width': '190px'
                        },
                        dataType: "string"
                    },
                    {
                        type: "textarea",
                        name: 'condition',
                        placeholder: '触发事件的条件',
                        style: {
                            'width': '180px'
                        },
                        dataType: "function"
                    },
                    {
                        type: "blockParaConfig",
                        name: 'toDo',
                        childrenBlock: [{
                                type: "index",
                                name: 'index',
                                value: '被改的操作',
                            },
                            {
                                type: "text",
                                name: 'name',
                                placeholder: '请输入被改变的name',
                                dataType: "string"
                            },
                            {
                                type: "single",
                                name: 'way',
                                placeholder: '请选择被改变触发的方法',
                                getValueKey: 'id',
                                data: data.wayData,
                                menuListShowWay: 'one',
                                dataType: "string"
                            },
                            {
                                type: "textarea",
                                name: 'condition',
                                placeholder: '触发事件的条件',
                                dataType: "function"
                            },
                            {
                                type: "textarea",
                                name: 'param',
                                placeholder: '触发时往后提交的值',
                                dataType: "function"
                            },
                            {
                                type: "actions",
                                value: [{
                                    code: 'add',
                                    title: '添加',
                                    fn: callback.add
                                }, 'remove'],
                                language: "character" //图标icon ,文字character
                            }
                        ],
                        style: {
                            'width': '350px'
                        },
                        dataType: "array"
                    },
                    {
                        type: "actions",
                        value: [{
                            code: 'add',
                            title: '添加',
                            fn: callback.add
                        }, 'remove'],
                        language: "icon" //图标icon ,文字character
                    }
                ],
                dataType: 'array',
                valueFn: function(value) {
                    $.each(value, function(iValue, vValue) {
                        $.each(data.eventData, function(iEventData, vEventData) {
                            if (vEventData.id == vValue.event) {
                                vValue.event = vEventData;
                            }
                        });
                        vValue.condition = vValue.condition.value;
                        $.each(vValue.toDo, function(iDo, vDo) {
                            $.each(data.wayData, function(wayData, vWayData) {
                                if (vWayData.id == vDo.way) {
                                    vDo.way = vWayData;
                                }
                            });
                            vDo.condition = vDo.condition.value
                            vDo.param = vDo.param.value
                        });
                    });
                    return value;
                },
                defaultValue: v
            }
        },
        //文件限制
        accept: function(v) {
            return {
                type: "multiple",
                getValueKey: 'id',
                getValueType: 'array',
                placeholder: '请选择限制类型',
                data: data.acceptData,
                dataType: 'string',
                valueFn: function(value) {
                    var val = [];
                    $.each(data.acceptData, function(iData, vData) {
                        $.each(value, function(iValue, vValue) {
                            if (vData.id == vValue) {
                                val.push(vData);
                            }
                        });
                    });
                    return val;
                },
                defaultValue: v
            }
        },
        //文件上传大小
        uploadMaxSize: function(v) {
            return {
                dataType: 'string',
                placeholder: '请输入你要限制文件大小（单位为KB，你只需要输入数字即可）',
                valueFn: function(value) {
                    return value;
                },
                defaultValue: v
            }
        }
    };
    //联动操作数据
    var handlerData = function(location) {
        return [{
            name: 'checkTipType',
            event: 'change', //事件类型change
            condition: function(name, form) {
                return form.getValue(name).length > 0
            },
            toDo: [{
                name: ['isSetRowLineHeightRow', 'checkTipShapeRow', 'checkTipDirectionRow', 'checkTipLocationRow'],
                way: 'onlyShow',
                condition: function(name, form) {
                    return form.getValue(name) == "tooltip"
                }
            }, {
                name: 'checkTipTimeRow',
                way: 'onlyShow',
                condition: function(name, form) {
                    return form.getValue(name) != "tooltip"
                }
            }]
        }, {
            name: 'checkTipDirection',
            event: 'change', //事件类型change
            condition: function(name, form) {
                return form.getValue(name).length > 0
            },
            toDo: [{
                name: ['checkTipLocation'],
                way: 'setData',
                param: [{
                    id: 'left',
                    name: "left"
                }, {
                    id: 'center',
                    name: "center"
                }, {
                    id: 'right',
                    name: "right"
                }],
                condition: function(name, form) {
                    return form.getValue(name) == "top" || form.getValue(name) == "bottom"
                }
            }, {
                name: ['checkTipLocation'],
                way: 'setValue',
                param: {
                    id: location,
                    name: location
                },
                condition: function(name, form) {
                    return form.getValue(name) == "top" || form.getValue(name) == "bottom"
                }
            }, {
                name: ['checkTipLocation'],
                way: 'setData',
                param: [{
                    id: 'top',
                    name: "top"
                }, {
                    id: 'middle',
                    name: "middle"
                }, {
                    id: 'bottom',
                    name: "bottom"
                }],
                condition: function(name, form) {
                    return form.getValue(name) == "left" || form.getValue(name) == "right"
                }
            }, {
                name: ['checkTipLocation'],
                way: 'setValue',
                param: {
                    id: 'middle',
                    name: "middle"
                },
                condition: function(name, form) {
                    return form.getValue(name) == "left" || form.getValue(name) == "right"
                }
            }]
        }];
    };
    //表单的配置数据
    var formConfigsData = {
        //是否显示必填标志
        isShowRequiredConfigs: {
            filed: ['name']
        },
        //表单生成到配置区域的数据
        configsData: {
            //表单
            form: {
                type: "form",
                children: [], //孩子（块，行，以及子组件类型）-----孩子不用配置，下面的就是孩子
                name: configsData.string(''), //唯一标识
                title: configsData.string(''), //标题
                //element: configsData.string(''), //当前需要生成表单的元素
                className: configsData.string(''), //可以为当前表单添加class
                style: configsData.object({}), //设置样式
                titleStyle: configsData.object({}), //标题样式设置
                contentStyle: configsData.object({}), //内容样式
                idFlag: configsData.string('id'), //数据的key值
                nameFlag: configsData.string('name'), //数据的key值
                btn: configsData.object({ //按钮区域
                    layout: 'bottom-center', //按钮的布局位置
                    children: null //按钮的个数配置-----------这个孩子应该如何配置呢
                }),
                byteChinese: configsData.string('1'), //中文一个字符占几个字节,默认为一个字符占1个字节
                checkType: configsData.checkType('all'), //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck: configsData.boolean(true), //值改变的时候是否执行校验
                checkTipType: configsData.checkTipType('tooltip'), //校验提示类型,message/tooltip
                isTipBorder: configsData.boolean(true), //是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight: configsData.boolean(false), //使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape: configsData.checkTipShape('hollow'), //气泡提示形状
                checkTipDirection: configsData.checkTipDirection('top'), //气泡提示方向
                checkTipLocation: configsData.checkTipLocation(''), //气泡提示位置
                checkTipTime: configsData.string('2'), //消息提示显示时间
                handlerEvent: configsData.handlerEvent([]),
                'infoDataConvert': configsData.functionType(''), //远端的数据转换,把后端的回显数据转换为前端想要的
                'selectDataConvert': configsData.functionType(''), //远端的数据转换，把后端的下拉数据转换为前端想要的
                'saveDataConvert': configsData.functionType('') //远端的数据转换，把前端提交的数据转换为后端想要的
            },
            //块
            block: {
                type: "block",
                children: [], //一个块可以有多个行
                name: configsData.string(''),
                title: configsData.string(''),
                className: configsData.string(''),
                layout: configsData.layout('up-down'),
                isHide: configsData.boolean(false)
            },
            //行
            row: {
                type: "row",
                children: [], //一个行可以有多个字段
                name: configsData.string(''),
                title: configsData.string(''),
                isShowRequired: configsData.boolean(false),
                className: configsData.string(''),
                layout: configsData.layout('left-right'),
                requiredLocation: configsData.requiredLocation('before'),
                tip: configsData.string(''),
                isHide: configsData.boolean(false)
            },
            //字段
            filed: {
                name: configsData.string(''), //唯一标识
                title: configsData.string(''), //标题
                isShowRequired: configsData.boolean(false), //当必填的时候是否显示必填标志，默认是隐藏的
                tip: configsData.string(''), //在表单字段组件下面一行添加提示文字
                className: configsData.string(''), //可以为当前元素添加class
                style: configsData.object({}), //设置样式
                layout: configsData.layout('left-right'), //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
                requiredLocation: configsData.requiredLocation('before'), //必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
                titleStyle: configsData.object({}),
                contentStyle: configsData.object({}), //内容样式
                isHide: configsData.boolean(false)
            },
            //单行文本框
            text: {
                type: 'text', //要创建的表单字段的类型
                maxlength: configsData.string(''), //最大字符数
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators1([]),
                isTipWordNumber: configsData.boolean(false), //是否提示字数
                inputEvent: configsData.functionType(null), //事件监听事件
            },
            //密码输入框
            password: {
                type: 'password', //要创建的表单字段的类型
                maxlength: configsData.string(''), //最大字符数
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                placeholder: configsData.string(''), //提示文字
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                validators: configsData.validators1([]),
                isTipWordNumber: configsData.boolean(false), //是否提示字数
                inputEvent: configsData.functionType(null), //事件监听事件
            },
            //隐藏域
            hidden: {
                type: 'hidden', //要创建的表单字段的类型,
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                inputEvent: configsData.functionType(null), //事件监听事件
            },
            //纯文本
            plainText: {
                type: 'plainText', //要创建的表单字段的类型,
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null) // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
            },
            //多行文本框
            textarea: {
                type: 'textarea', //要创建的表单字段的类型
                maxlength: configsData.string(''), //最大字符数
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators1([]),
                isTipWordNumber: configsData.boolean(false), //是否提示字数
                inputEvent: configsData.functionType(null), //事件监听事件
            },
            //多行文本框,自动换行
            textareaAuto: {
                type: 'textareaAuto', //要创建的表单字段的类型
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                maxlength: configsData.string(''), //最大字符数
                placeholder: configsData.string(''), //提示文字
                value: configsData.string(''), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                validators: configsData.validators1([]),
                isTipWordNumber: configsData.boolean(false), //是否提示字数
                inputEvent: configsData.functionType(null), //事件监听事件
            },
            //单选下拉框
            single: {
                type: 'single', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                menuStyle: configsData.object({}),
                beforeClick: configsData.functionType(null), //点击之前触发
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([]),
                menuListShowWay: configsData.menuListShowWay('one'),
                menuAddClass: configsData.string(''),
                getValueKey: configsData.string(''),
                getValueType: configsData.string(''),
                isIcon: configsData.boolean(true)
            },
            //单选搜索下拉框
            singleSearch: {
                type: 'singleSearch', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                menuStyle: configsData.object({}),
                isAllData: configsData.boolean(false), //当前获取的数据是否是所有数据
                isSearch: configsData.boolean(true),
                searchPlaceholder: configsData.string(''), //默认搜索框显示的字段
                searchDefaultField: configsData.string(''), //默认显示的字段
                beforeClick: configsData.functionType(null), //点击之前触发
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([]),
                menuListShowWay: configsData.menuListShowWay('one'),
                menuAddClass: configsData.string(''),
                getValueKey: configsData.string(''),
                getValueType: configsData.string(''),
                isIcon: configsData.boolean(true)
            },
            //多选下拉框
            multiple: {
                type: 'multiple', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                menuStyle: configsData.object({}),
                beforeClick: configsData.functionType(null), //点击之前触发
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([]),
                menuListShowWay: configsData.menuListShowWay('one'),
                menuAddClass: configsData.string(''),
                isSelectAll: configsData.boolean(false),
                getValueKey: configsData.string(''),
                getValueType: configsData.string(''),
                isIcon: configsData.boolean(true)
            },
            //多选搜索下拉框
            multipleSearch: {
                type: 'multipleSearch', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                menuStyle: configsData.object({}),
                isAllData: configsData.boolean(false), //当前获取的数据是否是所有数据
                isSearch: configsData.boolean(true),
                searchPlaceholder: configsData.string(''), //默认搜索框显示的字段
                searchDefaultField: configsData.string(''), //默认显示的字段
                beforeClick: configsData.functionType(null),
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([]),
                menuListShowWay: configsData.menuListShowWay('one'),
                menuAddClass: configsData.string(''),
                getValueKey: configsData.string(''),
                getValueType: configsData.string(''),
                isIcon: configsData.boolean(true)
            },
            //单选框
            radio: {
                type: 'radio', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                validators: configsData.validators2([]),
                getValueKey: configsData.string('')
            },
            //复选框
            checkbox: {
                type: 'checkbox', //要创建的表单字段的类型
                idFlag: configsData.string('id'), //数据形式
                nameFlag: configsData.string('name'), //数据形式
                data: configsData.functionType(null), //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                validators: configsData.validators2([]),
                getValueKey: configsData.string('')
            },
            //时间选择框
            date: {
                type: 'date', //要创建的表单字段的类型
                menu: configsData.object({}), //菜单设置，参考日历组件
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([])
            },
            //时间选择框
            date2: {
                type: 'date2', //要创建的表单字段的类型
                menu: configsData.object({}), //菜单设置，参考日历组件
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                placeholder: configsData.string(''), //提示文字
                validators: configsData.validators2([])
            },
            //多标签
            manifest: {
                type: 'manifest', //要创建的表单字段的类型
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                data: configsData.functionType(null),
                isAllData: configsData.boolean(false),
                //uniqueFlag: 'name', //去重标识
                tagBg: configsData.array([]), //标签的背景
                tagBgExistClass: configsData.string('mf-list-bgExist'),
                isTipValueEmpty: configsData.boolean(true), //输入框为空时回车是否提示
                tagMaxNum: configsData.string('1000'), //标签的最大个数
                inputMaxMum: configsData.string(''), //输入框最多输入字符
                validators: configsData.validators2([]),
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null) // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
            },
            //文件上传
            upload: {
                type: 'upload', //要创建的表单字段的类型
                readOnly: configsData.boolean(false),
                disabled: configsData.boolean(false),
                url: configsData.string(''),
                uploadBtnText: configsData.string('上传'),
                multiple: configsData.boolean(false), //是否传递多个文件；true可以选择多个文件上传 ，false不可以
                formName: configsData.string("upfile"), //表单名称
                fileName: configsData.string("fileName"), //文件 input的名称
                extendData: configsData.object({}),
                validators: configsData.validators2([]),
                value: configsData.functionType(null), //默认为'',在这里设置的value则是默认值，也是初始值
                initDone: configsData.functionType(null), //表单元素初始化完成,this指向整个表单字段
                change: configsData.functionType(null), // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                responseKeys: configsData.object({ "repCode": "code", "repData": "data", "message": "codeMsg" }), //上传成功后 返回的数据 状态 数据 和 信息的key
                uploadedFileKeys: configsData.object({ "fileName": "name", "fileUrl": "url" }), //返回的数据的格式 文件名  和 文件 路径
                accept: configsData.accept([]), //数组限制文件类型
                acceptRemark: configsData.string("上传文件类型不符合要求"), //文件类型提示语
                drag: configsData.boolean(false), //是否拖拽上传
                maxSize: configsData.uploadMaxSize(""),
                maxSizeRemark: configsData.string("文件大小不符合要求"), //文件大小提示语
                fileNum: configsData.string("5"), //默认可以上传多个
                fileNumRemark: configsData.string("上传文件个数大于限制个数"),
                echoStyle: configsData.boolean(false), //文件上传风格
            },
            //富文本
            umEditor: {
                type: 'umEditor',
                width: configsData.string(''), //宽
                height: configsData.string(''), //高
                homeUrl: configsData.string('../libs/um/'), //路径
                value: configsData.string(''),
                imageUrl: configsData.string(''),
                imageFieldName: configsData.string(''),
                getOperationDom: configsData.string('') //回调函数 返回um
            },
            //城市选择器
            city: {
                type: 'city',
                multiSelect: configsData.boolean(false), //是否多选，默认是单选
                multiMaximum: configsData.string(''), //最多可以选多少个
                idFlag: configsData.string('id'),
                nameFlag: configsData.string('cityName'),
                pinyinFlag: configsData.string('pingyin'), //拼音字段
                hotFlag: configsData.string("isHot"), //热门城市标识
                data: configsData.functionType(null), //整体数据，拆分成数据cityData,menuHeadData,cityLetterData,hotCityData,需要这四个才能完成
                value: configsData.functionType(null), //值
                required: configsData.boolean(true), //是否是必填
                disabled: configsData.boolean(false), //按钮是否可点击
                readOnly: configsData.boolean(false), //按钮是否是只读状态
                change: configsData.functionType(null), //值改变触发
                initDone: configsData.functionType(null), //初始化完成触发
                //btn
                placeholder: configsData.string('请选择城市'), //默认提示语
                isSearch: configsData.boolean(true), //是否有搜索功能
                searchPlaceholder: configsData.string('请输入关键字'), //输入框提示文字
                btnStyle: configsData.object({}),
                btnClass: configsData.string(''),
                isIcon: configsData.boolean(true), //是否显示图标
                isCenter: configsData.boolean(true),
                //menu
                menuStyle: configsData.object({}),
                menuClass: configsData.string(''),
                menuHeadData: configsData.array(['热门城市', 'ABCD', 'EFGH', 'JKLM', 'NPQR', 'STWX', 'YZ']), //菜单头部展示数据
                //list
                listStyle: configsData.object({}),
                listClass: configsData.string(''),
                validators: configsData.validators2([])
            },
            //行配置
            paraConfig: {
                type: 'paraConfig', //要创建的表单字段的类型
                childrenList: [],
                maxNum: configsData.string(''),
                byteChinese: configsData.string('1'), //中文一个字符占几个字节,默认为一个字符占1个字节
                checkType: configsData.checkType('all'), //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck: configsData.boolean(true), //值改变的时候是否执行校验
                checkTipType: configsData.checkTipType('tooltip'), //校验提示类型,message/tooltip
                isTipBorder: configsData.boolean(true), //是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight: configsData.boolean(false), //使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape: configsData.checkTipShape('hollow'), //气泡提示形状
                checkTipDirection: configsData.checkTipDirection('top'), //气泡提示方向
                checkTipLocation: configsData.checkTipLocation(''), //气泡提示位置
                checkTipTime: configsData.string('2'), //消息提示显示时间
                valueIsArray: configsData.boolean(false), //当没有加减行的时候，获取值默认不是一个数组，强制是一个数组的，则返回一个数组
            },
            //表格配置
            tableParaConfig: {
                type: 'tableParaConfig', //要创建的表单字段的类型
                childrenThead: configsData.array([]),
                childrenTbody: [],
                maxNum: configsData.string(''),
                canNull: configsData.boolean(false), //可以被删空，或者数据为空的时候默认不增加一行。
                byteChinese: configsData.string('1'), //中文一个字符占几个字节,默认为一个字符占1个字节
                checkType: configsData.checkType('all'), //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck: configsData.boolean(true), //值改变的时候是否执行校验
                checkTipType: configsData.checkTipType('tooltip'), //校验提示类型,message/tooltip
                isTipBorder: configsData.boolean(true), //是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight: configsData.boolean(false), //使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape: configsData.checkTipShape('hollow'), //气泡提示形状
                checkTipDirection: configsData.checkTipDirection('top'), //气泡提示方向
                checkTipLocation: configsData.checkTipLocation(''), //气泡提示位置
                checkTipTime: configsData.string('2'), //消息提示显示时间
                valueIsArray: configsData.boolean(false), //当没有加减行的时候，获取值默认不是一个数组，强制是一个数组的，则返回一个数组
            },
            //块配置
            blockParaConfig: {
                type: 'blockParaConfig', //要创建的表单字段的类型
                childrenBlock: [],
                maxNum: configsData.string(''),
                byteChinese: configsData.string('1'), //中文一个字符占几个字节,默认为一个字符占1个字节
                checkType: configsData.checkType('all'), //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck: configsData.boolean(true), //值改变的时候是否执行校验
                checkTipType: configsData.checkTipType('tooltip'), //校验提示类型,message/tooltip
                isTipBorder: configsData.boolean(true), //是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight: configsData.boolean(false), //使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape: configsData.checkTipShape('hollow'), //气泡提示形状
                checkTipDirection: configsData.checkTipDirection('top'), //气泡提示方向
                checkTipLocation: configsData.checkTipLocation(''), //气泡提示位置
                checkTipTime: configsData.string('2'), //消息提示显示时间
                valueIsArray: configsData.boolean(false), //当没有加减行的时候，获取值默认不是一个数组，强制是一个数组的，则返回一个数组
            },
            //索引
            index: {
                type: "index",
                name: configsData.string(""),
                value: configsData.string("{{index}}"),
                style: configsData.object({}), //设置样式
                language: configsData.indexLanguage('number') //number,roman,chinese
            },
            //操作
            actions: {
                type: "actions",
                value: configsData.actionsValue([]), //"add","remove","up","down","upToTop","downToBottom"
                plusOnlyOne: configsData.boolean(true), //是否添加最后一行的操作，默认不是，点击哪行添加哪行
                isDeleteOnlyOne: configsData.boolean(false), //是否可以删除唯一一行,默认是不可以的
                language: configsData.actionsLanguage("icon"), //图标icon ,文字character
                updateValue: configsData.array([]), //复制的时候，获取当前行的某些数据
                style: configsData.object({}), //设置样式
            }
        },
        //表单配置的联动操作配置
        configsHandlerEvent: {
            form: handlerData('left'),
            paraConfig: handlerData('center'),
            tableParaConfig: handlerData('center'),
            blockParaConfig: handlerData('center'),
        },
    };
    return formConfigsData;
});
