import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

/**
 * Material-UI のチャート上に表示させるタイトルを作成。
 * 内容としては、<Title>タグ内に入ってきたタイトル名を加工して表示させるもの。
 * @param props
 * @returns
 */
export default function Title(props: any) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}
