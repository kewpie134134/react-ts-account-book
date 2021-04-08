import { useState } from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { ItemsType } from 'pages/Home'
import { ConfirmDeleteItem } from 'components/ConfirmDeleteItem'
import { ItemDetail } from './ItemDetail'

type ExpenseItemType = {
  deleteExpense: (docId: string) => void
  expenseItem: ItemsType
  expenseItems: Array<ItemsType>
  expenseText: string
  expenseAmount: number
  setExpenseItems: any
  categories: Array<string>
}

export const ExpenseItem = ({
  deleteExpense,
  expenseItem,
  expenseItems,
  expenseText,
  expenseAmount,
  setExpenseItems,
  categories,
}: ExpenseItemType) => {
  // React-Modal でモーダルを使用するための useState()。
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)

  // 削除ダイアログを開く
  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true)
  }
  // 削除ダイアログからのコールバックでダイアログを閉じる
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
  }

  // 編集ダイアログを開く
  const openEditDialog = () => {
    setIsEditDialogOpen(true)
  }
  // 編集ダイアログからのコールバックでダイアログを閉じる
  const closeEditDialog = () => {
    setIsEditDialogOpen(false)
  }

  const arrayTagsToString = (expenseItemTags: Array<string>) => {
    if (expenseItemTags) {
      return expenseItemTags.join(',')
    } else {
      return '-'
    }
  }

  return (
    // TODO: ★ <Table key={---.id}> <- この id を設定するかが課題
    <TableRow>
      <TableCell>{expenseText}</TableCell>
      <TableCell align="right">
        <div>{Number(expenseAmount).toLocaleString()}円</div>
      </TableCell>
      <TableCell align="right">{arrayTagsToString(expenseItem.tag)}</TableCell>
      <TableCell align="right">
        <button onClick={openDeleteDialog}>X</button>
        <ConfirmDeleteItem
          isOpen={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          expenseItem={expenseItem}
          deleteExpense={deleteExpense}
        />
      </TableCell>
      {/* パーセンテージ表示は不要のため、コメントアウト */}
      {/* <TableCell align="right">{percentage()}</TableCell> */}
      {/* 編集用ダイアログを表示する。 */}
      <TableCell align="right">
        <button onClick={openEditDialog}>✎</button>
        <ItemDetail
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          expenseItem={expenseItem}
          expenseItems={expenseItems}
          setExpenseItems={setExpenseItems}
          categories={categories}
          key={expenseItem.docId}
        />
      </TableCell>
    </TableRow>
  )
}
