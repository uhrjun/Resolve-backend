import React, { useState, useEffect } from "react";
import * as styled from "./App.styles";
import { Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import myTheme from "./theme";

//Components
import Sidebar from "./components/Sidebar/Sidebar";
import Mainview from "./components/Mainview/Mainview";

//Data
const sidebarHeader = {
  fullName: "RESOLVE",
  shortName: "",
  closeIcon: "icons/SidebarClose.svg",
  openIcon: "icons/SidebarOpen.svg",
};

const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    to: "/dashboard",
    icon: "icons/dashboard.svg ",
    iconSelected: "icons/dashboard_selected.svg",
  },
  {
    id: 2,
    name: "My Projects",
    to: "/projects",
    icon: "icons/projects.svg",
    iconSelected: "icons/projects_selected.svg",
  },
  {
    id: 3,
    name: "My Issues",
    to: "/issues",
    icon: "icons/issues.svg",
    iconSelected: "icons/issues_selected.svg",
  },
];

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 250);
  }, []);

  return (
    <div>
      {loading === false ? (
        <Switch>
          <ThemeProvider theme={myTheme}>
            <styled.App>
              <Sidebar sidebarHeader={sidebarHeader} menuItems={menuItems} />
              <Mainview />
            </styled.App>
          </ThemeProvider>
        </Switch>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
