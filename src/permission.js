const routerExtra = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    let { userInfo } = store.state.userInfo;
    if (!userInfo) {
      const initGetUserInfo = localStorage.getItem('ML_DESIGN');
      if (initGetUserInfo) {
        try {
          await store.dispatch('userInfo/SET_USER_PROFILE', JSON.parse(initGetUserInfo));
          await store.dispatch('userInfo/SET_USER_CURRENT_MERCHANTID', JSON.parse(initGetUserInfo).currentMechantId);
          await store.dispatch('userInfo/SET_USER_AUTHORIZELIST', JSON.parse(initGetUserInfo).userAuthorizeList);
          userInfo = store.state.userInfo.userInfo;
        } catch (error) {
          store.dispatch('userInfo/SET_USER_PROFILE', null);
        }
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
