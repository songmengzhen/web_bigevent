//路径统一挂载
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //挂载统一的请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //在使用有权限的地址时不论成功还是失败都会调用complete回调函数
    //优化权限 只有登录了才能访问主页面
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token并跳转到登录页面
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})