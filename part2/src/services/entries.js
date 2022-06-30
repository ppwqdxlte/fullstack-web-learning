import axios from "axios";
/*
如果json.server有很多数据端点的话，难道针对每个url都要写一个js模块吗？
今天有nodes.js,persons.js，明天可能就有students.js，emps.js等等...
所以url作为参数比写死更灵活
const baseUrl = 'http://localhost:3001/notes'*/

const getAll = (baseUrl) => {
    return axios.get(baseUrl)
}

const create = (baseUrl, newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (baseUrl, id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}