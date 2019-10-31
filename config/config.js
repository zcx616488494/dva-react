import slash from 'slash2';
import pageRoutes from './router.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true
      },
      locale: {
        enbale: true,
        default: 'zh-CN',
        baseNavigator: 'true'
      },
      dynamicImport: {
        // loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3
      }
    }
  ]
];

export default {
  plugins,
  treeShaking: true,
  targets: {
    ie: 9
  },
  routes: pageRoutes,
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableRedirectHoist: true,
  // history: 'hash',
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules')
        || context.resourcePath.includes('ant.design.pro.less')
        || context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `zzz${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    }
  },
  proxy: {
    '/api': {
      // "target": "http://218.92.211.30:10007/",
      target: 'http://172.16.17.14:8201/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  }
};
