import { expect, type Locator, type Page } from "@playwright/test";

export class CreateReservationsPage {
  readonly page: Page;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`/reservation`);
  }
}
