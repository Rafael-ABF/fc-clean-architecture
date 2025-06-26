import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
};

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
});

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
    expect(productRepository.create).toHaveBeenCalled();
  });
});