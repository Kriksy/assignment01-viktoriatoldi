import { expect, type Locator, type Page } from "@playwright/test";

export class CreateRoomsPage {
  readonly page: Page;
  readonly formRoomCategory: Locator;
  readonly formRoomNumber: Locator;
  readonly formRoomFloor: Locator;

  readonly formRoomPrice: Locator;
  readonly formRoomFeatures: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formRoomCategory = page
      .locator("div")
      .filter({ hasText: /^Category/ })
      .getByRole("combobox");
    this.formRoomNumber = page
      .locator("div")
      .filter({ hasText: /^Number$/ })
      .getByRole("spinbutton");
    this.formRoomFloor = page
      .locator("div")
      .filter({ hasText: /^Floor$/ })
      .getByRole("spinbutton");

    this.formRoomPrice = page
      .locator("div")
      .filter({ hasText: /^Price$/ })
      .getByRole("spinbutton");
    this.formRoomFeatures = page
      .locator("div")
      .filter({ hasText: /^Features/ })
      .getByRole("listbox");

    this.saveButton = page.getByText("Save");
  }

  async goto() {
    await this.page.goto(`/room/new`);

    await expect(
      this.page.getByText("New Room"),
      "Check current page title to be New Room"
    ).toBeVisible();
  }

  async save() {
    await this.saveButton.click();
  }
}
