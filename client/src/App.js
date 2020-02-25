import React from "react";
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Jobs from "./components/layout/Jobs";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Jobs} />>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
