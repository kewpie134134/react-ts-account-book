import { useContext } from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from './AuthProvider'
import 'firebase/auth'
import { Footer } from 'components/Footer'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Checkbox, TextField } from '@material-ui/core'

// Material-UI を用いるための宣言
const useStyles = makeStyles((theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

/**
 * ユーザーログイン画面の表示、ログイン内容を取得する
 * handleSubmit が実行されるとき、入力された email と password の内容を、
 * AuthProvider で作った login 関数の引数に渡してデータが登録される。
 * アップデート後の history(情報)を渡すために、export で withRouter(Login) を使っている。
 */
const SignIn = ({ history }: { history: object }) => {
  // SignIn コンポーネントでは history という情報を props として受け取る
  // AuthContext から signin 関数を受け取る
  const { signin } = useContext(AuthContext)
  // MAterial-UI を適用するための宣言
  const classes = useStyles()

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                パスワードを忘れた場合はこちら
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={8}>
          <Footer />
        </Box>
      </div>
    </Container>
  )
}

// history(情報)を渡すために、export で withRouter(Signup) を使う
export default withRouter(SignIn)
