import { Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from 'auth/AuthProvider'
import SignIn from 'auth/SignIn'

// 型定義をしないと App.tsx 側でエラーとなるので、定義
interface privateContextProps {
  exact: true
  path: string
  component: React.FC<{}>
}

const PrivateRoute = ({ component, ...rest }: privateContextProps) => {
  // AuthCotext から currentUser を受け取る
  const { currentUser } = useContext(AuthContext)

  //currentUser が存在すれば Home 画面へ、存在しなければ Login 画面へ遷移する。
  const Component = currentUser ? component : SignIn

  return <Route {...rest} component={Component} />
}

export default PrivateRoute
