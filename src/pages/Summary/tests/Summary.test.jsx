import { describe, expect, test } from "vitest";
import { render, screen } from "../../../testConfig/utils";
import SummaryPage from "..";
import { userEvent } from "@testing-library/user-event";

describe("Summary components test", () => {
  test("text element test", () => {
    render(<SummaryPage />);
    const productsElement = screen.getByText("Products:", { exact: false });
    expect(productsElement).toBeInTheDocument();

    const optionsElement = screen.getByText("Options", { exact: false });
    expect(optionsElement).toBeInTheDocument();
  });

  test("button click test", async () => {
    render(<SummaryPage />);
    const buttonElement = screen.getByRole("button", {
      name: "주문확인",
    });
    expect(buttonElement).toBeDisabled();

    const checkboxElement = screen.getByRole("checkbox");
    await userEvent.click(checkboxElement);
    expect(buttonElement).not.toBeDisabled();
  });
});
