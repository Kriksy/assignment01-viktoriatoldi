import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { LoginPage } from "./pages/login.page";
import { DashboardPage } from "./pages/dashboard.page";

require("dotenv").config();

test.describe("Clients", () => {
  test("Test case: Create New Cient", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );

    await page.waitForTimeout(2000); // Wait for login to succeed

    // START: Test dashboard page

    await expect(
      page.url(),
      "Check that we are on http://localhost:3000/"
    ).toBe("http://localhost:3000/"); //assertion

    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" }),
      "Check that the heading is now Tester Hotel Overview"
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Tester Hotel" }),
      "Check that the banner contains 'Tester Hotel'"
    ).toBeVisible(); //assertion

    //assertion
    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" }),
      "Check that dashboard contain 'Test Hotel Overview' heading"
    ).toBeVisible();

    // END: Test dashboard page

    // Navigate to clients view

    // Saving page.locator as viewClientButton in dashboard.page.ts
    // await page.locator("#app > div > div > div:nth-child(2) > a").click();
    await dashboardPage.viewClientButton.click();

    await page.waitForTimeout(2000); // Wait for click to succeed

    await page.getByRole("link", { name: "Create Client" }).click();
    await page.waitForTimeout(2000); // Wait for click to succeed

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

  test("Test case: Edit Client", async ({ page }) => {
    //login steps
    await page.goto("http://localhost:3000");
  });

  test("Test case: Delete Client", async ({ page }) => {
    //login steps
    await page.goto("http://localhost:3000");
  });
});
