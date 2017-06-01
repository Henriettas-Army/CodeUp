/* global window */
const requireAuth = (nextState, replace) => {
  if (!window.localStorage.getItem('token')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export default requireAuth;
