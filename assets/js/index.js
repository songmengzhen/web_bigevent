$(function () {
    //获取当前页面用户的基本信息
    userInfo();
    function userInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            /* headers: {
                Authorization: localStorage.getItem('token') || ''
            }, */
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // layui.layer.msg('获取用户信息成功！')
                //更换用户头像和用户信息
                renderAvatar(res.data);
            },
            //在使用有权限的地址时不论成功还是失败都会调用complete回调函数
            //优化权限 只有登录了才能访问主页面
            /* complete: function (res) {
                console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    //强制清空token并跳转到登录页面
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
            } */
        })
    }
    //渲染用户的头像
    function renderAvatar(user) {
        //获取到用户的姓名和昵称
        var name = user.username || user.nickname;
        //设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp' + name);
        //按照获取到的内容区渲染头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            //如果用户头像为空 则生成的图片里边放的文字是名字的第一个字母大写
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }
    //实现退出功能
    $('#tuichu').on('click', function () {
        layer.confirm('确定要退出么?', { icon: 3, title: '提示' }, function (index) {
            //当点击确定推出 清空token 并跳转到登录页面
            localStorage.removeItem('token');
            location.href = "/login.html";
            layer.close(index);
        });
    })
})