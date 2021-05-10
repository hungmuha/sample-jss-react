import React from "react";
import { render } from "@testing-library/react";
import MFFundHeader from "./MFFundHeader";
import mockData from "../../mocks/fundHeaderMock";

const { mfData } = mockData;

describe("MFFundHeader", () => {
  it("should match the loading snapshot with empty data", () => {
    const { queryByText } = render(<MFFundHeader apiData={undefined} />);
    expect(queryByText("8.03%")).not.toBeInTheDocument();
  });

  it("should match the snapshot with mock data", () => {
    const { getByText } = render(
      <MFFundHeader fundType="etf" apiData={mfData.data.data} />
    );
    expect(getByText("8.03%")).toBeInTheDocument();
  });
});
