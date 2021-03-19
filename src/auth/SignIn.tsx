import { useContext } from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from './AuthProvider'
import 'firebase/auth'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// TODO: ★ CSS を表記する
const SignInButton = styled(Button)({
  background: '#6fc4f9',
  fontSize: '1.8rem',
  border: 0,
  borderRadius: 3,
  color: 'white',
  padding: '10px 40px',
  marginTop: '30px',
  '&:hover': {
    backgroundColor: '#57baf8',
  },
})

/**
 * ユーザーログイン画面の表示、ログイン内容を取得する
 * handleSubmit が実行されるとき、入力された email と password の内容を、
 * AuthProvider で作った login 関数の引数に渡してデータが登録される。
 * アップデート後の history(情報)を渡すために、export で withRouter(Login) を使っている。
 */

// SignIn コンポーネントでは history という情報を props として受け取る
const SignIn = ({ history }: { history: object }) => {
  // AuthContext から signin 関数を受け取る
  const { signin } = useContext(AuthContext)

  // handleSubmit が実行されるときに、email と password の内容を
  // AuthProvider で作成した signin 関数の引数に渡して、firebase 側にデータを登録する
  // アップデート後の情報（history）を渡すために、export 時には withRouter(SignIn) として
  // 渡している（こうすることで、handleSubmit 時にページ遷移を伴うことができる）。
  // TODO: ★ 型定義を直したい
  const handleSubmit = (event: any) => {
    // デフォルトの動作をここで一時停止させる(フォーム確認などを停止させる)
    event.preventDefault()
    // email と password をエレメントから取得する
    const { email, password } = event.target.elements
    // AuthProvider の signin 関数に引数を渡す
    signin(email.value, password.value, history)
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail Address</label>
          <input name="email" type="email" placeholder="email@gmail.com" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" />
        </div>
        <SignInButton type="submit">SIGN IN!</SignInButton>
      </form>
    </div>
  )
}

// history(情報)を渡すために、export で withRouter(Signup) を使う
export default withRouter(SignIn)
