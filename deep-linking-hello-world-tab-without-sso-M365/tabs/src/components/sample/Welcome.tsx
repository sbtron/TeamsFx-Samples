import { useState, useEffect } from "react";
import { Button, Image, Menu } from "@fluentui/react-northstar";
import "./Welcome.css";
import { pages, app } from "@microsoft/teams-js";
import { constants } from "../../constants";


type TabProps = {
  selectedTab: string,
  onTabChange: (selectedTab: string) => void,
  environment?: string,
}
export function Welcome(props: TabProps) {
    const [context, setContext] = useState({} as app.Context);
    const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";
  const { selectedTab, onTabChange } = props;
  
  const steps = ["subpage1", "subpage2", "subpage3"];
  const friendlyStepsName: { [key: string]: string } = {
    subpage1: "1. This is the first sub-page",
    subpage2: "2. This is the second sub-page",
    subpage3: "3. This is the third sub-page",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("subpage1");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });


//   const items = steps.map((step) => {
//     return {
//         key: step,
//         content: friendlyStepsName[step] || "",
//         onClick: () => {
//             onTabChange(step);
//         },
//     };
// });
 
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
        <Menu activeIndex={steps.indexOf(selectedTab)} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "subpage1" && (
            <div>
              sub-page 1
            </div>
          )}
          {selectedMenuItem === "subpage2" && (
            <div>
              Sub-page 2
            </div>
          )}
          {selectedMenuItem === "subpage3" && (
            <div>
              sub-page 3
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
