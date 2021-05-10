import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import mockData from "../../mocks/fundHeaderMock";
import FundHeaderWrapper from "./index";
import CookiePortProvider from "../../CookiePortProvider";

const { etfData, mfData, dataWrongShape } = mockData;

jest.mock("axios");

describe("FundHeaderWrapper", () => {
  afterEach(() => {
    jest.clearAllMocks();
    axios.get.mockReset();
  });

  it("loading without fund type should render nothing viewable", () => {
    render(<FundHeaderWrapper />);
    expect(screen.queryByTestId("fund-header")).not.toBeInTheDocument();
  });

  it("should render with ETF mock data", async () => {
    const data = etfData;
    axios.get.mockResolvedValue(data);
    const { getByText } = render(<FundHeaderWrapper fundType="etf" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(getByText("$3.99B")).toBeInTheDocument();
    });
  });

  it("should render with MF mock data", async () => {
    const data = mfData;
    axios.get.mockResolvedValue(data);
    const { getByText } = render(<FundHeaderWrapper fundType="etf" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(getByText("$69.88B")).toBeInTheDocument();
    });
  });

  it("data with the wrong shape should be caught by conditional check for res.data.data", async () => {
    const data = dataWrongShape;
    axios.get.mockResolvedValue(data);
    const { queryByText } = render(<FundHeaderWrapper fundType="etf" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(queryByText("$4.02B")).not.toBeInTheDocument();
    });
  });

  it("should make a call to reset cookie if it gets a 401 response", async () => {
    const postSpy = jest.spyOn(axios, "post");
    expect(postSpy).not.toHaveBeenCalled();
    const mockError = {
      response: {
        status: 401,
      },
    };
    axios.get.mockRejectedValueOnce(mockError);
    axios.get.mockResolvedValue();
    axios.post.mockResolvedValue();
    render(
      <CookiePortProvider>
        <FundHeaderWrapper fundType="etf" />
      </CookiePortProvider>
    );
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith("/reup");
    });
  });

  it("API responds with an error triggering the response.error", async () => {});
});
