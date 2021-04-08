import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link } from '@material-ui/core'
import Title from 'components/Title'

type BalanceType = {
  expenseTotal: number
}

// Material-UI を使用するためにインスタンス作成
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

// 特に何もしないダミー関数
// -> 残高の詳細を確認するボタンの中身を実装していないので、仮実装。
const preventDefault = (event: any) => {
  event.preventDefault()
}

export const Balance = ({ expenseTotal }: BalanceType) => {
  // 残高計算
  const balance = expenseTotal

  // Material-UI をデザインするための宣言
  const classes = useStyles()

  return (
    <>
      <Title>今月の使用金額</Title>
      <Typography component="p" variant="h4">
        {Number(balance).toLocaleString()}
        <span> 円</span>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        今日の日付を表示したい
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          残高の詳細を確認する
        </Link>
      </div>
    </>
  )
}
