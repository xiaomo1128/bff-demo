import { IApi } from "@interfaces/IApi";
import { IData } from "@interfaces/IData";

class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: "后台数据～～",
        result: [1, "next"],
      });
    });
  }
  getTest() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: "Test Api",
        result: [2, "Test~~"],
      });
    });
  }
}

export default ApiService;
