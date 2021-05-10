import IconStar from "./components/Icons/IconStar";
import React from "react";
import moment from "moment";
import { gql } from "@apollo/client";
import axios from "axios";
import ReupAuth from "./ReupAuth";

class Utils {}

Utils.prototype.canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

Utils.prototype.getFormattedCurrency = (num) => {
  if(typeof num !== "number") return
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

}

Utils.prototype.getNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Utils.prototype.getDisplayDate = (date) => {
  if (!date) return '';
  if( moment.utc(date,'YYYY-MM-DDTHH:mm:ssZ').isValid()){
    return moment.utc(date,'YYYY-MM-DDTHH:mm:ssZ').format("MM/DD/YYYY");
  }
  return '';
}

Utils.prototype.areEqualShallow = (a, b) => {
  for (var key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (var keyB in b) {
    if (!(keyB in a) || a[keyB] !== b[keyB]) {
      return false;
    }
  }
  return true;
};

Utils.prototype.renderDocuments = (documentArray) => {
  if (documentArray) {
    return documentArray.map((elem, index) => {
      if (index > 2) return null;
      return (
        <a key={elem.title} href={elem.url}>
          <div className="pr-lg underline text-docs capitalize ">
            {elem.title}
          </div>
        </a>
      );
    });
  }
  return <></>;
};

Utils.prototype.returnStar = (starRating, height, width, fundClass) => {
  let returnArr=new Array(5).fill(false);
  for (let i = 0; i < starRating; i++) {
    returnArr[i] =  true;
  }
  return returnArr.map((x,i)=>{
    if(x){
      return (
        <IconStar key={i} height={`${height}`} width={`${width}`} fundClass={fundClass}/>
      )
    }
    else{
      return <IconStar key={i} height={`${height}`} width={`${width}`} fundClass="emptyStar" />
    }
  })
};

Utils.prototype.getCommonDisclosures = (pageType, fundType, section) => {
  return gql`
    query {
      item(
        path: "/sitecore/content/PIMCO/Repository/Disclosures/${pageType}/${fundType} Module Based Disclosures/${section}"
      ) {
        name
        children {
          ... on DisclosureItem {
            name
            disclosureText {
              value
            }
          }
        }
      }
    }
  `;
}

Utils.prototype.getOverrideDisclosures = (cusip, pageType, fundType, section) => {
  return gql`
    {
      search(keyword: "${cusip}", rootItem: "/sitecore/content/PIMCO/Repository/Disclosures/${pageType}/${fundType} Module Based Disclosures/${section}") {
      results {
        items {
          item {
          ... on DisclosureItem {
              name
              disclosureText {
                value
              }
            }
          }
        }
      }
    }
    }
  `;
}

/**
 * Gets a filtered array of disclosures for a fund provided keys are passed.
 * If fund specific disclosures are provided then this data will override the generic disclosure list.
 * @param disclosuresOverride fund specific disclosures
 * @param disclosures non-fund specific disclosures
 * @param keys used for filtering the disclosure list
 * @returns filtered disclosure list based on given keys
 */
Utils.prototype.getDisclosures = (disclosuresOverride, disclosures, keys) => {
  const disclosuresList = [];
  if (disclosuresOverride && disclosuresOverride.search.results.items.length > 0) {
    disclosuresOverride.search.results.items.forEach(disclosure => {
      if (disclosure) {
        disclosuresList.push(disclosure.item.disclosureText.value);
      }
    });
  }
  else if (disclosures && disclosures.item !== null) {
    disclosures.item.children
      .filter((obj) => Object.keys(obj).length !== 0)
      .forEach((disclosure) => {
        if (keys.includes(disclosure.name)) {
          disclosuresList.push(disclosure.disclosureText.value);
        }
      });
  }

  return disclosuresList;
};

Utils.prototype.flattenNestedArray = function(array) {
  return array.reduce(
    (acc, val) =>
      Array.isArray(val)
        ? acc.concat(this.flattenNestedArray(val))
        : acc.concat(val),
    []
  );
};

Utils.prototype.readCookies = (cookie) => {
  const rawCookies = cookie.split("; ");
  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const rawCookieArray = rawCookie.split("=");
    const [key, value] = rawCookieArray;
    parsedCookies[key] = value;
  });
  return parsedCookies;
};

/**
 * @param {string} url: the full url to get the component's data
 * @param {function} setApiData: the setState function that sets the data for the component
 * @param {function} [setCookie]: the setState function (from useCookie hook) that sets the cookie for the component. If neither setCookie nor catchCallback is set, cookie-resetting will NOT work!!
 * @param {getOptions} [object]: the config/options object to pass into the axios call, defaults to empty
 * @param {thenCallback} [function]: the callback function that handles the response on a successful call.  It takes in 1 argument (response).  Defaults to simply setting the apiData to res.data.data.
 * @param {catchCallback} [function]: the callback function that handles the response on a failed call.  It takes in 1 argument (error).
 */
Utils.prototype.getComponentData = (
  url, 
  setApiData, 
  setCookie, 
  getOptions = {},
  thenCallback = (res) => {
    if (res.data && res.data.data) setApiData(res.data.data);
  },
  catchCallback = (err) => {
    if (err.response && err.response.status === 401 && typeof setCookie === "function") ReupAuth(setCookie);
  }
) => {
  axios
    .get(url, getOptions)
    .then(thenCallback)
    .catch(catchCallback);
};

export default new Utils();
