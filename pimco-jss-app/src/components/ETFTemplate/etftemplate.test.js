import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MockedProvider } from "@apollo/client/testing";
import ETFTemplate from "./index";
import { mockGraphQl } from "../../mocks/feesAndExpensesMock";

jest.mock("axios");
const mocks = mockGraphQl;

const { defaultProps } = ETFTemplate;

describe("ETFTemplate", () => {
  afterEach(() => {
    jest.clearAllMocks();
    axios.get.mockReset();
  });

  it("should show loading page", async () => {
    const data = {};
    axios.get.mockResolvedValue(data);
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ETFTemplate fundType="etf" pageFields={defaultProps.pageFields} />
      </MockedProvider>
    );
    await waitFor(() => {
      const elements = screen.getAllByTestId("text-loading");
      expect(elements).not.toHaveLength(0);
    });
  });

  it("should return out with empty fragment, no loading", async () => {
    const data = {};
    axios.get.mockResolvedValue(data);
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ETFTemplate fundType="" pageFields={null} />
      </MockedProvider>
    );
    await waitFor(() => {
      const element = screen.queryAllByTestId("text-loading");
      expect(element).toHaveLength(0);
    });
  });
});
