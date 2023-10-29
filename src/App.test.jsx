import { describe, expect, test } from "vitest";
import App from "./App";
import { render, screen } from "./testConfig/utils";
import { userEvent } from "@testing-library/user-event";

describe("Integration test", () => {
  test("test", async () => {
    render(<App />);
    const productsTotal = screen.getByText("Products total price", {
      exact: false,
    });
    expect(productsTotal).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    await userEvent.clear(americaInput);
    await userEvent.type(americaInput, "1");
    expect(productsTotal).toHaveTextContent("1000");

    const optionsTotal = screen.getByText("Options total price", {
      exact: false,
    });
    expect(optionsTotal).toHaveTextContent("0");

    const insuranceInput = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    await userEvent.click(insuranceInput);
    expect(optionsTotal).toHaveTextContent("500");

    const orderButtonElement = screen.getByRole("button", {
      name: "주문하기",
    });
    await userEvent.click(orderButtonElement);

    // summary page로 전환됨
    const checkButtonElement = screen.getByRole("button", {
      name: "주문확인",
    });
    expect(checkButtonElement).toBeInTheDocument();
    expect(checkButtonElement).toBeDisabled();

    const productsElement = screen.getByText("Products:", { exact: false });
    expect(productsElement).toBeInTheDocument();
    expect(productsElement).toHaveTextContent("1000");

    const optionsElement = screen.getByText("Options", { exact: false });
    expect(optionsElement).toBeInTheDocument();
    expect(optionsElement).toHaveTextContent("500");

    const checkboxElement = screen.getByRole("checkbox");
    await userEvent.click(checkboxElement);
    expect(checkButtonElement).not.toBeDisabled();
    await userEvent.click(checkButtonElement);

    // complete page로 전환됨
    const successElement = await screen.findByText("주문이 성공했습니다.");
    expect(successElement).toBeInTheDocument();

    const backButton = await screen.findByRole("button", {
      name: "첫 페이지로 가기",
    });
    expect(backButton).toBeInTheDocument();

    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();

    const orderNumber = await screen.findByText("123456");
    expect(orderNumber).toBeInTheDocument();

    const price = await screen.findByText("1000");
    expect(price).toBeInTheDocument();
    await userEvent.click(backButton);

    // 다시 첫 페이지로 이동함
    const travelProductsText = screen.getByText("Travel Products");
    expect(travelProductsText).toBeInTheDocument();
  });
});
