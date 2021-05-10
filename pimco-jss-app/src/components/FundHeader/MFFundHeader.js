import React from "react";
import PropTypes from "prop-types";
import Utils from "../../Utils";
import IconBookmark from "../Icons/IconBookmark";
import IconDownload from "../Icons/IconDownload";
import IconShare from "../Icons/IconShare";
import TextLoading from "../Shared/TextLoading";

const { renderDocuments } = Utils;

const MFFundHeader = ({ apiData }) => {
  const {
    distributionYield,
    distributionYieldAsOfDate,
    documents,
    morningStarRating,
    morningStarAsOfDate,
    name,
    sec30DayYieldSubsidized,
    sec30DayYieldSubsidizedAsofDate,
    sectorOrClass,
    ticker,
    totalNetAssets,
    totalNetAssetsAsOfDate,
    ytdDailyMarketPrice,
    ytdDailyMarketPriceAsOfDate,
    ytdDailyNav,
    ytdDailyNavAsOfDate,
    objective,
    inceptionDate,
  } = apiData;
  return (
    <div
      data-testid="fund-header"
      className="flex mob:flex-col tab-s:flex-col tab:flex-col flex-row justify-between items-start"
    >
      <div className="w-1/3 h-full mt-70 tab:w-5/6 tab-s:w-full mob:w-full">
        <div className="bg-black text-center text-white flex items-center justify-center capitalize h-56 w-56">
          <h3 className="p-0 m-0 text-sm min-w-full flex justify-center">
            {ticker || <TextLoading />}
          </h3>
        </div>
        <h1 className="font-senhan text-navy xl:text-header-xl text-header mt-xl tab-s:mt-40">
          {name || (
            <>
              <TextLoading />
            </>
          )}
        </h1>
        <p className="mt-lg text-objective tab:text-objective-tab mob:text-objective-mob text-navy">
          {objective || (
            <>
              <TextLoading />
              <TextLoading />
              <TextLoading />
            </>
          )}
        </p>
      </div>
      <div className="bg-white shadow-card w-7/12 tab:w-full tab-s:w-full mob:w-full mt-140 tab:mt-30 tab:mb-40 tab-s:mt-20 tab-s:mb-30 mob:mt-20 mob:mb-55 mb-120">
        <div className="flex flex-wrap py-lg">
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {sectorOrClass ? "CLASS" : <TextLoading />}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {sectorOrClass || <TextLoading />}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2 mob:border-none">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {sec30DayYieldSubsidizedAsofDate && sec30DayYieldSubsidized ? (
                  "30-DAY SEC YIELD SUBSIDIZED"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {sec30DayYieldSubsidizedAsofDate && sec30DayYieldSubsidized ? (
                  sec30DayYieldSubsidized
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {sec30DayYieldSubsidizedAsofDate && sec30DayYieldSubsidized ? (
                  `as of ${Utils.getDisplayDate(
                    sec30DayYieldSubsidizedAsofDate
                  )}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {distributionYieldAsOfDate && distributionYield ? (
                  "DISTRIBUTION YIELD AT NAV"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {distributionYieldAsOfDate && distributionYield ? (
                  distributionYield
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {distributionYieldAsOfDate && distributionYield ? (
                  `as of ${Utils.getDisplayDate(distributionYieldAsOfDate)}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {inceptionDate ? "INCEPTION" : <TextLoading />}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {inceptionDate || <TextLoading />}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {totalNetAssetsAsOfDate && totalNetAssets ? (
                  "TOTAL NET ASSETS"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {totalNetAssetsAsOfDate && totalNetAssets ? (
                  totalNetAssets
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {totalNetAssetsAsOfDate && totalNetAssets ? (
                  `as of ${Utils.getDisplayDate(totalNetAssetsAsOfDate)}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2 mob:border-none">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {ytdDailyNav && ytdDailyNavAsOfDate ? (
                  "NAV YTD RETURN"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {ytdDailyNav && ytdDailyNavAsOfDate ? (
                  ytdDailyNav
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {ytdDailyNav && ytdDailyNavAsOfDate ? (
                  `as of ${Utils.getDisplayDate(ytdDailyNavAsOfDate)}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md border-r-2">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {ytdDailyMarketPrice && ytdDailyMarketPriceAsOfDate ? (
                  " DAILY YTD RETURN"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm">
                {ytdDailyMarketPrice && ytdDailyMarketPriceAsOfDate ? (
                  ytdDailyMarketPrice
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {ytdDailyMarketPrice && ytdDailyMarketPriceAsOfDate ? (
                  `as of ${Utils.getDisplayDate(ytdDailyMarketPriceAsOfDate)}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
          <div className="w-1/4 p-sm mb-sm mob:w-1/2">
            <div className=" w-full h-full flex flex-col pl-md">
              <p className="font-roboto-condensed text-grey text-description mb-1">
                {morningStarRating && morningStarAsOfDate ? (
                  "MORNINGSTAR RATING"
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto-condensed text-data xl:text-data-xl pb-sm text-etf flex">
                {morningStarRating && morningStarAsOfDate ? (
                  Utils.returnStar(morningStarRating, "18", "20", "mf")
                ) : (
                  <TextLoading />
                )}
              </p>
              <p className="font-roboto text-as-of italic text-grey pb-0">
                {morningStarRating && morningStarAsOfDate ? (
                  `as of ${Utils.getDisplayDate(morningStarAsOfDate)}`
                ) : (
                  <TextLoading />
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-sm border-t border-gray px-lg py-sm items-center">
          <div className="flex mob:flex-col">{renderDocuments(documents)}</div>
          <div className="flex mob:items-end">
            <div className="ml-sm p-1 bg-icon rounded-full ">
              <IconDownload height={18} width={18} />
            </div>
            <div className="ml-sm p-1 bg-icon rounded-full">
              <IconShare height={18} width={18} />
            </div>
            <div className="ml-sm p-1 bg-icon rounded-full">
              <IconBookmark height={18} width={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MFFundHeader.propTypes = {
  apiData: PropTypes.shape({
    objective: PropTypes.string,
    distributionYield: PropTypes.string,
    distributionYieldAsOfDate: PropTypes.string,
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    morningStarRating: PropTypes.number,
    morningStarAsOfDate: PropTypes.string,
    name: PropTypes.string,
    sec30DayYieldSubsidized: PropTypes.string,
    sec30DayYieldSubsidizedAsofDate: PropTypes.string,
    sectorOrClass: PropTypes.string,
    ticker: PropTypes.string,
    totalNetAssets: PropTypes.string,
    totalNetAssetsAsOfDate: PropTypes.string,
    ytdDailyMarketPrice: PropTypes.string,
    ytdDailyMarketPriceAsOfDate: PropTypes.string,
    ytdDailyNav: PropTypes.string,
    ytdDailyNavAsOfDate: PropTypes.string,
    inceptionDate: PropTypes.string,
  }),
};

MFFundHeader.defaultProps = {
  apiData: {
    distributionYield: "",
    objective: "",
    distributionYieldAsOfDate: "",
    documents: [
      {
        title: "",
        url: "",
      },
    ],
    morningStarRating: 0,
    morningStarAsOfDate: "",
    name: "",
    nav: "",
    navAsOfDate: "",
    sec30DayYieldSubsidized: "",
    sec30DayYieldSubsidizedAsofDate: "",
    sectorOrClass: "",
    ticker: "",
    totalNetAssets: "",
    totalNetAssetsAsOfDate: "",
    ytdDailyMarketPrice: "",
    ytdDailyMarketPriceAsOfDate: "",
    ytdDailyNav: "",
    ytdDailyNavAsOfDate: "",
    inceptionDate: "",
  },
};

export const testables = { renderDocuments };
export default MFFundHeader;
