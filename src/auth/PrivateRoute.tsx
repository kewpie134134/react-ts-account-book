import { Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from 'auth/AuthProvider'
import SignIn from 'auth/SignIn'

/**
 * 認証を許可されたユーザーのみがアクセスできる Private Route を作成する
 * AuthContext から渡された currentUser がセットされていればアクセスを許可し、
 * セットされていない (null) の場合は Login ページに移動する
 */

// 型定義をしないと App.tsx 側でエラーとなるので、定義
type privateRouteType = {
  exact: true
  path: string
  component: React.FC<{}>
}

// exact, path の情報を ...rest を経由して受けとる
const PrivateRoute = ({ component, ...rest }: privateRouteType) => {
  // AuthCotext から currentUser を受け取る
  const { currentUser } = useContext(AuthContext)

  //currentUser が存在すれば Home 画面へ、存在しなければ Login 画面へ遷移する。
  const Component = currentUser ? component : SignIn

  return <Route {...rest} component={Component} />
}

export default PrivateRoute
