import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from '@material-ui/core'
import { ExpenseItem } from 'components/ExpenseItem'
import { ItemsType } from 'pages/Home'
import Title from './Title'

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
  editExpense: (text: string, amount: number, docId: string) => void
  incomeItems: Array<ItemsType>
  expenseItems: Array<ItemsType>
  incomeTotal: number
  selectedMonth: number
  thisMonth: number
}

const ItemsDetail = ({
  deleteExpense,
  editExpense,
  expenseItems,
  incomeTotal,
  selectedMonth,
  thisMonth,
}: ItemsDetailType) => {
  const classes = useStyles()
  return (
    <>
      <Title>商品の詳細（支出一覧）</Title>
      <Table size="small">
        <TableHead>
          {/* テーブルのタイトル表示部分 */}
          <TableRow>
            <TableCell>内容</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">タグ</TableCell>
            <TableCell align="right">削除</TableCell>
            <TableCell align="right">編集</TableCell>
            {/* <TableCell align="right">割合</TableCell> */}
          </TableRow>
        </TableHead>
        {/* テーブルのメイン部分 */}
        <TableBody>
          {expenseItems.map((expenseItem: ItemsType) => (
            <ExpenseItem
              deleteExpense={deleteExpense}
              editExpense={editExpense}
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
