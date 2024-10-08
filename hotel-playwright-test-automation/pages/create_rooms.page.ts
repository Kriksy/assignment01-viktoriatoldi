import { expect, type Locator, type Page } from "@playwright/test";

export class CreateRoomsPage {
  readonly page: Page;
  readonly createRoomsButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }
}
