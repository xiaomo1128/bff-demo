import { GET, route } from "awilix-koa";
import { Context } from "@interfaces/IKoa";

@route("/")
class IndexController {
  @GET()
  async actionList(ctx: Context): Promise<void> {
    const data = await ctx.render("index", {
      data: `服务端数据接口：/ \n /test \n /list`,
    });
    ctx.body = data;
  }
}

export default IndexController;
