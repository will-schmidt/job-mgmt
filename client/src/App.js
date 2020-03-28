import React, {useState, useEffect} from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Users from "./pages/Users";
import UpdateUser from "./pages/Users/UpdateUser";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import AddJob from "./pages/AddJob";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Clients from "./pages/Clients";
import {NotificationContext} from "./contexts/notificationContext";
import {PrivateRoute, PublicRoute} from "./withAuth";
import {
  getToken,
  setUserSession,
  removeUserSession
} from "./utils/authentication";

function App() {
  const [isNotified, setIsNotified] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    if (isNotified) {
      setTimeout(() => {
        setIsNotified(false);
      }, 3000);
    }
  }, [isNotified]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:5000/verifyToken?token=${token}`)
      .then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      {isNotified && (
        <div style={{position: "fixed", top: 50, right: 50, background: "red"}}>
          Awesome
        </div>
      )}
      <NotificationContext.Provider value={{isNotified, setIsNotified}}>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute path="/" exact component={Jobs} />
            <PrivateRoute path="/job/:jobId" component={Job} />
            <PrivateRoute path="/add-job" component={AddJob} />
            <PrivateRoute path="/users" exact component={Users} />
            <PrivateRoute path="/users/update/:userId" component={UpdateUser} />
            <PrivateRoute path="/clients" component={Clients} />
            <PublicRoute path="/signup" component={SignUp} />
            <PublicRoute path="/signin" component={SignIn} />
          </Switch>
          <Footer />
        </Router>
      </NotificationContext.Provider>
    </div>
  );
}

export default App;
