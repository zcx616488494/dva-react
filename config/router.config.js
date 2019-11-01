export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
       // dashboard
       { path: '/', redirect: '/dashboard/analysis'},
       {
        path: '/dashboard',
        name: '首页',
        icon: 'dashboard',
        component: './Dashboard/Analysis',
       },
      //  {
      //    path: '/dashboard',
      //    name: 'dashboard',
      //    icon: 'dashboard',
      //    routes: [
      //      {
      //        path: '/dashboard/analysis',
      //        name: '分析页',
      //        component: './Dashboard/Analysis',
      //      },
      //      {
      //        path: '/dashboard/monitor',
      //        name: '监控页',
      //        component: './Dashboard/Monitor',
      //      },
      //      {
      //        path: '/dashboard/workplace',
      //        name: '工作台',
      //        component: './Dashboard/Workplace',
      //      },
      //    ],
      //  },
       // form
       {
        path: '/form',
        name: '表单页',
        icon: 'form',
        routes: [
          {
            path: '/form/basicform',
            name: '基础表单',
            component: './Form/BasicForm',
          },
          {
            path: '/form/stepform',
            name: '分歩表单',
            component: './Form/StepForm',
          },
          {
            path: '/form/advancedform',
            name: '高级表单',
            component: './Form/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        name: '表格页',
        icon: 'table',
        routes: [
          {
            path: '/list/tablelist',
            name: '查询表格',
            component: './List/TableList',
          },
          {
            path: '/list/basiclist',
            name: '基础表格',
            component: './List/BasicList',
          },
          {
            path: '/list/cardlist',
            name: '卡片表格',
            component: './List/CardList',
          },
          {
            path: '/list/searchlist',
            name: '搜索表格',
            component: './List/SearchList',
          }
        ],
      },
      // profile
      {
        path: '/profile',
        name: '详情页',
        icon: 'profile',
        routes: [
          {
            path: '/profile/basic',
            name: '基础表单',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: '分歩表单',
            component: './Profile/AdvancedProfile',
          },
          {
            path: '/profile/basic/:id',
            name: '详情',
            hideInMenu: true,
            component: './Profile/BasicProfileDetail',
          },
        ],
      },
      // account
      {
        path: '/account',
        name: '个人页',
        icon: 'user',
        routes: [
          {
            path: '/account/center',
            name: '个人中心',
            component: './Account/AccountCenter',
          },
          {
            path: '/account/settings',
            name: '个人设置',
            component: './Account/AccountSetting',
          }
        ],
      },
    ]
  }
];
