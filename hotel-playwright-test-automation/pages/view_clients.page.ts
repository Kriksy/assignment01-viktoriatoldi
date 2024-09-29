import { expect, type Locator, type Page } from "@playwright/test";

require("dotenv").config();

export class ViewClientsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/clients`);
  }
}
