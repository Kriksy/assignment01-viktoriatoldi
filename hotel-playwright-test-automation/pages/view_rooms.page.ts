import { expect, type Locator, type Page } from "@playwright/test";

export class ViewRoomsPage {
  readonly page: Page;
  readonly createButton: Locator;
  readonly itemList: Locator;
  readonly lastItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator("#app > div > div.rooms");
    this.lastItem = this.itemList.locator("> div:nth-last-child(1)");
  }

  async goto() {
    await this.page.goto(`/rooms`);
    await expect(
      this.page.getByRole("heading", { name: "Rooms" }),
      "Check that the heading is now 'Rooms'"
    ).toBeVisible();
  }

  async gotoCreateRoom() {
    await this.goto();
    // Browse to Create page using Button
    await this.page.getByRole("link", { name: "Create Room" }).click();
    // Check URL
    await this.page.waitForURL(`/room/new`);

    await expect(
      this.page.getByText("New Room"),
      "Check current page title to be New Room"
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
