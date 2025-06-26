import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product Updated",
      price: 150,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "Product Updated",
      price: 150,
    });

    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel.name).toBe("Product Updated");
    expect(productModel.price).toBe(150);
  });

  it("should throw error when product not found", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    await expect(
      useCase.execute({ id: "999", name: "x", price: 1 })
    ).rejects.toThrow("Product not found");
  });
});