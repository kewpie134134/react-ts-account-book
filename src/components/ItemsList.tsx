import { ItemsType } from 'pages/Home'
import { IncomeItem } from 'components/IncomeItem'
import { ExpenseItem } from 'components/ExpenseItem'

/**
 * リストの表示は ItemsList.tsx で作成する。
 * items に対して map を行い、IncomeItem と ExpenseItem をそれぞれ表示する。
 */

type ItemsListProps = {
  deleteIncome: (docId: string) => void
  deleteExpense: (docId: string) => void
  incomeItems: Array<ItemsType>
  expenseItems: Array<ItemsType>
  incomeTotal: number
  selectedMonth: number
  thisMonth: number
}

export const ItemsList = ({
  deleteIncome,
  deleteExpense,
  incomeItems,
  expenseItems,
  incomeTotal,
  selectedMonth,
  thisMonth,
}: ItemsListProps) => {
  return (
    <div>
      <div>
        <h3>収入一覧</h3>
        <ul>
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
        </ul>
      </div>
      <div>
        <h3>支出一覧</h3>
        <ul>
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
        </ul>
      </div>
    </div>
  )
}
