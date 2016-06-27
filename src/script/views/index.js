var tplIndex = require('../templates/index.string');

SPA.defineView('index', {
  html: tplIndex,


  // 载入插件列表
  // delegated 实现tab事件的绑定
  plugins: ['delegated'],

  // 定义子视图
  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['home', 'position', 'my','classify'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],

  // 绑定tab 事件
bindActions: {
  'switch.tabs': function (e, data) {//在点击的元素上添加   action-type = "switch.tabs"
    // 设置当前 tab 高亮
    //上面的  plugins:["delegated"],必加  //它返回的是一个对象  如 el:li
    $(e.el).addClass("active").siblings().removeClass("active"); //高亮
    // 切换子视图
    this.modules.content.launch(data.tag);
  }


},
});
