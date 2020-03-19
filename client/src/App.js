import React from 'react'
import 'bulma/css/bulma.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import Header from './components/layout/Header'
import Jobs from './components/layout/Jobs'
import Footer from './components/layout/Footer'
import Users from './pages/Users'
import Job from './pages/Job'
import AddJob from './pages/AddJob'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Clients from './pages/Clients'

const Home = () => (
  <React.Fragment>
    <Jobs />
  </React.Fragment>
)

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/job/:jobId" component={Job} />
          <Route path="/add-job" component={AddJob} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/clients" component={Clients} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
