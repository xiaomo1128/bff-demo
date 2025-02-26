import { IApi } from "@interfaces/IApi";
import { GET, route } from "awilix-koa";
import Router from "koa-router";

route("/");
class ApiController {
  private apiService: IApi;
  constructor({ apiService }: { apiService: IApi }) {
    this.apiService = apiService;
  }
  @route("/list")
  @GET()
  async actionList(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const data = await this.apiService.getInfo();
    ctx.body = {
      data,
    };
  }
}

export default ApiController;
