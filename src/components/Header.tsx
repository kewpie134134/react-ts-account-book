import { auth } from '../firebase/Firebase'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

/**
 * Header.tsx では現在の月を表示させるため、year と month を作成し、
 * 隣に前月と次月ボタンを表示させる。
 */

// TODO: ★ CSS を精査したい
const SignOutButton = styled(Button)({
  background: '#C1C1C1',
  fontSize: '1.0rem',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 30,
  padding: '0 10px',
  margin: '0 0 0 auto',
  display: 'block',
  '&:hover': {
    backgroundColor: '#B4B4B4',
  },
})

type HeaderType = {
  date: Date
  setPrevMonth: () => void
  setNextMonth: () => void
}

// Home.tsx からの props を受け取り、Header.tsx 側で使用する。
export const Header = ({ date, setPrevMonth, setNextMonth }: HeaderType) => {
  // Home.tsx 側から与えられた今日の日付（date）から、
  // Header.tsx で表示させるカレンダーの今日の日付を準備する。
  const today = date
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // 画面表示させるために、値を調整

  return (
    <div className="head">
      <SignOutButton onClick={() => auth.signOut()}>Sign Out</SignOutButton>
      <div>
        <button onClick={() => setPrevMonth()}>←前月 </button>
        <h1>
          {year}年{month}月
        </h1>
        <button onClick={() => setNextMonth()}> 次月→</button>
      </div>
    </div>
  )
}
