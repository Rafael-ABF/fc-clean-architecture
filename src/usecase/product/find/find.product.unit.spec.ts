import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product 1", 100);

const MockRepository = () => ({
  find: jest.fn().mockResolvedValue(product),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = { id: "123" };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "Product 1",
      price: 100,
    });
    expect(productRepository.find).toHaveBeenCalledWith("123");
  });

  it("should throw error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const useCase = new FindProductUseCase(productRepository);

    await expect(useCase.execute({ id: "999" })).rejects.toThrow("Product not found");
  });
});