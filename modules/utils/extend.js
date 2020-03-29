/**
 * @name 扩展工具方法
 * @author kt
 * @description 这是一个扩展工具方法
 * @date 2017-6-6
 */
define(function() {
    var Class = (function() {
        var _mixProto = function(r, s) {
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    r[p] = s[p];
                }
            }
        };
        var _extend = function() {

            this.initPrototype = true;
            var prototype = new this();
            this.initPrototype = false;

            for (var i = 0, len = arguments.length; i < len; i++) {
                _mixProto(prototype, arguments[i].prototype || arguments[i]);
            }

            function SonClass() {
                if (!SonClass.initPrototype && this.init)
                    this.init.apply(this, arguments);
            }

            SonClass.prototype = prototype;
            SonClass.prototype.constructor = SonClass;
            SonClass.extend = arguments.callee;

            return SonClass
        };
        var Class = function() {};
        Class.extend = _extend;

        return Class
    })();

    return Class
})