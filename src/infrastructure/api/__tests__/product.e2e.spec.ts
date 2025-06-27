import request from "supertest";
import { app, sequelize } from "../express";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("E2E test for product listing", () => {
  beforeAll(async () => {
    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    // Cria produtos diretamente no banco
    await ProductModel.create({ id: "1", name: "Product 1", price: 100 });
    await ProductModel.create({ id: "2", name: "Product 2", price: 200 });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "1", name: "Product 1", price: 100 }),
        expect.objectContaining({ id: "2", name: "Product 2", price: 200 }),
      ])
    );
  });
});