import { test, expect, describe } from "vitest";
import Products from "../components/Products";
import { render, screen } from "../../../testConfig/utils";
import { userEvent } from "@testing-library/user-event";
import Options from "../components/Options";
import OrderPage from "..";
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";

describe("Products component test", () => {
  test("product images test", async () => {
    render(<Products />);
    const imageElements = await screen.findAllByRole("img", {
      name: /product$/i,
    });
    expect(imageElements).toHaveLength(2);

    const altTextList = imageElements.map((image) => image.alt);
    expect(altTextList).toEqual(["America product", "England product"]);
  });

  test("options test", async () => {
    render(<Options />);
    const optionElements = await screen.findAllByRole("checkbox");
    expect(optionElements).toHaveLength(2);
  });
});

describe("calculate test", () => {
  test("product calculate test", async () => {
    render(<Products />);
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
  });

  test("product calculate and cancel test", async () => {
    render(<Products />);
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
    await userEvent.type(americaInput, "0");
    expect(productsTotal).toHaveTextContent("0");
  });

  test("option calculate test", async () => {
    render(<Options />);
    const optionsTotal = screen.getByText("Options total price", {
      exact: false,
    });
    expect(optionsTotal).toHaveTextContent("0");

    const insuranceInput = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    await userEvent.click(insuranceInput);
    expect(optionsTotal).toHaveTextContent("500");
  });

  test("option calculate and cancel test", async () => {
    render(<Options />);
    const optionsTotal = screen.getByText("Options total price", {
      exact: false,
    });
    expect(optionsTotal).toHaveTextContent("0");

    const insuranceInput = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    await userEvent.click(insuranceInput);
    expect(optionsTotal).toHaveTextContent("500");
    await userEvent.click(insuranceInput);
    expect(optionsTotal).toHaveTextContent("0");
  });

  test("multiple calculate text", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Final Price", {
      exact: false,
    });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    await userEvent.clear(americaInput);
    await userEvent.type(americaInput, "1");

    const englandInput = await screen.findByRole("spinbutton", {
      name: "England",
    });
    await userEvent.clear(englandInput);
    await userEvent.type(englandInput, "2");

    const dinnerInput = await screen.findByRole("checkbox", {
      name: "Dinner",
    });
    await userEvent.click(dinnerInput);
    expect(total).toHaveTextContent("3500");
  });
});

describe("error test", () => {
  test("product component error test", async () => {
    server.resetHandlers(
      http.get("http://localhost:8000/products", () => {
        return HttpResponse.error();
      })
    );

    render(<Products />);
    const errorBanner = await screen.findByText("에러가 발생하였습니다");
    expect(errorBanner).toBeInTheDocument();
  });

  test("option component error test", async () => {
    server.resetHandlers(
      http.get("http://localhost:8000/products", () => {
        return HttpResponse.error();
      })
    );

    render(<Options />);
    const errorBanner = await screen.findByText("에러가 발생하였습니다");
    expect(errorBanner).toBeInTheDocument();
  });
});
