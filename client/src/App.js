import React from 'react'
import 'bulma/css/bulma.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Jobs from './components/layout/Jobs'
import Footer from './components/layout/Footer'
import Users from './pages/Users'
import Job from './pages/Job'

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
          <Route path="/users" component={Users} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
