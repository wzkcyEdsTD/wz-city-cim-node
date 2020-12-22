const axios = require("axios");
const instance = axios.create();

const getExtraVideoLogin = async () => {
    return instance.post(
        'http://10.36.245.204:8765/api//login',
        {
            'MACAddr': '',
            'pwd': 'b27d42bfb930b9186aae8986a7f6db52',
            'uaccount': 'yjzx@wz'
        }
    )
}

/**
 * 获取应急视频
 * @param {*} param0 
 */
const getExtraVideo = async (data) => {
    return instance.post(
        'http://10.36.245.204:8765/api//VideoStart',
        data
    )
}

module.exports = {
    getExtraVideoLogin,
    getExtraVideo
}