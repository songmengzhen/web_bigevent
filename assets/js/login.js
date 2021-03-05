$(function () {
    //1.给注册按钮绑定事件
    $('#link-reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    //2.给登录按钮注册事件
    $('#link-login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    //3.自定义密码验证
    //3.1 从layui中获取form对象
    var form = layui.form;
    //3.2 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码输入是否一致  通过value形参拿到确认密码中用户输入的值跟之前输入的密码对比
        repwd: function (value) {
            //切记：竖向选择器中间要有空格
            var pwd = $('.reg-box [name=password]').val();
            // console.log(pwd);
            // console.log(value);
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    })
    //实现注册功能 监听表单提交
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        /* var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        } */

        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            // data: $(this).serialize(),
            // data: data,
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layer.msg('注册成功！');
            }
        })
    })
    //实现登录功能 记得要把token存起来
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: "http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败！')
                }
                layui.layer.msg('登录成功！')
                //这里记得把登录成功得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token);
                //登录成功跳转页面
                location.href = '/index.html';
            }
        })
    })
})