import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page, request, APIRequestContext } from "@playwright/test";
import { PagesHelper } from "./helpers/pages.helper";
import { ApiHelper } from "./helpers/api.helper";

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiRequest!: APIRequestContext;

  pages!: PagesHelper;
  api!: ApiHelper;

  private _authToken?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get authToken() {
    return this._authToken;
  }

  set authToken(token: string | undefined) {
    this._authToken = token;
  }

  async initApiOnly() {
    this.apiRequest = await request.newContext();
    this.api = new ApiHelper(this.apiRequest, () => this._authToken);
  }

  async initWebAndApi() {
    const headless = process.env.HEADLESS !== "false";

    this.browser = await chromium.launch({
      headless,
      timeout: 60_000,
      args: ["--deny-permission-prompts"]
    });
    this.context = await this.browser.newContext({
      locale: "pt-BR"
    });
    this.page = await this.context.newPage();

    this.apiRequest = await request.newContext();

    this.pages = new PagesHelper(this.page);
    this.api = new ApiHelper(this.apiRequest, () => this._authToken);
  }

  async cleanup() {
    await this.apiRequest?.dispose();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
//