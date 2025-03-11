import { IData } from "./IData";

export interface IApi {
  getInfo(): Promise<IData>;
  getTest(): Promise<IData>;
}
