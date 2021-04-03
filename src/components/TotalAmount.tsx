import Title from 'components/Title'
/**
 * 収入と支出の各合計を計算する。
 * 値の計算はそれぞれの incomeItems と expenseItems の配列から、
 * amount を取り出して計算する。
 */

type TotalAmountType = {
  incomeTotal: number
  expenseTotal: number
}

export const TotalAmount = ({ incomeTotal, expenseTotal }: TotalAmountType) => {
  const percentage = () => {
    if (incomeTotal > 0) {
      return `${Math.round((expenseTotal / incomeTotal) * 100)}%`
    } else {
      return '---'
    }
  }

  return (
    <div>
      <div>
        <Title>収入</Title>
        <div>
          <p>
            + {Number(incomeTotal).toLocaleString()}
            <span> 円</span>
          </p>
        </div>
      </div>
      <div>
        <Title>支出</Title>
        <div>
          <p>
            - {Number(expenseTotal).toLocaleString()}
            <span> 円</span>
          </p>
          <div>{percentage()}</div>
        </div>
      </div>
    </div>
  )
}
