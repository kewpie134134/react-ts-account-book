import React, { useState } from 'react'
import ReactModal from 'react-modal'

type ItemDetailType = {
  isOpen: boolean
  onClose?: () => void
}

export const ItemDetail = ({ isOpen, onClose }: ItemDetailType) => {
  // useState を使用するための宣言
  const [userName, setUserName] = useState<string>('')

  // ReactModal を使用するための宣言
  // TODO: ★ 具体的に #root 要素などを指定したほうが良いのか？
  ReactModal.setAppElement('body')

  // submit ボタンを押したときにダイアログとを閉じる
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleClose()
  }
  // 仮の関数（フォームのユーザー名を変更する関数）
  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
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
          <label>
            ユーザー名
            <input
              type="text"
              autoFocus
              value={userName}
              onChange={handleChangeUserName}
            ></input>
          </label>
        </form>
      </ReactModal>
    </>
  )
}
