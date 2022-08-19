import React, { useEffect } from "react";
import {gql, useApolloClient, useMutation} from "@apollo/client";
import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    const client = useApolloClient();

    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem("token", data.signIn);
            client.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            props.history.push("/");
        }
    })

    useEffect(() => {
        document.title = "Sign In - Notedly";
    });

    return (
        <React.Fragment>
            <UserForm formType="signin" action={signIn} />
            {loading && <p>Loading...</p>}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    );
};

export default SignIn;
