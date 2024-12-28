import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const baseUrl = "http://147.79.70.78:8080";

  useEffect(() => {
    if (token && localStorage.getItem("token") !== token) {
      localStorage.setItem("token", token);
    }
  }, [token])
  

  const apiFetch = async (endpoint, method = "GET", options = {}) => {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
  };

  return (
    <ApiContext.Provider value={{ apiFetch, setToken }}>
      {children}
    </ApiContext.Provider>
  );
};
ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApi = () => useContext(ApiContext);
