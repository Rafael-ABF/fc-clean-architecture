import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product 1", 100);

const MockRepository = () => ({
  find: jest.fn().mockResolvedValue(product),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
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
    expect(productRepository.update).toHaveBeenCalled();
  });

  it("should throw error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const useCase = new UpdateProductUseCase(productRepository);

    await expect(
      useCase.execute({ id: "999", name: "x", price: 1 })
    ).rejects.toThrow("Product not found");
  });
});