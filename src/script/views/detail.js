var tplDetail = require('../templates/detail.string');

// 引用公共方法
var util = require('../utils/fn.js');


SPA.defineView('detail', {
  html: tplDetail,
  init : {
    swiperMessage:null
  },
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.detailImg = "";
      vm.namecn = "";
      vm.refdrugcompanyname = "";
      vm.gongneng = "";
      vm.isShowLoading = true;
    }
  }],
  bindActions: {
    'detailt.slide': function (e, data) {
      this.swiperMessage.slideTo($(e.el).index());
    },
    'back': function () {
      this.hide();
    }

  },

  bindEvents: {
    'beforeShow': function () {
      var that = this;
      that.vm = that.getVM();
      var d = this.param.data.id;
      //console.log(this.param.data.id);
      // 获得vm对象

      $.ajax({
        url: 'http://openapi.db.39.net/app/GetDrugById?id='+d+'&sign=9DFAAD5404FCB6168EA6840DCDFF39E5&app_key=app',
        success: function (rs) {
         var re = JSON.parse(rs);
          that.vm.detailImg  = re.results.listimg;
          that.vm.namecn = re.results.namecn;
          that.vm.refdrugcompanyname = re.results.refdrugcompanyname;
          that.vm.gongneng = re.results.gongneng;
          that.vm.isShowLoading = false;
          console.log( rs);

        }
      })
    },


    'show': function () {


      this.swiperMessage = new Swiper ('.swiper-message', {
        loop: false,
        onSlideChangeStart: function (swiper) {
          var index = swiper.activeIndex;
          var $lis = $('.detail-nav li');
          util.setFocus($lis.eq(index));
        }
          });
    }
  }

});
