import { expect, type Locator, type Page } from "@playwright/test";

require("dotenv").config();

export class CreateClientsPage {
  readonly page: Page;
  readonly createClientButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`/clients`);
  }
}
