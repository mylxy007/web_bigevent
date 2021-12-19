$(function () {
    //去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    //从layui中获取 form对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault();
        let username = $('#form_reg [name=username]').val();
        let password = $('#form_reg [name=password]').val();
        // 2.发起一个ajax请求
        $.ajax({
            type: 'post',
            url: '/api/reg',
            data: {
                username: username,
                password: password,
                repassword: password
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录！');
                $('#link_login').click();
            }

        })
    });
    //监听登录跳单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                console.log(res.code);
                //本地保存登录成功后的token值
                localStorage.setItem('token', res.token);
                //跳转到后台主页4

                location.href = '/index.html';

            }
        })
    })
})