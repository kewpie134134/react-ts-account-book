import { ItemsType } from 'pages/Home'

type ExpenseItemProps = {
  deleteExpense: (docId: string) => void
  expenseItem: ItemsType
  expenseText: string
  expenseAmount: number
  incomeTotal: any
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
}: ExpenseItemProps) => {
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
      <li>
        <div>{expenseText}</div>
        <div>-{Number(expenseAmount).toLocaleString()}円</div>
        <span>{percentage()}</span>
        <button onClick={deleteHandler}>×</button>
      </li>
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
