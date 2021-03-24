import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from '@material-ui/core'
import Title from './Title'

// 仮の商品詳細データオブジェクトを作成する関数
const createData = (
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) => {
  return { id, date, name, shipTo, paymentMethod, amount }
}

// 仮のデータを作成
const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Tom Scholz',
    'Boston, MA',
    'MC ⠀•••• 1253',
    100.81,
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
]

// 商品情報の詳細を把握するためのリンクに貼るものだが、
// 現状は未作成のため、画面遷移しないための関数を仮実装。
const preventDefault = (event: any) => {
  event.preventDefault()
}

// Material-UI を当てるための宣言
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

const ItemsDetail = () => {
  const classes = useStyles()
  return (
    <>
      <Title>商品の詳細</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          商品の詳細を表示する
        </Link>
      </div>
    </>
  )
}

export default ItemsDetail
