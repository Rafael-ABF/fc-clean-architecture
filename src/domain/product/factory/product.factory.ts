import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(type: "a", name: string, price: number): Product;
  public static create(type: "b", name: string, price: number): ProductB;
  public static create(type: string, name: string, price: number): ProductInterface;

  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}