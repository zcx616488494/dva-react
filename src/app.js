// import '@/assets/echartsModule';
// import '@babel/polyfill';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    }
  }
};
