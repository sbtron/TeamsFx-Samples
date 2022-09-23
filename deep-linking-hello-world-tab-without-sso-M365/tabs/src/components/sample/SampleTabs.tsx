import { ReactElement, useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { Button, Image, Alert } from "@fluentui/react-northstar";
import "./Welcome.css";
import { pages, app } from "@microsoft/teams-js";

type TabProps = {
    selectedTab: string,
    onTabChange: (selectedTab: string) => void,
    environment?: string,
}
export function SampleTabs(props: TabProps): ReactElement {
    const steps = ["subpage1", "subpage2", "subpage3"];
    const friendlyStepsName: { [key: string]: string } = {
        subpage1: "subpage 1",
        subpage2: "subpage 2",
        subpage3: "subpage 3",
    };
    const { selectedTab, onTabChange } = props;
    const items = steps.map((step) => {
        return {
            key: step,
            content: friendlyStepsName[step] || "",
            onClick: () => {
                onTabChange(step);
            },
        };
    });
    const [selectedMenuItem, setSelectedMenuItem] = useState("subpage1");

    return (
        <div className="menu-container">
            <Menu activeIndex={steps.indexOf(selectedTab)} items={items} underlined secondary />
            <div className="sections">
                {selectedTab === "subpage1" && (
                    <div>
                        <p>You selected Tab 1</p>
                    </div>
                )}
                {selectedTab === "subpage2" && (
                    <div>
                        <p>You selected Tab 2</p>
                    </div>
                )}
                {selectedTab === "subpage3" && (
                    <div>
                        <p>You selected Tab 3</p>
                    </div>
                )}
            </div>
        </div>
    );
}
