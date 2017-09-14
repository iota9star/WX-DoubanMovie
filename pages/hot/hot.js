var deal = require('../../utils/DataDealUtils.js');
var baidumap = require("../../libs/bmap-wx.min.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "https://api.douban.com/v2/movie/in_theaters",
        banners: [],
        page: 1,
        indicatorDots: true,
        indicatorColor: '#ffffff',
        indicatorActiveColor: '#06c012',
        autoPlay: true,
        circular: true,
        interval: 3000,
        duration: 1000,
        movies: [],
        weather: {
            date: '加载天气中',
            temperature: '',
            weatherDesc: '',
            weatherIcon: ''
        },
        location: '成都',
        hidden: false,
        vertical: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initBMap();
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
    initBMap: function () {
        var ctx = this;
        var BMap = new baidumap.BMapWX({
            ak: "81hP9kRzGnh4D95ZA7dfN5HiduyuCDM4"
        });
        BMap.regeocoding({
            fail: function (err) {
                console.log(err);
            },
            success: function (data) {
                var currentCity = data.originalData.result.addressComponent.city;
                var location = currentCity.substr(0, currentCity.length - 1);
                ctx.setData({location: location});
                ctx.getMovies();
            }
        });
        BMap.weather({
            fail: function (err) {
                console.log(err);
            },
            success: function (res) {
                var currentWeather = res.originalData.results[0].weather_data[0];
                var date = currentWeather.date;
                var temperature = currentWeather.temperature;
                var weatherDesc = currentWeather.weather;
                var weatherIcon = currentWeather.dayPictureUrl;
                ctx.setData({
                    weather: {
                        date: date,
                        temperature: temperature,
                        weatherDesc: weatherDesc,
                        weatherIcon: weatherIcon
                    }
                });
            }
        });
    },
    getMovies: function () {
        var ctx = this;
        ctx.setData({hidden: false});
        var page = ctx.data.page;
        var url = ctx.data.url;
        var location = ctx.data.location;
        var count = 20;
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
                var newMovies = res.data.subjects;
                var length = newMovies.length;
                if (length === 0) {
                    wx.showToast({
                        title: '没数据了',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    var banners = [];
                    var size = length > 5 ? 5 : length;
                    for (var i = 0; i < size; i++) {
                        banners.push(newMovies[i].images.large);
                    }
                    ctx.setData({banners: banners});
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
