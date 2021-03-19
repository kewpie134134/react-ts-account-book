import { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/Firebase'
import firebase from 'firebase/app'
import { AuthContext } from 'auth/AuthProvider'
import { Header } from 'components/Header'
import { AddItem } from './AddItems'
import { ItemsList } from './ItemsList'

// 配列の型を定義する型定義
export type ItemsType = {
  text: string
  amount: number
  docId: string
  date: firebase.firestore.Timestamp
  uid: string
}

const Home: React.FC = () => {
  // 親コンポーネント（Home.js）から子コンポーネントに渡すステートたち
  const [inputText, setInputText] = useState<string>('')
  const [inputAmount, setInputAmount] = useState<number>(0)
  const [incomeItems, setIncomeItems] = useState<ItemsType[]>([])
  const [expenseItems, setExpenseItems] = useState<ItemsType[]>([])
  const [type, setType] = useState('income')
  const [date, setDate] = useState(new Date())

  // AuthContext でログイン（サインイン）したユーザー情報を
  // useContext で取得する。
  // TODO: ★ 型定義 を精査したい（難解のため、将来検討）
  const { currentUser }: any = useContext(AuthContext)

  // 収入・出費データを取得するタイミングは useEffect を使用する。
  // "date" が更新されるたび実行してほしいため、useEffect を使用する。
  useEffect(() => {
    getIncomeData()
    getExpenseData()
    // date の値を確認してデータを取得するため、date は必要。
    // TODO：ここで date が本当に必要か確認    // date の値を確認してデータを取得するため、date は必要。
    // TODO：ここで date が本当に必要か確認
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  // 月ごとにデータを表示させるために、、ヘッダーに情報を渡すようにする。
  // date はユーザーがヘッダーの「前月」、「次月」を選択すると更新される
  // なお、setPrevMonth と setNextMonth は Header.tsx で使うので、props で渡してあげる必要がある。
  const setPrevMonth = () => {
    const year = date.getFullYear()
    const month = date.getMonth() - 1
    const day = date.getDate()
    setDate(new Date(year, month, day))
  }

  // 次月
  const setNextMonth = () => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    setDate(new Date(year, month, day))
  }

  // 月の最初の日付を取得する
  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  // 月の最後の日付を取得する
  const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  // 指定した月と今月の情報を親コンポーネント（Home.tsx）から渡すため、
  // props で渡すように準備する（リストでも使用する）。
  // なお、値は UI に表示指せるために、値に +1 している。
  const selectedMonth = date.getMonth() + 1
  const today = new Date()
  const thisMonth = today.getMonth() + 1

  // Firestore からデータをとってきてアプリ上で表示させる。
  // 取得したいデータの Income 用の関数 getIncomeData を作成。
  // Firebase からデータを取得し、アプリ上で表示させる
  const getIncomeData = () => {
    // コレクション "incomeItems" のドキュメントを取得し、変数 "incomeData"に代入する
    const incomeData = db.collection('incomeItems')
    // uid が現在のユーザーと一致する場合、startOfMonth~endOfMonthの
    // ドキュメントを取得する
    incomeData
      // whewe 句の書き方はこれが定義されている
      .where('uid', '==', currentUser.uid)
      // orderBy で date を昇順にしている
      // -> リストがばらばらに表示されてしまうことを防ぐため。
      // where 句と orderBy 句を併用する場合、複合 index を作成する.
      .orderBy('date')
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const incomeItems: ItemsType[] = []
        // incomeItems[] に それらの data と id をプッシュする
        query.forEach((doc) => {
          const docData = doc.data()
          incomeItems.push({
            amount: docData.amount,
            text: docData.text,
            uid: docData.uid,
            date: docData.date,
            docId: doc.id,
          })
        })
        // react 側の incomeItems の配列を更新する
        setIncomeItems(incomeItems)
      })
  }

  // Firestore に収入データを追加する
  // 収入 income 用の関数 addIncome を用意する。
  // 引数にはユーザーが入力した text と amount を渡す。
  const addIncome = (text: string, amount: number) => {
    // docId をこちら側で、ランダム文字列を使用して作成する。
    // docId はユーザーが削除ボタン選択時、データを削除するときの値として使用。
    // （react 側で連動させたいので、フロント側で手動で作成する。）
    // （上記の時、数値だとエラーになるため、文字列を使用している。）
    // ※ 手動で作成しない場合は、".set" や ".add" で自動生成可能。
    const docId = Math.random().toString(32).substring(2)
    // 収入リストが順番に並べられるようにタイムスタンプを作成
    // -> 入力時間が登録される firebase の関数。
    const date = firebase.firestore.Timestamp.now()
    // どこの collection の document に追加するかは、firebase の関数で定義。
    db.collection('incomeItems')
      .doc(docId)
      .set({
        // セットしたいデータを配列として追加する
        uid: currentUser.uid,
        text,
        amount,
        date,
      })
      // セットした値を react 側の incomeItems に更新する
      .then(() => {
        setIncomeItems([
          ...incomeItems,
          {
            text: inputText,
            amount: inputAmount,
            docId: docId,
            date: date,
            uid: currentUser.uid,
          },
        ])
      })
  }

  // FireStore 上の incomeItems コレクションで、docId に該当するアイテムを削除する。
  const deleteIncome = (docId: string) => {
    db.collection('incomeItems').doc(docId).delete()
  }

  // Firestore からデータをとってきてアプリ上で表示させる。
  // 取得したいデータの Expense 用の関数 getExpenseData を作成する。
  // 内容は getExpenseDataと同じ
  const getExpenseData = () => {
    const expenseData = db.collection('expenseItems')
    expenseData
      .where('uid', '==', currentUser.uid)
      .orderBy('date')
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const expenseItems: ItemsType[] = []
        query.forEach((doc) => {
          const docData = doc.data()
          expenseItems.push({
            amount: docData.amount,
            text: docData.text,
            uid: docData.uid,
            date: docData.date,
            docId: doc.id,
          })
        })
        setExpenseItems(expenseItems)
      })
  }

  // FireStore に出費データを追加する。
  // 内容は addIncome と同じ。
  const addExpense = (text: string, amount: number) => {
    const docId = Math.random().toString(32).substring(2)
    const date = firebase.firestore.Timestamp.now()
    db.collection('expenseItems')
      .doc(docId)
      .set({
        uid: currentUser.uid,
        text,
        amount,
        date,
      })
      .then(() => {
        setExpenseItems([
          ...expenseItems,
          {
            text: inputText,
            amount: inputAmount,
            docId: docId,
            date: date,
            uid: currentUser.uid,
          },
        ])
      })
  }

  // FireStore 上の expenseItems コレクションにある docId に該当するアイテムを削除する。
  const deleteExpense = (docId: string) => {
    db.collection('expenseItems').doc(docId).delete()
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="top">
        {/* props で date と setPrevMonth、setNextMonth を Header.tsx に渡す */}
        <Header
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
        />
      </div>
      <AddItem
        addIncome={addIncome}
        addExpense={addExpense}
        inputText={inputText}
        setInputText={setInputText}
        inputAmount={inputAmount}
        setInputAmount={setInputAmount}
        type={type}
        setType={setType}
        selectedMonth={selectedMonth}
        thisMonth={thisMonth}
      />
      <ItemsList
        deleteIncome={deleteIncome}
        deleteExpense={deleteExpense}
        // incomeTotal={incomeTotal}
        incomeItems={incomeItems}
        expenseItems={expenseItems}
        selectedMonth={selectedMonth}
        thisMonth={thisMonth}
      />
    </div>
  )
}

export default Home
