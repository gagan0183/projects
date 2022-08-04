import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import Layout from "../components/layout";
import NotePage from "./note";

const Pages = () => {
  return (
      <Router>
          <Layout>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/mynotes" component={MyNotes}></Route>
              <Route exact path="/favorites" component={Favorites}></Route>
              <Route exact path="/note/:id" component={NotePage}></Route>
          </Layout>
      </Router>
  )  
};

export default Pages;
