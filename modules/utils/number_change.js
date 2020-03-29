/**
 * @name number_change
 * @author kt
 * @description number_change数字转换
 * @date 2017-9-6
 * @param {number} arabic -需要转换的阿拉伯数字
 * @returns {object} numberChange 返回的是一个对象
 * @returns {string} numberChange.toRoman(arabic);返回的是对应的罗马数字
 * @returns {string} numberChange.toChinese(arabic);返回的是对应的中文数字
 */
define(function () {
    var numberChange= {
        /*阿拉伯数字转换成罗马数字*/
        toRoman: function (arabic) {
            var alpha = [ 'I', 'V', 'X', 'L', 'C', 'D', 'M' ], roman = "", bit = 0;
            while (arabic > 0) {
                var tempnum = arabic % 10;
                switch (tempnum) {
                    case 3:
                    {
                        roman = alpha[bit] + roman;
                        tempnum--;
                    }
                    case 2:
                    {
                        roman = alpha[bit] + roman;
                        tempnum--;
                    }
                    case 1:
                    {
                        roman = alpha[bit] + roman;
                        break;
                    }
                    case 4:
                    {
                        roman = alpha[bit + 1] + roman;
                        roman = alpha[bit] + roman;
                        break;
                    }
                    case 8:
                    {
                        roman = alpha[bit] + roman;
                        tempnum--;
                    }
                    case 7:
                    {
                        roman = alpha[bit] + roman;
                        tempnum--;
                    }
                    case 6:
                    {
                        roman = alpha[bit] + roman;
                        tempnum--;
                    }
                    case 5:
                    {
                        roman = alpha[bit + 1] + roman;
                        break;
                    }
                    case 9:
                    {
                        roman = alpha[bit + 2] + roman;
                        roman = alpha[bit] + roman;
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
                bit += 2;
                arabic = Math.floor(arabic / 10);
            }
            return roman;
        },
        /**
         * 阿拉伯数字转中文数字,
         * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
         * 传入数字字符串则没有限制
         * @param {number|string} digit
         */
        toChinese: function (arabic) {
            arabic = typeof arabic === 'number' ? String(arabic) : arabic;
            const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const unit = ['千', '百', '十', ''];
            const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

            var breakLen = Math.ceil(arabic.length / 4);
            var notBreakSegment = arabic.length % 4 || 4;
            var segment;
            var zeroFlag = [], allZeroFlag = [];
            var result = '';

            while (breakLen > 0) {
                if (!result) { // 第一次执行
                    segment = arabic.slice(0, notBreakSegment);
                    var segmentLen = segment.length;
                    for (var i = 0; i < segmentLen; i++) {
                        if (segment[i] != 0) {
                            if (zeroFlag.length > 0) {
                                result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
                                // 判断是否需要加上 quot 单位
                                if (i === segmentLen - 1 && breakLen > 1) {
                                    result += quot[breakLen - 2];
                                }
                                zeroFlag.length = 0;
                            } else {
                                result += zh[segment[i]] + unit[4 - segmentLen + i];
                                if (i === segmentLen - 1 && breakLen > 1) {
                                    result += quot[breakLen - 2];
                                }
                            }
                        } else {
                            // 处理为 0 的情形
                            if (segmentLen == 1) {
                                result += zh[segment[i]];
                                break;
                            }
                            zeroFlag.push(segment[i]);
                            continue;
                        }
                    }
                } else {
                    segment = arabic.slice(notBreakSegment, notBreakSegment + 4);
                    notBreakSegment += 4;

                    for (var j = 0; j < segment.length; j++) {
                        if (segment[j] != 0) {
                            if (zeroFlag.length > 0) {
                                // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
                                if (j === 0) {
                                    result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
                                } else {
                                    result += '零' + zh[segment[j]] + unit[j];
                                }
                                zeroFlag.length = 0;
                            } else {
                                result += zh[segment[j]] + unit[j];
                            }
                            // 判断是否需要加上 quot 单位
                            if (j === segment.length - 1 && breakLen > 1) {
                                result += quot[breakLen - 2];
                            }
                        } else {
                            // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
                            if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
                                result += quot[breakLen - 1];
                                zeroFlag.length = 0;
                                zeroFlag.push(segment[j]);
                            } else if (allZeroFlag.length > 0) {
                                // 执行到最后
                                if (breakLen == 1) {
                                    result += '';
                                } else {
                                    zeroFlag.length = 0;
                                }
                            } else {
                                zeroFlag.push(segment[j]);
                            }

                            if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
                                // 如果执行到末尾
                                if (breakLen === 1) {
                                    allZeroFlag.length = 0;
                                    zeroFlag.length = 0;
                                    result += quot[breakLen - 1];
                                } else {
                                    allZeroFlag.push(segment[j]);
                                }
                            }
                            continue;
                        }
                    }

                    --breakLen;
                }

                return result;
            }
        }
    };
    return numberChange;
});