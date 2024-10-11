import { expect, type Locator, type Page } from "@playwright/test";

require("dotenv").config();

export class CreateClientsPage {
  readonly page: Page;
  readonly formName: Locator;
  readonly formEmail: Locator;
  readonly formPhoneNo: Locator;

  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formName = page
      .locator("div")
      .filter({ hasText: /^Name$/ })
      .getByRole("textbox");
    this.formEmail = page.locator('input[type="email"]');
    this.formPhoneNo = page
      .locator("div")
      .filter({ hasText: /^Telephone$/ })
      .getByRole("textbox");
    this.saveButton = page.getByText("Save");
  }

  async goto() {
    await this.page.goto(`/client/new`);

    await expect(
      this.page.getByText("New Client"),
      "Check current page title to be New Client"
    ).toBeVisible();
  }

  async save() {
    await this.saveButton.click();
  }
}
