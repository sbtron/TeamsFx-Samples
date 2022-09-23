import { ReactElement, useEffect, useState } from "react";
import { app, executeDeepLink, pages } from "@microsoft/teams-js";
import './Welcome.css'
import { Button } from "@fluentui/react-northstar";
import { constants } from "../../constants";

/**
 * This component is used to display the selected record from Welcome.tsx page
 * using pages.navigateToApp();
 */
export default function NavigateWithinApp(props: { environment?: string }): ReactElement {
  const [context, setContext] = useState({} as app.Context);
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const appId = environment === "local" ? constants.TEAMS_APP_ID_LOCAL : constants.TEAMS_APP_ID_DEV;
  const [selectedMenuItem, setSelectedMenuItem] = useState("subpage1");
  const [buttonTxt, setbuttonTxt] = useState("Open Share link tab with sub-page 1" as string);

  useEffect(() => {
    if (!app.isInitialized()) {
      app.initialize();
    }
    app.getContext().then((context) => {
      setContext(context);
      console.log(context);
    }).catch((err) => {
      console.error("Error getting context here -> ", err);
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
      <h2>Navigate within the app</h2>
        <div className="main-section">
            <div id="navigate-within-app">
              <p>Click on the button to navigate to another tab within the application.<br/>
              This uses <code>pages.navigateToApp()</code> function to navigate a user to another tab passing in the selected <code>subPageId</code> to navigate you directly to the subpage.</p>
              <p>Select which sub-page on the <code>share link</code> tab you want to navigate to?</p>
             
              <div><input type="radio" name="subpage" value="subpage1" checked={selectedMenuItem==="subpage1"}
               onChange={(e: any) => {
                            setSelectedMenuItem(e.target.value);
                            setbuttonTxt("Open Share link tab with sub-page 1");
                        }}/> Sub-page 1</div>

              <div><input type="radio" name="subpage" value="subpage2" checked={selectedMenuItem==="subpage2"}
              onChange={(e: any) => {
                            setSelectedMenuItem(e.target.value);
                            setbuttonTxt("Open Share link tab with sub-page 2");
                        }}/> Sub-page 2</div>
              <div><input type="radio" name="subpage" value="subpage3" checked={selectedMenuItem==="subpage3"}
              onChange={(e: any) => {
                            setSelectedMenuItem(e.target.value);
                            setbuttonTxt("Open Share link tab with sub-page 3");
                        }}/> Sub-page 3</div>
              
              <Button primary content={buttonTxt} onClick={() => {
                const baseUrl = `https://${window.location.hostname}:${window.location.port}/sharelink/${selectedMenuItem}`;
                pages.navigateToApp({ appId: appId, pageId: 'sharelink', webUrl: encodeURI(baseUrl), subPageId: selectedMenuItem });
              }} />
            </div>
        </div>
      </div>
    </div>
  );
}
