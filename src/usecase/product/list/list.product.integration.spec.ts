import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products).toEqual([
      { id: "1", name: "Product 1", price: 100 },
      { id: "2", name: "Product 2", price: 200 },
    ]);
  });
});