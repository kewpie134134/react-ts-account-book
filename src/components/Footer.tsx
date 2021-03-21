import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'

// コピーライトを作成
export const Footer: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © `}
      <Link color="inherit" href="https://react-ts-account-book.web.app/">
        家計簿アプリ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
