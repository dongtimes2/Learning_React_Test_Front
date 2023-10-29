import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8000/products", () => {
    return HttpResponse.json([
      {
        name: "America",
        imagePath: "/images/america.jpeg",
      },
      {
        name: "England",
        imagePath: "/images/england.jpeg",
      },
    ]);
  }),
  http.get("http://localhost:8000/options", () => {
    return HttpResponse.json([
      {
        name: "Insurance",
      },
      {
        name: "Dinner",
      },
    ]);
  }),
  http.post("http://localhost:8000/order", () => {
    return HttpResponse.json({ orderNumber: 123456, price: 1000 });
  }),
];
