import { useDataEngine } from "@dhis2/app-runtime";
// import { AppStyles } from "./AppStyles.styles.tw";
import { HeaderBar } from '@dhis2/ui-widgets';
import { observer } from "mobx-react";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { TrackedEntityInstances } from "./components/TrackedEntityInstances";
import { useStore } from "./Context";
import "./App.css";
import { TrackedEntityInstance } from "./components/TrackedEntityInstance";


export const App = observer(() => {
  const store = useStore();
  const engine = useDataEngine();
  store.setEngine(engine);
  return (
    <Router>
      <div className="w-screen h-screen container-grid">
        <HeaderBar appName={'CPR Form'}
          style={{
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
          }}
        />
        <Switch>
          <Route exact path="/">
            <TrackedEntityInstances />
          </Route>
          <Route path="/:instance/:program">
            <TrackedEntityInstance />
          </Route>
        </Switch>
      </div>
    </Router>
  );
});