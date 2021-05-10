import React from "react";
const CookieContext = React.createContext({});
import Utils from "./Utils";

const CookiePortProvider = ({ children }) => {
  const [cookie, setCookie] = React.useState(Utils.canUseDom ? Utils.readCookies(document.cookie) : {});

  React.useEffect(() => {
    if (Utils.canUseDom) {
      setCookie(Utils.readCookies(document.cookie));
    }
    return () => Utils.canUseDom ? setCookie(Utils.readCookies(document.cookie)) : {};
  }, []);

  let value = {cookie, setCookie};

  return (
    <CookieContext.Provider value= {value}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
    const {cookie, setCookie} = React.useContext(CookieContext);
    return {cookie, setCookie};
}

export default CookiePortProvider;