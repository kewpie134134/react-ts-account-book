import { ItemsType } from 'pages/Home'

/**
 * TotalCalucuration.ts で関数 totalCalcExpense() を作成し、Home.tsx に渡す。
 * このコンポーネントを使用する他のコンポーネントは、計算に必要な Balance.tsx。
 */

export const totalCalcExpense = (expenseItems: ItemsType[]) => {
  // expenseAmounts に expenseItems の中の amount だけを取り出して、
  // amount だけの配列を作成する。
  // その後、expenseAmounts を使用して累積を計算する。
  // ※ expenseItems のトータルに関しては、他のコンポーネントでも使用するため、事前にこちらで準備する。
  const expenseAmounts = expenseItems.map((expenseItem) => expenseItem.amount)

  // reduce の第一引数(arr)は、前までに蓄積された値で、第二引数(cur)は現在の値が入る。
  // この場合、「合計」を出したいので、蓄積の値(arr)と現在の値(crr)を足して一つの要素として返している。
  // 【reduce 関数の書き方】
  // 処理したい配列.reduce((accumulate, current) => (条件), 初期値)
  // 今回は第二引数までを使用し、0 を初期値として渡している。
  return expenseAmounts.reduce((acc, cur) => (acc += cur), 0)
}
