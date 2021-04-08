import { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { db } from '../firebase/Firebase'
import ReactModal from 'react-modal'
import { AuthContext } from 'auth/AuthProvider'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

type ItemDetailType = {
  isOpen: boolean
  onClose?: () => void
  expenseItems: any
  setExpenseItems: any
  categories: Array<string>
}

export const ItemDetail = ({
  isOpen,
  onClose,
  expenseItems,
  setExpenseItems,
  categories,
}: ItemDetailType) => {
  const [inputText, setInputText] = useState<string>('')
  const [inputAmount, setInputAmount] = useState<number>(0)
  const [category, setCategory] = useState('')

  // 現在のユーザー情報を取得する。
  const { currentUser }: any = useContext(AuthContext)

  // ReactModal を使用するための宣言
  // TODO: ★ 具体的に #root 要素などを指定したほうが良いのか？
  ReactModal.setAppElement('body')

  // FireStore 支出データを追加する。
  // 支出用の関数 addExpense を用意する。
  // 引数にはユーザーが入力した text とamount を渡す。
  const addExpense = (text: string, amount: number) => {
    // docId をこちら側で、ランダム文字列を使用して作成する。
    // docId はユーザーが削除ボタン選択時、データを削除するときの値として使用。
    // （react 側で連動させたいので、フロント側で手動で作成する。）
    // （上記の時、数値だとエラーになるため、文字列を使用している。）
    // ※ 手動で作成しない場合は、".set" や ".add" で自動生成可能。
    const docId = Math.random().toString(32).substring(2)
    // 支出リストが順番に並べられるようにタイムスタンプを作成
    // -> 入力時間が登録される firebase の関数。
    const date = firebase.firestore.Timestamp.now()
    const tag = ['TAG1', 'TAG2']
    // どこの collection の document に追加するかは、firebase の関数で定義。
    db.collection('expenseItems')
      .doc(docId)
      .set({
        // セットしたいデータを配列として追加する
        uid: currentUser.uid,
        text,
        amount,
        date,
        tag,
      })
      // セットした値を react 側の expenseItems に更新する
      .then(() => {
        setExpenseItems([
          ...expenseItems,
          {
            text: inputText,
            amount: inputAmount,
            docId: docId,
            date: date,
            uid: currentUser.uid,
            tag: tag,
          },
        ])
      })
  }

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
  const submitItemHandler = () => {
    // デフォルトのイベント（動作）を一時的にここで止め、以降の処理を行う。
    // -> 正常に行われれば、Firetore のデータが追加され、react アプリのステートも更新される。
    // event.preventDefault()
    if (
      inputText === '' ||
      inputAmount === 0 ||
      !(inputAmount > 0 && inputAmount <= 99999999)
    ) {
      // 正しい内容が入力されていない場合、エラーを表示する
      alert('正しい内容を入力してください')
    } else {
      addExpense(inputText, inputAmount)
      // 値を渡したら、入力フォーム内容はリセットする
      reset()
    }
  }

  // 家計簿の内容が編集されたら呼ばれるハンドラー
  const inputTextHandler = (event: { target: HTMLInputElement }) => {
    setInputText(event.target.value)
  }

  // 商品の金額内容が編集されたら呼ばれるハンドラー
  const inputAmountHandler = (event: { target: HTMLInputElement }) => {
    // amount(金額) はあとで計算処理を行うため、parseInt で値を数値化する
    if (event.target.value) {
      // amount に数値（文字列）がある場合
      setInputAmount(parseInt(event.target.value))
    } else {
      // amount が空の場合
      // TODO: ★ 値が NaN になるため、Warning が表示される。
      // -> string に型変換するなどの修正をしたい。
      setInputAmount(parseInt(event.target.value))
    }
  }

  // 入力フォームのリセット処理
  const reset = () => {
    setInputText('')
    setInputAmount(0)
  }

  // カテゴリ用セレクトボックスが選択された時のハンドラー
  const categoryHandler = (event: { target: HTMLSelectElement }) => {
    setCategory(event.target.value)
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
          <label>商品名と金額を入力してください。</label>
          {/* text の値と amount の値は onChange で取得する */}
          <div>
            <label>内容</label>
            <input type="text" value={inputText} onChange={inputTextHandler} />
          </div>
          <div>
            <label>金額</label>
            <input
              type="number"
              value={inputAmount}
              onChange={inputAmountHandler}
            />
            <span>円</span>
          </div>
          <div>
            <label>カテゴリ</label>
            <select value={category} onChange={categoryHandler}>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <AddButton type="submit" onClick={submitItemHandler}>
              追加
            </AddButton>
          </div>
        </form>
      </ReactModal>
    </>
  )
}

// TODO: ★ CSS を精査したい
const AddButton = styled(Button)({
  background: '#87CEEB',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  width: '250px',
  textAlign: 'center',
  fontSize: '1.8rem',
  margin: '10px 0 20px 0',
  '&:hover': {
    backgroundColor: '#3fb8e7',
  },
})
