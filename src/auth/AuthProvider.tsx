import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/Firebase'
import * as H from 'history'

/**
 * 認証の情報（ユーザーがログイン、サインアップする）を作成する。
 * ユーザー情報が必要なコンポーネントで useContext を使う。
 * contextを使うことで、コンポーネントツリーに簡単にデータを共有することができる。
 */

// createContext() でエラーを回避するためにインターフェースを作成
interface ContextProps {
  currentUser: object | null
  // TODO: ★ signin の型定義を精査したい（難問のため、将来検討とする）
  signin: any
}

// Context の作成
// React.createContext() では初期値が空のためエラーが返却されるので、
// 以下のようにして型定義をしてエラーを回避。
const AuthContext = React.createContext<Partial<ContextProps>>({})

// useContext を使用して、chilren (各ページ)で使用できるようにする
const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<object | null>(null)

  // サインイン処理
  const signin = async (
    email: string,
    password: string,
    history: H.History,
  ): Promise<void> => {
    try {
      // firebase の認証でサインインする
      await auth.signInWithEmailAndPassword(email, password)
      // サインインに成功したユーザー情報を取得し、setCurrentUserで
      // currentUser にセットする
      auth.onAuthStateChanged((user) => setCurrentUser(user))
      // ページ遷移を行う
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  // 初回アクセス時に認証済みかをチェックする
  // setCurrentUser で一度ユーザーがセットされたか確認する
  useEffect(() => {
    // useEffect では関数の実行タイミングをReactのレンダリング後まで遅らせるhook
    // そのため、一度画面がちらつく。。。
    // TODO: ★ この画面のちらつきを修正したい
    // 1 回だけ実行したいので、第二引数は空の配列を渡す
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ signin, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
