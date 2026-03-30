const routerExtra = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    let { userInfo } = store.state.userInfo;
    if (!userInfo) {
      const initGetUserInfo = localStorage.getItem('ML_DESIGN');
      if (initGetUserInfo && initGetUserInfo !== 'null' && initGetUserInfo !== 'undefined') {
        try {
          const parsedUserInfo = JSON.parse(initGetUserInfo);
          if (parsedUserInfo && typeof parsedUserInfo === 'object') {
            await store.dispatch('userInfo/SET_USER_PROFILE', parsedUserInfo);
            if (parsedUserInfo.currentMechantId) {
              await store.dispatch('userInfo/SET_USER_CURRENT_MERCHANTID', parsedUserInfo.currentMechantId);
            }
            if (parsedUserInfo.userAuthorizeList) {
              await store.dispatch('userInfo/SET_USER_AUTHORIZELIST', parsedUserInfo.userAuthorizeList);
            }
            userInfo = store.state.userInfo.userInfo;
          } else {
            localStorage.removeItem('ML_DESIGN');
          }
        } catch (error) {
          localStorage.removeItem('ML_DESIGN');
          store.dispatch('userInfo/SET_USER_PROFILE', null);
        }
      } else if (initGetUserInfo === 'null' || initGetUserInfo === 'undefined') {
        localStorage.removeItem('ML_DESIGN');
      }
    }

    if (userInfo && to.path === '/login') {
      next('/');
    } else if (to.matched.length === 0) {
      if (from.name) {
        next({ name: from.name });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!userInfo) {
        next({ name: 'Login' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

export default routerExtra;
