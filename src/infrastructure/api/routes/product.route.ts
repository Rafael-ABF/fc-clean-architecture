import express, { Request, Response } from "express";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const listProductUseCase = new ListProductUseCase(productRepository);

  const output = await listProductUseCase.execute({});
  res.status(200).json(output);
});