var deal = require('../../utils/DataDealUtils.js');
Page({
    data: {
        // text:"这是一个页面"
        url: 'https://api.douban.com/v2/movie/search',
        keywords: "",
        movies: [],
        page: 1,
        hidden: true,
        modalHidden: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.search();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    detail: function (e) {
        getApp().detail(e);
    },
    hideModal: function () {
        this.setData({modalHidden: true})
    },
    bindKeyInput: function (e) {
        this.setData({keywords: e.detail.value});
    },
    search: function () {
        if (this.data.keywords === "") {
            this.setData({modalHidden: false});
            return;
        }
        this.setData({hidden: false});
        var ctx = this;
        var keywords = ctx.data.keywords;
        var url = ctx.data.url;
        var page = ctx.data.page;
        var count = 20;
        var start = (page - 1) * count;
        wx.request({
            url: url,
            data: {
                q: keywords,
                start: start,
                count: count
            },
            header: {
                'Content-Type': 'json'
            },
            success: function (res) {
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
