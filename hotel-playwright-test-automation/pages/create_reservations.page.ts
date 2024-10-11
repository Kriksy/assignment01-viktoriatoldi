import { expect, type Locator, type Page } from "@playwright/test";

export class CreateReservationsPage {
  readonly page: Page;
  readonly formStartDate: Locator;
  readonly formEndDate: Locator;
  readonly formClient: Locator;

  readonly formRoom: Locator;
  readonly formBill: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formStartDate = page
      .locator("div")
      .filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ })
      .getByPlaceholder("YYYY-MM-DD");

    this.formEndDate = page
      .locator("div")
      .filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ })
      .getByPlaceholder("YYYY-MM-DD");
    this.formClient = page
      .locator("div")
      .filter({
        hasText: /^Client/,
      })
      .getByRole("combobox");

    this.formRoom = page
      .locator("div")
      .filter({
        hasText: /^Room/,
      })
      .getByRole("combobox");
    this.formBill = page
      .locator("div")
      .filter({ hasText: /^Bill/ })
      .getByRole("combobox");

    this.saveButton = page.getByText("Save");
  }

  async goto() {
    await this.page.goto(`/reservation/new`);

    await expect(
      this.page.getByText("New Reservation"),
      "Check current page title to be New Reservation"
    ).toBeVisible();
  }

  async save() {
    await this.saveButton.click();
  }
}
