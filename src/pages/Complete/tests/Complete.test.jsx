import { describe, expect, test } from "vitest";
import { render, screen } from "../../../testConfig/utils";
import CompletePage from "..";
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";

describe("Complete component test", () => {
  test("text element test", async () => {
    render(<CompletePage />);
    const loadingElement = screen.getByText("로딩중");
    expect(loadingElement).toBeInTheDocument();

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
  });
});

describe("error test", () => {
  test("complete component error test", async () => {
    server.resetHandlers(
      http.post("http://localhost:8000/order", () => {
        return HttpResponse.error();
      })
    );

    render(<CompletePage />);
    const errorBanner = await screen.findByText("에러가 발생하였습니다");
    expect(errorBanner).toBeInTheDocument();
  });
});
