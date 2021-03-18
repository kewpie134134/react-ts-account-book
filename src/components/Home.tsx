import { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/Firebase'
import firebase from 'firebase/app'
import { AuthContext } from 'auth/AuthProvider'

// 配列の型を定義する型定義
type ItemsType = {
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
  const [expenseItems, setExpenseItems] = useState([])
  const [type, setType] = useState('inc')
  const [date, setDate] = useState(new Date())

  // コンパイルエラーのため、一時的にconsole.log で表示させる
  console.log(typeof inputText)
  console.log(typeof setInputText)
  console.log(typeof inputAmount)
  console.log(typeof setInputAmount)
  console.log(typeof incomeItems)
  console.log(typeof expenseItems)
  console.log(typeof setExpenseItems)
  console.log(typeof setType)
  console.log(typeof type)
  console.log(typeof setDate)

  // AuthContext でログイン（サインイン）したユーザー情報を
  // useContext で取得する。
  // TODO: ★ 型定義 any を精査したい（難解のため、将来検討）
  const { currentUser }: any = useContext(AuthContext)

  // 収入・出費データを取得するタイミングは useEffect を使用する。
  // "date" が更新されるたび実行してほしいため、useEffect を使用する。
  useEffect(() => {
    getIncomeData()
    // date の値を確認してデータを取得するため、date は必要。
    // TODO：ここで date が本当に必要か確認    // date の値を確認してデータを取得するため、date は必要。
    // TODO：ここで date が本当に必要か確認
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  // 月の最初の日付を取得する
  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  // 月の最後の日付を取得する
  const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

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

  // // Firestore に収入データを追加する
  // // 収入 income 用の関数 addIncome を用意する。
  // // 引数にはユーザーが入力した text と amount を渡す。
  // const addIncome = (text: string, amount: number) => {
  //   // docId をこちら側で、ランダム文字列を使用して作成する。
  //   // docId はユーザーが削除ボタン選択時、データを削除するときの値として使用。
  //   // （react 側で連動させたいので、フロント側で手動で作成する。）
  //   // （上記の時、数値だとエラーになるため、文字列を使用している。）
  //   // ※ 手動で作成しない場合は、".set" や ".add" で自動生成可能。
  //   const docId = Math.random().toString(32).substring(2)
  //   // 収入リストが順番に並べられるようにタイムスタンプを作成
  //   // -> 入力時間が登録される firebase の関数。
  //   const date = firebase.firestore.Timestamp.now()
  //   // どこの collection の document に追加するかは、firebase の関数で定義。
  //   db.collection('incomeItems')
  //     .doc(docId)
  //     .set({
  //       // セットしたいデータを配列として追加する
  //       uid: currentUser.uid,
  //       text,
  //       amount,
  //       date,
  //     })
  //     // セットした値を react 側の incomeItems に更新する
  //     .then(() => {
  //       setIncomeItems([
  //         ...incomeItems,
  //         { text: inputText, amount: inputAmount, docId: docId, date: date },
  //       ])
  //     })
  // }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
