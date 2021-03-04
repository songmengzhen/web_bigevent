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
            var pwd = $('.reg-box[name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致';
            }
        }
    })
})