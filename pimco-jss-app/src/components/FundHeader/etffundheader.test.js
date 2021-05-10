import React from "react";
import { render } from "@testing-library/react";
import ETFFundHeader from "./ETFFundHeader";
import mockData from "../../mocks/fundHeaderMock";

const { etfData } = mockData;

describe("ETFFundHeader", () => {
  it("should match the loading snapshot with empty data", () => {
    const { queryByText } = render(<ETFFundHeader apiData={undefined} />);
    expect(queryByText("1.54%")).not.toBeInTheDocument();
  });

  it("should match the snapshot with mock data", () => {
    const { getByText } = render(
      <ETFFundHeader fundType="etf" apiData={etfData.data.data} />
    );
    expect(getByText("1.54%")).toBeInTheDocument();
  });
});
