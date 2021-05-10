import Utils from "./Utils";
import axios from "axios";

const ReupAuth = (setCookie) => {
  axios
    .post("/reup")
    .then((response) => {
      const cookieObj = Utils.readCookies(document.cookie);
      setCookie(cookieObj);
    })
    .catch((error) => {
      console.log(`reup token failed: ${error}`);
    });
};

export default ReupAuth;
