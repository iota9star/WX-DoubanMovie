var deal = require('../../utils/DataDealUtils.js');
Page({
    data: {
        // text:"这是一个页面"
        movie: {
            summary: ''
        }
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.getMovie(options.id);
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    getMovie: function (id) {
        var ctx = this;
        wx.request({
            url: 'https://api.douban.com/v2/movie/subject/' + id,
            header: {
                'Content-Type': 'json'
            },
            success: function (res) {
                var movie = res.data;
                wx.setNavigationBarTitle({
                    title: movie.title
                });
                deal.dealMovie(movie);
                ctx.setData({
                    movie: movie,
                    hidden: true
                });
            }
        })
    }
});
