/**
 * @file 数组交换位置方法
 * @name 数组交换位置方法
 * @author kt
 * @description array_exchange_location数组元素之间交换位置的方法
 * @date 2017-9-7
 * @param {array} arr -交换位置的整个数组
 * @param {string} index -现在的位置
 * @param {string} newIndex -交换位置后位置
 * @returns {array} arr 返回交换之后的新数组
 */
define(function() {
    var arrayLocation={
        /*相互交换*/
        exchange:function(arr,index,newIndex){
            arr[index] = arr.splice(newIndex, 1, arr[index])[0];
            return arr;
        },
        /*交换到第一个*/
        toFirst:function(arr,index){
            arr.unshift(arr.splice(index,1)[0]);
            return arr;
        },
        /*交换到最后一个*/
        toLast:function(arr,index){
            arr.push(arr.splice(index,1)[0]);
            return arr;
        }
    }
    return arrayLocation;
});