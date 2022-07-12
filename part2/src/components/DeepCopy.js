import React from 'react'
//深拷贝，同时避免循环引用，把App.js里的方法提取出来作一个组件，可以重复调用这个深拷贝的方法
const DeepCopy = (target,map = new Map())=>{
        // 如果是对象，且不是原始值null
        if (typeof target === 'object' && target !== 'null') {
            // 克隆前判断数据之前是否克隆过
            const cache = map.get(target);
            if (cache) {
                // 如果克隆过了，则直接返回
                return cache;
            }
            // 创建容器
            const result = Array.isArray(target) ? [] : {};

            // target为要被克隆的数据，result为克隆的结果
            // 把target做为键，result作为值
            // Map的好处在于键可以为任意类型
            // 等下如果又克隆到了相同的target，就直接从Map中读取数据
            map.set(target, result);

            const keys = Object.keys(target);
            keys.forEach(key => {
                // 我们需要把map传到函数deepclone中保留map的数据
                result[key] = DeepCopy(target[key],map)  //**** 真是机智啊
            })
            return result;
        }
        // 如果是原始值，则直接返回
        return target;
    }

export default DeepCopy