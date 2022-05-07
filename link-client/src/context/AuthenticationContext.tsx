import axios from "axios";

import React, { useContext } from "react";

class AuthenticationContextProperties {
  public authenticated: boolean;
  constructor() {
    this.authenticated = false;
  }
  register = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    };

    const res = await axios.post("http://localhost:5000/auth/register", body);
    console.log(res);
  };
  login = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    };

    const res = await axios.post("http://localhost:5000/auth/login", body);
    console.log(res);
    this.authenticated = true;
  };
  logout = () => {
    axios.post("http://localhost:5000/auth/logout").then((res) => {
      console.log(res);
      this.authenticated = false;
    });
  };
}

interface AuthenticationProviderProperties {
  children: React.ReactNode;
}

const defaultValue = new AuthenticationContextProperties();

const AuthenticationContext =
  React.createContext<AuthenticationContextProperties>(defaultValue);

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = (
  props: AuthenticationProviderProperties
) => {
  return (
    <AuthenticationContext.Provider value={defaultValue}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
