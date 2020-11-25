const axios = require("axios");
const Qs = require("qs");
const instance = axios.create();
const loginObj = { userName: "shujushangtu", password: "a11111111" }

instance.interceptors.request.use(
    async config => {
        let response = await axios({
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            url: "http://10.36.208.245/sessionManage/login.action",
            data: Qs.stringify(loginObj)
        });
        config.headers.common.Cookie = ['username=shujushangtu'].concat(response.headers['set-cookie']).join("; ")
        return config;
    }, err => {
        return Promise.reject(err);
    });

const getAxios = (url, data = {}) => {
    return instance.request({
        url,
        body: { params: JSON.stringify(data) }
    }).then(res => {
        return res.data ? res.data : (res);
    });
};

const getGridMemberRoutes = ({ url }) => {
    return getAxios(url);
}

module.exports = {
    getGridMemberRoutes
}