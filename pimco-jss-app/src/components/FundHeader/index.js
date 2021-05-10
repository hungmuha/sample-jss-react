import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ETFFundHeader from "./ETFFundHeader";
import MFFundHeader from "./MFFundHeader";
import { useCookie } from "../../CookiePortProvider";
import { axiosConfig, apiUrl } from "../../shared/js/constants";
import Utils from "../../Utils";

const routeToCorrectFund = (fundType, apiData) => {
  switch (fundType) {
    case "etf":
      return <ETFFundHeader apiData={apiData} />;
    case "mf":
      return <MFFundHeader apiData={apiData} />;
    default:
      return <></>;
  }
};

const FundHeaderWrapper = (props) => {
  const { cusip, fundType } = props;
  const [apiData, setApiData] = useState({});
  const { cookie, setCookie } = useCookie();

  useEffect(() => {
    if (fundType) {
      Utils.getComponentData(
        `${apiUrl}/getFullHeader/${fundType}/${cusip}`,
        setApiData,
        setCookie,
        axiosConfig(cookie)
      );
    }
  }, [cusip, fundType, cookie]);

  return (
    <div
      className={`w-full bg-${fundType}-header bg-${fundType} xl:px-d-xl l:px-d-l m:px-d-m tab:px-t tab-s:px-t-s mob:px-m`}
    >
      {routeToCorrectFund(fundType, apiData)}
    </div>
  );
};

FundHeaderWrapper.propTypes = {
  fundType: PropTypes.string,
  cusip: PropTypes.string,
};

FundHeaderWrapper.defaultProps = {
  fundType: "",
  cusip: "",
};
export default FundHeaderWrapper;
