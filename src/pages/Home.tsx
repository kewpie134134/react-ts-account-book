import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/Firebase'
import firebase from 'firebase/app'
import { AuthContext } from 'auth/AuthProvider'
import { totalCalcExpense } from 'components/TotalCaluculation'
import { Header } from 'components/Header'
import { Balance } from 'components/Balance'
import { Footer } from 'components/Footer'
import {
  AppBar,
  Badge,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Container from '@material-ui/core/Container'
import ItemsList from 'components/ItemsList'
import { ItemDetail } from 'components/ItemDetail'

// 配列の型を定義する型定義
export type ItemsType = {
  text: string
  amount: number
  docId: string
  date: firebase.firestore.Timestamp
  uid: string
  tag: Array<string>
}

const Home: React.FC = () => {
  // 親コンポーネント（Home.js）から子コンポーネントに渡すステートたち
  const [expenseItems, setExpenseItems] = useState<ItemsType[]>([])
  const [date, setDate] = useState(new Date())

  // React-Modal でモーダルを使用するための useState()。
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  // カテゴリ用の配列
  const [categories, setCategories] = useState<string[]>([
    '食費',
    '趣味',
    '交通費',
    '買い物',
    '交際費',
    '生活費',
    '住宅',
    '通信',
    '車',
    '税金',
  ])

  console.log(typeof setCategories)

  // Material-UI を使用するための宣言
  const classes = useStyles()

  // AuthContext でログイン（サインイン）したユーザー情報を
  // useContext で取得する。
  // TODO: ★ 型定義 を精査したい（難解のため、将来検討）
  const { currentUser }: any = useContext(AuthContext)

  // 収入・出費データを取得するタイミングは useEffect を使用する。
  // "date" が更新されるたび実行してほしいため、useEffect を使用する。
  useEffect(() => {
    getExpenseData()
    // date の値を確認してデータを取得するため、date は必要。
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

  // Firestore からデータをとってきてアプリ上で表示させる。
  // 取得したいデータの Expense 用の関数 getExpenseData を作成する。
  // Firebase からデータを取得し、アプリ上で表示させる
  const getExpenseData = () => {
    // コレクション "expenseItems" のドキュメントを取得し、変数 "expenseData"に代入する
    const expenseData = db.collection('expenseItems')
    // uid が現在のユーザーと一致する場合、startOfMonth~endOfMonthのドキュメントを取得する
    expenseData
      // whewe 句の書き方はこれが定義されている
      .where('uid', '==', currentUser.uid)
      // orderBy で date を昇順にしている
      // -> リストがばらばらに表示されてしまうことを防ぐため。
      // where 句と orderBy 句を併用する場合、複合 index を作成する.
      .orderBy('date')
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const expenseItems: ItemsType[] = []
        // expenseItems[] に それらの data と id をプッシュする
        query.forEach((doc) => {
          const docData = doc.data()
          expenseItems.push({
            amount: docData.amount,
            text: docData.text,
            uid: docData.uid,
            date: docData.date,
            docId: doc.id,
            tag: docData.tag,
          })
        })
        // react 側の expenseItems の配列を更新する
        setExpenseItems(expenseItems)
      })
  }

  // FireStore 上の expenseItems コレクションにある docId に該当するアイテムを削除する。
  const deleteExpense = (docId: string) => {
    db.collection('expenseItems').doc(docId).delete()
  }

  // % 合計と合計金を表示する
  const expenseTotal = totalCalcExpense(expenseItems)

  // ダイアログを開く
  const openDialog = () => {
    setIsDialogOpen(true)
  }

  // ダイアログからのコールバックでダイアログを閉じる
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Home 画面の上部をデザイン */}
      <AppBar
        position="absolute"
        // className={clsx(classes.appBar, open && classes.appBarShift)
        className={clsx(classes.appBar)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              // open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Home
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* メインページをデザイン */}
      <main className={classes.content}>
        {/* props で date と setPrevMonth、setNextMonth を Header.tsx に渡す */}
        <div className={classes.appBarSpacer} />
        <Header
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
        />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* 残高画面 */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Balance expenseTotal={expenseTotal} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div>
                <button onClick={openDialog}>新規追加</button>
                <ItemDetail
                  isOpen={isDialogOpen}
                  onClose={closeDialog}
                  categories={categories}
                />
              </div>
            </Grid>
            {/* 購入品詳細画面 */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ItemsList
                  deleteExpense={deleteExpense}
                  expenseItems={expenseItems}
                  categories={categories}
                />
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  )
}

const drawerWidth: number = 240

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddiingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export default Home
