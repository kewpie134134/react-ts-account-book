import { useState } from 'react'
import ReactModal from 'react-modal'
import { ItemsType } from 'pages/Home'

type EditItemType = {
  isOpen: boolean
  onClose?: () => void
  expenseItem: ItemsType
  editExpense: (text: string, amount: number, docId: string) => void
}

export const EditItem = ({
  isOpen,
  onClose,
  expenseItem,
  editExpense,
}: EditItemType) => {
  const [editText, setEditText] = useState<string>(expenseItem.text)
  const [editAmount, setEditAmount] = useState<number>(expenseItem.amount)

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

  // 支出アイテムの編集用ハンドラー
  const editHandler = () => {
    // デフォルトのイベント（動作）を一時的にここで止め、以降の処理を行う。
    // -> 正常に行われれば、Firetore のデータが追加され、react アプリのステートも更新される。
    // event.preventDefault()
    if (
      editText === '' ||
      editAmount === 0 ||
      !(editAmount > 0 && editAmount <= 99999999)
    ) {
      // 正しい内容が入力されていない場合、エラーを表示する
      alert('正しい内容を入力してください')
    } else {
      editExpense(editText, editAmount, expenseItem.docId)
    }
  }

  // 家計簿の内容が編集されたら呼ばれるハンドラー
  const editTextHandler = (event: { target: HTMLInputElement }) => {
    setEditText(event.target.value)
  }

  // 商品の金額内容が編集されたら呼ばれるハンドラー
  const editAmountHandler = (event: { target: HTMLInputElement }) => {
    // amount(金額) はあとで計算処理を行うため、parseInt で値を数値化する
    if (event.target.value) {
      // amount に数値（文字列）がある場合
      setEditAmount(parseInt(event.target.value))
    } else {
      // amount が空の場合
      // TODO: ★ 値が NaN になるため、Warning が表示される。
      // -> string に型変換するなどの修正をしたい。
      setEditAmount(parseInt(event.target.value))
    }
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
          <label>
            以下の内容で修正しますか？
            <div>
              <label>内容</label>
              <input
                type="text"
                defaultValue={expenseItem.text}
                onChange={editTextHandler}
              ></input>
            </div>
            <div>
              <label>金額</label>
              <input
                type="number"
                defaultValue={expenseItem.amount}
                onChange={editAmountHandler}
              ></input>
            </div>
            <button type="submit" onClick={editHandler}>
              はい
            </button>
            <button>いいえ</button>
          </label>
        </form>
      </ReactModal>
    </>
  )
}
