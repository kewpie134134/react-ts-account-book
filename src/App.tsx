import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from 'auth/AuthProvider'
import PrivateRoute from 'auth/PrivateRoute'
import 'App.css'
import Home from 'components/Home'
import SignIn from 'auth/SignIn'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
