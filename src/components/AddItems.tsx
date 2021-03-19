import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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

// AddItem の props 型定義
type AddItemProps = {
  addIncome: (text: string, amount: number) => void
  addExpense: (text: string, amount: number) => void
  inputText: string
  setInputText: (text: string) => void
  inputAmount: number
  setInputAmount: (amount: number) => void
  type: string
  setType: (type: string) => void
  selectedMonth: number
  thisMonth: number
}

/**
 * ユーザーが入力した内容を取得する関数を記述する。
 */
export const AddItem = ({
  addIncome,
  addExpense,
  inputText,
  setInputText,
  inputAmount,
  setInputAmount,
  type,
  setType,
  selectedMonth,
  thisMonth,
}: AddItemProps) => {
  // 収入か出費かの切り替えが行われたら呼ばれるハンドラー
  const typeHandler = (event: any) => {
    setType(event.target.value)
  }

  // 家計簿の内容が編集されたら呼ばれるハンドラー
  const inputTextHandler = (event: any) => {
    setInputText(event.target.value)
  }

  // 商品の金額内容が編集されたら呼ばれるハンドラー
  const inputAmountHandler = (event: any) => {
    // amount(金額) はあとで計算処理を行うため、parseInt で値を数値化する
    if (event.target.value) {
      // amount に数値（文字列）がある場合
      setInputAmount(parseInt(event.target.value))
    } else {
      // amount が空の場合
      setInputAmount(event.target.value)
    }
  }

  // 収入 income、出費 expense のどちらに追加するかは、type で切り分ける。
  // 切り分け後、値を Firebase に登録(addIncome(), addExpense())し、値をリセットする。
  const submitItemHandler = (event: any) => {
    // デフォルトのイベント（動作）を一時的にここで止め、以降の処理を行う。
    // -> 正常に行われれば、Firetore のデータが追加され、react アプリのステートも更新される。
    event.preventDefault()
    if (
      inputText === '' ||
      inputAmount === 0 ||
      !(inputAmount > 0 && inputAmount <= 99999999)
    ) {
      // 正しい内容が入力されていない場合、エラーを表示する
      alert('正しい内容を入力してください')
    } else if (type === 'income') {
      // income タイプなら、Home.tsx で定義した addIncome の引数に、
      // ユーザーの入力内容 inputText と inputAmountを渡す
      addIncome(inputText, inputAmount)
      // 値を渡したら、入力フォーム内容はリセットする
      reset()
    } else if (type === 'expense') {
      // expense タイプなら、Home.tsx で定義した addExpense の引数に、
      // ユーザーの入力内容 inputText と inputAmount を渡す
      addExpense(inputText, inputAmount)
      // 値を渡したら、入力フォーム内容はリセットする
      reset()
    }
  }

  // 入力フォームのリセット処理
  const reset = () => {
    setInputText('')
    setInputAmount(0)
  }

  // 今月の入力フォーム
  const thisMonthForm = () => {
    return (
      <form>
        {/* ユーザーが option を選択したときに、typeHandler 関数で type の値を更新する */}
        <select onChange={typeHandler}>
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
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
          <div>円</div>
        </div>
        <div>
          <AddButton type="submit" onClick={submitItemHandler}>
            追加
          </AddButton>
        </div>
      </form>
    )
  }

  // 他月の入力フォーム = ユーザーに入力させない
  const otherMonthForm = () => {
    return <form></form>
  }

  // ヘッダーが今月か今月出ないかによって、ユーザーに見せる表示フォームを変更する。
  // ※ 今月の入力フォームのみを表示させるのが目的。
  return (
    // ここで使用している selectedMonth と thisMonth は他のコンポーネント（リスト）でも使用するため
    // Home.tsx で作成して props で渡されるようにしている。
    <>{thisMonth === selectedMonth ? thisMonthForm() : otherMonthForm()}</>
  )
}
