import { TableCell, TableRow } from '@material-ui/core'
import { ItemsType } from 'pages/Home'

type ExpenseItemType = {
  deleteExpense: (docId: string) => void
  expenseItem: ItemsType
  expenseText: string
  expenseAmount: number
  incomeTotal: number
  thisMonth: number
  selectedMonth: number
}

export const ExpenseItem = ({
  deleteExpense,
  expenseItem,
  expenseText,
  expenseAmount,
  incomeTotal,
  thisMonth,
  selectedMonth,
}: ExpenseItemType) => {
  const deleteHandler = () => {
    deleteExpense(expenseItem.docId)
  }

  const percentage = () => {
    if (incomeTotal > 0) {
      return `${Math.round((expenseAmount / incomeTotal) * 100)} %`
    } else {
      return '---'
    }
  }

  const showThisMonth = () => {
    return (
      // TODO: ★ <Table key={---.id}> <- この id を設定するかが課題
      <TableRow>
        <TableCell>{expenseText}</TableCell>
        <TableCell align="right">
          <div>-{Number(expenseAmount).toLocaleString()}円</div>
        </TableCell>
        <TableCell align="right">
          <button onClick={deleteHandler}>×</button>
        </TableCell>
        <TableCell align="right">{percentage()}</TableCell>
      </TableRow>
    )
  }

  const showPastMonth = () => {
    return (
      <li>
        <div>{expenseText}</div>
        <div>-{Number(expenseAmount).toLocaleString()}円</div>
        <span>{percentage()}</span>
      </li>
    )
  }
  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>
}
