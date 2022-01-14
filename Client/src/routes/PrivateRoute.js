import { Redirect, Route } from "react-router";
function PrivateRoute ({ children, ...rest }) {
    return (
      <Route {...rest} render={() => {
        return localStorage.getItem('LOGIN_INFO')
          ? children
          : <Redirect to='/' />
      }} />
    )
  }
export default PrivateRoute;