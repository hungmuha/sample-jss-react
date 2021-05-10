import Utils from "../../Utils";

const apiUrlGen = () => {
  if (process.env.NODE_ENV === "test") {
    return "https://dev-api.markitdigital.com/pimco-api/v1";
  }
  if (Utils.canUseDom) {
    if (window && window.MD && window.MD.API_URL) {
      return window.MD.API_URL;
    }
  }
  return "https://dev-api.markitdigital.com/pimco-api/v1";
};

export const apiUrl = apiUrlGen();

export const axiosConfig = (cookies) => {
  const accessToken =
    cookies && cookies.access_token ? cookies.access_token : "";
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const errorValue = "--";
