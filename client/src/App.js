import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import Header from './components/layout/Header'
import Jobs from './components/layout/Jobs'
import Footer from './components/layout/Footer'
import Users from './pages/Users'
import UpdateUser from './pages/Users/UpdateUser'
import Job from './pages/Job'
import AddJob from './pages/AddJob'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Clients from './pages/Clients'
import { NotificationContext } from './contexts/notificationContext'

const Home = () => (
  <React.Fragment>
    <Jobs />
  </React.Fragment>
)

function App() {
  const [isNotified, setIsNotified] = useState(false)
  useEffect(() => {
    if (isNotified) {
      setTimeout(() => {
        setIsNotified(false)
      }, 3000)
    }
  }, [isNotified])

  console.log({ isNotified })
  return (
    <div className="App">
      {isNotified && (
        <div
          style={{ position: 'fixed', top: 50, right: 50, background: 'red' }}
        >
          Awesome
        </div>
      )}
      <NotificationContext.Provider value={{ isNotified, setIsNotified }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/job/:jobId" component={Job} />
            <Route path="/add-job" component={AddJob} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/update/:userId" component={UpdateUser} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/clients" component={Clients} />
          </Switch>
          <Footer />
        </Router>
      </NotificationContext.Provider>
    </div>
  )
}

export default App
