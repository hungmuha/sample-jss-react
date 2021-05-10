import React from "react";
import { Placeholder } from "@sitecore-jss/sitecore-jss-react";
import Helmet from "react-helmet";
import "./SingleColumnPage.css";
import PropTypes from "prop-types";
import * as templates from "./template/templates";
import Navigation from "./components/TopNavigation"
const Layout = ({ route }) => {
  const fundMap = templates.default;
  return (
    <>
      {/* react-helmet enables setting <head> contents, like title and OG meta tags */}
      <Helmet>
        <title>
          {(route.fields &&
            route.fields.pageTitle &&
            route.fields.pageTitle.value) ||
            "Fund Page"}
        </title>
      </Helmet>
      <div className="overflow-hidden">
        <Navigation/>
        {/* <Placeholder name="main-header" rendering={route} /> */}
        <Placeholder
          name="jss-main"
          rendering={route}
          pageFields={route.fields}
          fundType={fundMap[route.templateId]}
        />
      </div>
    </>
  );
};

Layout.propTypes = {
  route: PropTypes.shape({
    templateId: PropTypes.string,
    fields: PropTypes.shape({
      pageTitle: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  }),
};

Layout.defaultProps = {
  route: {
    templateId: "",
    fields: {
      pageTitle: {
        value: "Page",
      },
    },
  },
};

export default Layout;
