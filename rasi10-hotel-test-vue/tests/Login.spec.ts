import { test, expect } from "@playwright/test";

import { LoginPage } from "./pages/login.page";
import { DashboardPage } from "./pages/dashboard.page";

require("dotenv").config();

test.describe("Test suite: Login", () => {
  test("Login and Check Dashboard", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );

    await page.waitForTimeout(1000); // Wait for login to succeed

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
  });
});
