var tplHome = require('../templates/home.string');

SPA.defineView('home', {
  html: tplHome,

  plugins: ['delegated', {
  name: 'avalon',
  options: function (vm) {
    vm.homelist1 = [];
    vm.homelist2 = [];
    vm.homelistbanner = [];
  }
}],
  init: {
     vm: null,
     livelistArray: [],
     homeSwiper: null,
     homeHotSwiper: null,
     formatData: function (arr) {
       var tempArr = [];
       for (var i = 0; i < Math.ceil(arr.length/2); i++) {
         tempArr[i] = [];

         tempArr[i].push(arr[2*i]);
         tempArr[i].push(arr[2*i+1]);
       }
       return tempArr;
     },
     forData: function (arr) {
       var tempArr = [];
         tempArr.push(arr[4]);
         tempArr.push(arr[0]);
         tempArr.push(arr[1]);
       return tempArr;

     }

   },
  bindActions: {
    'goto.detail': function (e, data) {
    //  console.log(1);
      SPA.open('detail', {
        param: {
          data
        }
      });
    }

  },
  bindEvents: {

    'beforeShow': function () {
      var that = this;

      // 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        url: '/api/getLivelist.php',
        type: 'get',
        data:{
          rtype: 'homeList'
        },
        success: function (rs) {
          //that.livelistArray = rs.data;
          that.vm.homelist = that.formatData(rs.list.types);
          that.vm.homelist1 = that.formatData(rs.list.types[0].drug_list);
          that.vm.homelist2 = that.formatData(rs.list.types[1].drug_list);
          that.vm.homelistbanner = that.forData(rs.list.banner);
          var mySwiper = new Swiper ('.swiper-container', {
            loop: false,
            //autoplay: 1000,
            // 如果需要分页器
            pagination: '.swiper-pagination',
          })
        }
      });
    },


  'show': function () {
      //给header添加背景
      //var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.on('scroll', function () {
          var y = this.y,
          maxY = this.maxScrollY - y;
          if (y > -40) {
            $('header').removeClass('active');
              return '';
          }
          if (y <= -40) {
              $('header').addClass('active');
              return '';
          }
      });
 }
}
});
