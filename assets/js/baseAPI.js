//注意：每次调用$.git() 或 $.post() 或 $.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})