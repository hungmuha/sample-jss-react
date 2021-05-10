import React from "react";
import PropTypes from "prop-types";
import FundHeaderWrapper from "../FundHeader";
import WhyInvestWrapper from "../WhyInvest";
import IndexInformationWrapper from "../IndexInformation";
import PortfolioInformationWrapper from "../PortfolioInformation";
import FundInformationWrapper from "../FundInformation";
import FeesAndExpensesWrapper from "../FeesAndExpenses";
import AnalystRatingsWrapper from "../AnalystRatings";
import PortfolioCompositionWrapper from "../PortfolioComposition";
import ReturnsWrapper from "../Returns";
import YieldsAndDistributionsWrapper from "../YieldsAndDistributions";
import QuarterlyTradingWrapper from "../QuarterlyTrading";
import GrowthOfTenWrapper from "../GrowthOfTen";
import TopTenExposureWrapper from "../TopTenExposure";

const ETFTemplate = (props) => {
  const { pageFields, fundType } = props;
  if (!pageFields) return <></>;
  const pageCusip = "72201R775"; // Should be parsed using the symbol URL later
  return (
    <>
      <FundHeaderWrapper cusip={pageCusip} fundType={fundType} />
      <WhyInvestWrapper cusip={pageCusip} fundType={fundType} />
      <PortfolioInformationWrapper cusip={pageCusip} fundType={fundType} />
      <IndexInformationWrapper cusip={pageCusip} fundType={fundType} />
      <GrowthOfTenWrapper cusip={pageCusip} fundType={fundType} />
      <FundInformationWrapper cusip={pageCusip} fundType={fundType} />
      <QuarterlyTradingWrapper cusip={pageCusip} fundType={fundType} />
      <TopTenExposureWrapper cusip={pageCusip} fundType={fundType} />
      <FeesAndExpensesWrapper cusip={pageCusip} fundType={fundType} />
      <AnalystRatingsWrapper cusip={pageCusip} fundType={fundType} />
      <PortfolioCompositionWrapper cusip={pageCusip} fundType={fundType} />
      <ReturnsWrapper cusip={pageCusip} fundType={fundType} />
      <YieldsAndDistributionsWrapper cusip={pageCusip} fundType={fundType} />
    </>
  );
};

ETFTemplate.propTypes = {
  fundType: PropTypes.string,
  pageFields: PropTypes.shape({
    cusip: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};

ETFTemplate.defaultProps = {
  fundType: "",
  pageFields: {
    cusip: {
      value: "",
    },
  },
};

export default ETFTemplate;
