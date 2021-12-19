$(function () {
    //调用 getUserInfo 获取用户的基本信息
    getUserInfo();

    //导出layer
    let layer = layui.layer;
    //退出按钮绑定点击事件
    $('#btnLogout').on('click', function () {
        //提示用户是否退出

        layer.confirm('确认退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            //关闭 confirm 
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        //headers 就是请求头配置对象
        success: res => {
            if (res.code != 0) {
                return layui.layer.msg('获取用户基本信息失败！');
            }
            //调用 renderAvatar 渲染用户头像
            console.log(res);
            renderAvatar(res.data);
        },
        //complete 全局配置

    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称
    let name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户的头像
    if (user.user_pic) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', usre.user_pic).show();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html((name.substr(0, 1)).toUpperCase()).show();

    }
}