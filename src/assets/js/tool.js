/**
 * @file 项目共用的工具类
 */
/* eslint-disable */
export default {
    // 解析url字符串
    fnQueryString(str) {
        if (!str) {
            return {};
        }
        let obj = {};
        let arr = str.split('&');
        let i = arr.length;
        while (i--) {
            let pm = arr[i].split('=');
            obj[pm[0]] = pm[1];
        }
        return obj;
    },
    /**
     * 日期生成公共方法
     *
     * @param {Date} t 要生成的时间数据,可选 ag: new Date(), 时间戳等
     * @return {Object} 生成的日期的各种属性
     * */
    getDates(t) {
        t = t || new Date();
        var d = new Date(t);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var day = d.getDay();
        var tempDate = new Date(t);
        tempDate.setMonth(month);
        tempDate.setDate(0);
        var daysCount = tempDate.getDate();
        var timeChuo = d.getTime();
        return {
            year: year,
            month: month,
            date: date,
            day: day,
            timeChuo:timeChuo,
            daysCount: daysCount,
            fullStr: year + '/' + (month < 10 ? '0' + month : month) + '/' + (date < 10 ? '0' + date : date),
            numStr: year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
        };
    },
    extend(target, options, deep) {
        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                let copy = options[name];
                if (deep && copy instanceof Array) {
                    target[name] = this.extend(deep, [], copy);
                } else if (deep && copy instanceof Object) {
                    target[name] = this.extend(deep, {}, copy);
                } else {
                    target[name] = options[name];
                }
            }
        }
        return target;
    },
    jsonToUrl(json){
        if (!json) {  
            return '';  
        }  
          
        var tmps = [];  
        for (var key in json) {  
            if(json[key]) {
                tmps.push(key + '=' + json[key]);  
            }
        }  
          
        return tmps.join('&');  
    },
    trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    },
    deepCopy(source) { 
        var result={};
        for (var key in source) {
            result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
        } 
       return result; 
    },
    toDecimal2(x) { 
        var f = parseFloat(x); 
        if (isNaN(f)) { 
            return false; 
        } 
        var f = Math.round(x*100)/100; 
        var s = f.toString(); 
        var rs = s.indexOf('.'); 
        if (rs < 0) { 
            rs = s.length; 
            s += '.'; 
        } 
        while (s.length <= rs + 2) { 
            s += '0'; 
        } 
        return s; 
    } 
};
