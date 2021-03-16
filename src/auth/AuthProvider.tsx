import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/Firebase'

// createContext() でエラーを回避するためにインターフェースを作成
// TODO: ★ interface で定義するメンバー情報を精査したい
interface ContextProps {
  // TODO: ★ currentUser の型定義を精査したい
  currentUser: any
  // TODO: ★ signin の型定義を精査したい
  signin: any
}

// React.createContext() では初期値が空のためエラーが返却されるので、
// 以下のようにして型定義をしてエラーを回避。
const AuthContext = React.createContext<Partial<ContextProps>>({})

const AuthProvider: React.FC = ({ children }): JSX.Element => {
  // TODO: ★ useState に入ってくる値の型を確認する必要がある(any を直したい)
  const [currentUser, setCurrentUser] = useState<any>(null)

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
  // TODO: ★ setCurrentUser が何をしているのか確認する
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
