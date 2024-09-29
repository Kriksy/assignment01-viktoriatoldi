import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateClientsPage } from "../pages/create_clients.page";
import { LoginPage } from "../pages/login.page";

require("dotenv").config();

test.describe("Clients", () => {
  test("Test case: Create New Client", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createClientsPage = new CreateClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );

    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" }),
      "Check that the heading is now Tester Hotel Overview"
    ).toBeVisible();

    await page.locator("#app > div > div > div:nth-child(2) > a").click();

    await expect(
      page.getByRole("heading", { name: "Clients" }),
      "Check that the heading is now 'Clients'"
    ).toBeVisible();

    await page.getByRole("link", { name: "Create Client" }).click();

    await expect(
      page.getByText("New Client"),
      "Check current page title to be New Client"
    ).toBeVisible();

    // Create new fake client data
    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    await page
      .locator("div")
      .filter({ hasText: /^Name$/ })
      .getByRole("textbox")
      .fill(fullName);
    await page.locator('input[type="email"]').fill(userEmail);
    await page
      .locator("div")
      .filter({ hasText: /^Telephone$/ })
      .getByRole("textbox")
      .fill(userPhoneNo);
    await page.getByText("Save").click();

    const element = page.locator(
      "#app > div > div.clients > div:nth-last-child(1)"
    );
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  });
});
