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
}

export default ApiService;
