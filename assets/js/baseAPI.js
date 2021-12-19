//注意：每次调用$.git() 或 $.post() 或 $.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3008' + options.url;
    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 回调函数
    options.complete = res => {
        //在complete回调函数中可以通过responseText拿到服务器响应回来的数据
        // if(res.responseText)
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token 并跳转到 login.html页面
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})