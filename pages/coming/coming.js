var deal = require('../../utils/DataDealUtils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "https://api.douban.com/v2/movie/coming_soon",
        page: 1,
        count: 16,
        movies: [],
        hidden: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMovies();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getMovies();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    detail: function (e) {
        getApp().detail(e);
    },
    getMovies: function () {
        var ctx = this;
        ctx.setData({hidden: false});
        var page = ctx.data.page;
        var url = ctx.data.url;
        var location = ctx.data.location;
        var count = ctx.data.count;
        var start = (page - 1) * count;
        wx.request({
            url: url,
            header: {
                "content-type": "json"
            },
            data: {
                city: location,
                start: start,
                count: count
            },
            success: function (res) {
                wx.setNavigationBarTitle({
                    title: res.data.title
                });
                var newMovies = res.data.subjects;
                var length = newMovies.length;
                if (length === 0) {
                    wx.showToast({
                        title: '没数据了',
                        icon: 'success',
                        duration: 2000
                    })
                }
                deal.dealMovies(newMovies);
                var movies = ctx.data.movies;
                ctx.setData({
                    movies: movies.concat(newMovies),
                    hidden: true,
                    page: ++page
                });
            }
        })
    }
});
