import React from 'react';
import { connect } from 'dva';
/*eslint-disable */

function AuthComponent({ children, location, routerData, status }) {

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}

export default connect()(AuthComponent);
