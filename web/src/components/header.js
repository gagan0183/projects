import React from "react";
import logo from "../img/logo.svg";
import styled from "styled-components";
import {gql, useQuery} from "@apollo/client";
import {withRouter, Link} from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const UserState = styled.div`
  margin-right: 2rem;
`;

const Header = () => {
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <div>
                <img src={logo} alt="Notedly logo" height="40" />
                <LogoText>Notedly</LogoText>
            </div>
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink onClick={() => {
                        localStorage.removeItem("token");
                        client.resetStore();
                        client.writeData({
                            data: {
                                isLoggedIn: false
                            }
                        });
                        props.history.push("/");
                    }}>Log Out</ButtonAsLink>
                ) : (
                    <p>
                        <Link to={"/sigin"}>Sign In</Link>or {' '}
                        <Link to={"/signup"}>Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    )
};

export default withRouter(Header);
