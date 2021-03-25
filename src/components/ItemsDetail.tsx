import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from '@material-ui/core'
import { IncomeItem } from 'components/IncomeItem'
import { ExpenseItem } from 'components/ExpenseItem'
import { ItemsType } from 'pages/Home'
import Title from './Title'

// // 仮の商品詳細データオブジェクトを作成する関数
// const createData = (
//   id: number,
//   date: string,
//   name: string,
//   shipTo: string,
//   paymentMethod: string,
//   amount: number,
// ) => {
//   return { id, date, name, shipTo, paymentMethod, amount }
// }

// // 仮のデータを作成
// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(
//     2,
//     '16 Mar, 2019',
//     'Tom Scholz',
//     'Boston, MA',
//     'MC ⠀•••• 1253',
//     100.81,
//   ),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ]

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

type ItemsDetailType = {
  deleteIncome: (docId: string) => void
  deleteExpense: (docId: string) => void
  incomeItems: Array<ItemsType>
  expenseItems: Array<ItemsType>
  incomeTotal: number
  selectedMonth: number
  thisMonth: number
}

const ItemsDetail = ({
  deleteIncome,
  deleteExpense,
  incomeItems,
  expenseItems,
  incomeTotal,
  selectedMonth,
  thisMonth,
}: ItemsDetailType) => {
  const classes = useStyles()
  return (
    <>
      <Title>収入一覧</Title>
      <Table size="small">
        <TableHead>
          {/* テーブルのタイトル表示部分 */}
          <TableRow>
            <TableCell>内容</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">削除</TableCell>
          </TableRow>
        </TableHead>
        {/* テーブルのメイン部分 */}
        <TableBody>
          {incomeItems.map((incomeItem: ItemsType) => (
            <IncomeItem
              deleteIncome={deleteIncome}
              incomeText={incomeItem.text}
              incomeAmount={incomeItem.amount}
              incomeItem={incomeItem}
              key={incomeItem.docId}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
            />
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          商品の詳細を表示する
        </Link>
      </div>
      <Title>商品の詳細（支出一覧）</Title>
      <Table size="small">
        <TableHead>
          {/* テーブルのタイトル表示部分 */}
          <TableRow>
            <TableCell>内容</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">削除</TableCell>
            <TableCell align="right">割合</TableCell>
          </TableRow>
        </TableHead>
        {/* テーブルのメイン部分 */}
        <TableBody>
          {expenseItems.map((expenseItem: ItemsType) => (
            <ExpenseItem
              deleteExpense={deleteExpense}
              expenseText={expenseItem.text}
              expenseAmount={expenseItem.amount}
              expenseItem={expenseItem}
              key={expenseItem.docId}
              incomeTotal={incomeTotal}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
            />
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
