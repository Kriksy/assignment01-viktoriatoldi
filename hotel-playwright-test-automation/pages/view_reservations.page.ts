import { expect, type Locator, type Page } from "@playwright/test";

export class ViewReservationsPage {
  readonly page: Page;
  readonly createButton: Locator;
  readonly itemList: Locator;
  readonly lastItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator("#app > div > div.reservations");
    this.lastItem = this.itemList.locator("> div:nth-last-child(1)");
  }

  async goto() {
    await this.page.goto(`/reservations`);
    await expect(
      this.page.getByRole("heading", { name: "Reservations" }),
      "Check that the heading is now 'Reservations'"
    ).toBeVisible();
  }

  async gotoCreateReservation() {
    await this.goto();
    // Browse to Create page using Button
    await this.page.getByRole("link", { name: "Create Reservation" }).click();
    // Check URL
    await this.page.waitForURL(`/reservation/new`);

    await expect(
      this.page.getByText("New Reservation"),
      "Check current page title to be New Reservation"
    ).toBeVisible();
  }

  async deleteLastItem() {
    // Click on "..."
    await this.lastItem.locator("div.action").click();

    // Delete new entry
    const deleteElement = this.lastItem.getByText("Delete");
    await deleteElement.click();
  }
}
