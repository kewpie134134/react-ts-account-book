import ReactModal from 'react-modal'
import { ItemsType } from 'pages/Home'

type ConfirmDeleteItemType = {
  isOpen: boolean
  onClose?: () => void
  expenseItem: ItemsType
  deleteExpense: (docId: string) => void
}

export const ConfirmDeleteItem = ({
  isOpen,
  onClose,
  expenseItem,
  deleteExpense,
}: ConfirmDeleteItemType) => {
  // ReactModal を使用するための宣言
  // TODO: ★ 具体的に #root 要素などを指定したほうが良いのか？
  ReactModal.setAppElement('body')

  // submit ボタンを押したときにダイアログとを閉じる
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleClose()
  }

  // ダイアログが開いたときに呼び出される
  const handleOpen = () => {
    // ここに設定場などを読み込む処理を記述する
    // -> 具体的には、選択した項目の内容を読み取るとかか。
  }

  // ダイアログが閉じたときに呼び出される
  // -> ダイアログ領域外のクリックや、ESC キーを押したときがトリガーとなる
  const handleClose = () => {
    // ここで、モーダル上で設定した情報を保存する処理を記述する。
    // -> 具体的には、モーダル上で入力したデータをFirebase上に保存するとかか。
    // 親コンポーネントにダイアログを閉じてもらうためのコールバック通知を設定
    onClose?.()
  }

  // 支出アイテムの削除用ハンドラー
  const deleteHandler = () => {
    deleteExpense(expenseItem.docId)
  }

  // スタイルのカスタマイズを記述
  const customStyles: ReactModal.Styles = {
    // ダイアログ内のスタイル（中央に表示）
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    // 親ウィンドウのスタイ（ちょっと暗くする）
    overlay: {
      background: 'rgba(0,0,0,0.2)',
    },
  }

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={handleOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Settings"
      >
        <form onSubmit={handleSubmit}>
          削除しますか？
          <div>{expenseItem.text}</div>
          <button onClick={deleteHandler}>はい</button>
          <button>いいえ</button>
        </form>
      </ReactModal>
    </>
  )
}
