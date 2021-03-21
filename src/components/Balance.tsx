type BalanceType = {
  incomeTotal: number
  expenseTotal: number
}

export const Balance = ({ incomeTotal, expenseTotal }: BalanceType) => {
  // 残高計算
  const balance = incomeTotal - expenseTotal

  return (
    <div>
      <h2>残高</h2>
      <div>
        {Number(balance).toLocaleString()}
        <span> 円</span>
      </div>
    </div>
  )
}
