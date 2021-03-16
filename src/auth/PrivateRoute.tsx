import { Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from 'auth/AuthProvider'
import SignIn from 'auth/SignIn'

const PrivateRoute = ({ component, ...rest }) => {
  // AuthCotext から currentUser を受け取る
  const { currentUser } = useContext(AuthContext)

  //currentUser が存在すれば Home 画面へ、存在しなければ Login 画面へ遷移する。
  const Component = currentUser ? component : SignIn

  return <Route {...rest} component={Component} />
}

export default PrivateRoute
