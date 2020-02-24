import React from 'react'
import logo from './logo.svg'
import './App.css'
import './../node_modules/bulma/css/bulma.css'
import Header from './components/layout/Header'
import Jobs from './components/layout/Jobs'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Jobs />
      </main>

      <Footer />
    </div>
  )
}

export default App
