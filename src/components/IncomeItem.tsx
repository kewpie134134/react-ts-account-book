import { TableRow, TableCell } from '@material-ui/core'
import { ItemsType } from 'pages/Home'

type IncomeItemType = {
  deleteIncome: (docId: string) => void
  incomeItem: ItemsType
  incomeText: string
  incomeAmount: number
  thisMonth: number
  selectedMonth: number
}

/**
 * ItemsList.tsx 上で使用された map でつくられた一つ一つの項目を表示させるコンポーネント。
 */
export const IncomeItem = ({
  deleteIncome,
  incomeItem,
  incomeText,
  incomeAmount,
  thisMonth,
  selectedMonth,
}: IncomeItemType) => {
  // incomeItem.docId を渡せば Home.tsx 上で docId に該当するアイテムが削除される
  const deleteHandler = () => {
    deleteIncome(incomeItem.docId)
  }

  // 今月のリストを表示させ、削除ボタンを表示させるコンポーネント
  const showThisMonth = () => {
    return (
      // TODO: ★ <Table key={---.id}> <- この id を設定するかが課題
      <TableRow>
        <TableCell>{incomeText}</TableCell>
        <TableCell align="right">
          {/* Number(incomeAmount).toLocaleString はカンマ「,」を表示させるために使用する */}
          <div>+{Number(incomeAmount).toLocaleString()}円</div>
        </TableCell>
        <TableCell align="right">
          {/* deleteHandler は "×"を押したときに deleteIncome を実行する */}
          {/* deleteIncome は Firestore の docId の関係上、Home.tsx で定義したものを使用する */}
          <button onClick={deleteHandler}>×</button>
        </TableCell>
      </TableRow>
    )
  }

  // 今月以外のリストを表示させ、削除ボタンは表示させない
  const showPastMonth = () => {
    return (
      <li>
        <div>{incomeText}</div>
        <div>+{Number(incomeAmount).toLocaleString()}円</div>
      </li>
    )
  }

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>
}
