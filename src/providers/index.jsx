import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { store } from "../redux/store";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </>
  );
};

export default Providers;
