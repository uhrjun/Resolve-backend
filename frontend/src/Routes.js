import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Dashboard from "./components/Mainview/Dashboard/Dashboard";
import Project from "./components/Mainview/Projects/Projects";
import ProjectDetail from "./components/Mainview/Projects/ProjectDetail/ProjectDetail";
import Issue from "./components/Mainview/Issues/Issues";
import Settings from "./components/Mainview/Settings/Settings";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/projects" component={Project} />
      <Route path="/projects/detail/:id" component={ProjectDetail} />
      <Route exact path="/issues" component={Issue} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  );
};

export default Routes;
