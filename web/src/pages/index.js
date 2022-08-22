import React from "react";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import Layout from "../components/layout";
import NotePage from "./note";
import Signup from "./signup";
import Signin from "./signin";
import {useQuery} from "@apollo/client";
import NewNote from "./new";
import {IS_LOGGED_IN} from "../gql/query";

const Pages = () => {
  return (
      <Router>
          <Layout>
              <Route exact path="/" component={Home}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/sigin" component={Signin}></Route>
              <PrivateRoute path="/mynotes" component={MyNotes}></PrivateRoute>
              <PrivateRoute path="/favorites" component={Favorites}></PrivateRoute>
              <PrivateRoute path="/new" component={NewNote}></PrivateRoute>
              <Route path="/note/:id" component={NotePage}></Route>
          </Layout>
      </Router>
  )  
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={
                        {
                            pathname: "/signin",
                            state: { from: props.location }
                        }
                    } />
                )
            }
        />
    )
};

export default Pages;
