import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/Firebase'

// createContext() でエラーを回避するためにインターフェースを作成
// TODO: ★ interface で定義するメンバー情報を精査したい
interface ContextProps {
  currentUser: object | null
  // TODO: ★ signin の型定義を精査したい
  signin: any
}

// React.createContext() では初期値が空のためエラーが返却されるので、
// 以下のようにして型定義をしてエラーを回避。
const AuthContext = React.createContext<Partial<ContextProps>>({})

const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<object | null>(null)

  // サインイン処理
  // TODO: ★ history の型を精査したい
  const signin = async (
    email: string,
    password: string,
    history: any,
  ): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      auth.onAuthStateChanged((user) => setCurrentUser(user))
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  // 初回アクセス時に認証済みかをチェックする
  // setCurrentUser で一度ユーザーがセットされたか確認する
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ signin, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
