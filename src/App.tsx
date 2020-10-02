import Menu from "./components/Menu";
import Page from "./pages/Page";
import Login from "./components/Login";
import Statistic from "./components/Statistic";
import Welcome from "./components/Welcome";
import AddFood from "./components/AddFood";
import ContactNous from "./components/ContactNous";
import Stepper from "./components/Stepper";
import React, { useState } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";

const App: React.FC = () => {
  const [connected, setConnected] = useState<Boolean>(false);
  //console.log(localStorage);
  //localStorage.setItem("connected", "false");

  const ReactRouterComponent = () => {
    if (
      localStorage.getItem("connected") === "true" &&
      localStorage.getItem("fitnessExist") === "true"
    ) {
      return (
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" className="main">
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/page/Accueil" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      );
    } else if (localStorage.getItem("connected") === "false") {
      if (isPlatform("desktop")) {
        return (
          <Router>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/ContactNous" component={ContactNous}></Route>
            <Route exact path="/stepper" component={Stepper}></Route>
          </Router>
        );
      } else {
        return (
          <Router>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/ContactNous" component={ContactNous}></Route>
            <Route exact path="/stepper" component={Stepper}></Route>
            <Redirect from="/" to="/login"></Redirect>
          </Router>
        );
      }
    } else if (
      localStorage.getItem("connected") === "true" &&
      localStorage.getItem("fitnessExist") === "false"
    ) {
      return (
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" className="main">
            <Route path="/page/:name" component={Page} exact />
            <Route exact path="/stepper" component={Stepper}></Route>
            <Redirect from="/" to="/page/Accueil" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      );
    } else {
      if (isPlatform("desktop")) {
        return (
          <Router>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/ContactNous" component={ContactNous}></Route>
            <Route exact path="/stepper" component={Stepper}></Route>
          </Router>
        );
      } else {
        return (
          <Router>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/ContactNous" component={ContactNous}></Route>
            <Route exact path="/stepper" component={Stepper}></Route>
            <Redirect from="/" to="/login"></Redirect>
          </Router>
        );
      }
    }
  };
  return (
    <IonApp>
      <IonReactRouter>{ReactRouterComponent()}</IonReactRouter>
    </IonApp>
  );
};

export default App;
