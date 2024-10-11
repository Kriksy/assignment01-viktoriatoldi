import { expect, type Locator, type Page } from "@playwright/test";

require("dotenv").config();

export class ViewClientsPage {
  readonly page: Page;
  readonly createButton: Locator;
  readonly itemList: Locator;
  readonly lastItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator("#app > div > div.clients");
    this.lastItem = this.itemList.locator("> div:nth-last-child(1)");
  }

  async goto() {
    await this.page.goto(`/clients`);
    await expect(
      this.page.getByRole("heading", { name: "Clients" }),
      "Check that the heading is now 'Clients'"
    ).toBeVisible();
  }

  async gotoCreateClient() {
    await this.goto();
    // Browse to Create page using Button
    await this.page.getByRole("link", { name: "Create Client" }).click();
    // Check URL
    await this.page.waitForURL(`/client/new`);

    await expect(
      this.page.getByText("New Client"),
      "Check current page title to be New Client"
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
