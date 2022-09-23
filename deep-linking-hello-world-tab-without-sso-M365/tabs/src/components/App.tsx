import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./App.css";
import { useTeams } from "msteams-react-base-component";
import NavigateWithinApp from "./sample/NavigateWithinApp";
import HostCapabilities from "./sample/HostCapabilities";
import { ShareLink } from "./sample/ShareLink";
import { shareDeepLink } from "@microsoft/teams-js";


/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme } = useTeams({})[0];
  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
      <Router>
        <Route exact path="/">
          <Redirect to="/tab" />
        </Route>
        <>
          <Route exact path="/tab" component={Tab} />
          <Route exact path="/navigatewithinapp" component={NavigateWithinApp} />
          <Route exact path="/sharelink" component={ShareLink} />
          <Route exact path="/hostcapabilities" component={HostCapabilities} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          
        </>
      </Router>
    </Provider>
  );
}
