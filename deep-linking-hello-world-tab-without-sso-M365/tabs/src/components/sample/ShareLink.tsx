import { ReactElement, useEffect, useState } from "react";
import { Button, Image, Alert } from "@fluentui/react-northstar";
import "./Welcome.css";
import { pages, app } from "@microsoft/teams-js";
import { constants } from "../../constants";
import { SampleTabs } from "./SampleTabs";

export function ShareLink(props: { environment?: string }): ReactElement {
  const [context, setContext] = useState({} as app.Context);
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const appId = environment === "local" ? constants.TEAMS_APP_ID_LOCAL : constants.TEAMS_APP_ID_DEV;
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const friendlyStepsName: { [key: string]: string } = {
    subpage1: "subpage 1",
    subpage2: "subpage 2",
    subpage3: "subpage 3",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("subpage1");

  useEffect(() => {
    if (!app.isInitialized()) {
      app.initialize();
    }
    app.getContext().then((context) => {
      setContext(context);
      console.log(context);
    }).catch((err) => {
      console.error("Error getting context -> ", err);
    });

  }, []);

  useEffect(() => {
    if (context && Object.keys(context).length > 0 && context.page.subPageId) {
      setSelectedMenuItem(context.page.subPageId);
    }

  }, [context])

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
      <h2>Generate a link back to this page</h2>
        <div className="main-section">
          <div className="deeplink-functions-container">
          <div id="generate-deeplink">            
              <p>The button below uses <code>pages.shareDeepLink()</code> function to generate a URL that links back to this page in the app.</p>
              <Button primary content="Share link" onClick={() => {
                //const labelName = friendlyStepsName[selectedMenuItem];
                const labelName = "Share Link tab with " + selectedMenuItem;
                pages.shareDeepLink({ subPageId: selectedMenuItem, subPageLabel: labelName });
              }} />
            </div>
          </div>
          <SampleTabs selectedTab={selectedMenuItem} onTabChange={(selectedTab: string) => {
            setSelectedMenuItem(selectedTab);
          }} />
        </div>
      </div>
    </div>
  );
}
