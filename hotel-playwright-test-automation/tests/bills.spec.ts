import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateBillsPage } from "../pages/create_bills.page";
import { DashboardPage } from "../pages/dashboard.page";

require("dotenv").config();

test.describe("Bills", () => {
  test("Create Bill", async ({ page }) => {
    const createBillsPage = new CreateBillsPage(page);
    const dashboardPage = new DashboardPage(page);

    // Browse to Dashboard page
    await dashboardPage.goto();

    // Browse to Bills page from Dashboard page
    await dashboardPage.viewBillsButton.click();

    // Check Header for page
    await expect(
      page.getByRole("heading", { name: "Bills" }),
      "Check that the heading is now 'Bills'"
    ).toBeVisible();

    // Browse to Create page using Button
    await page.getByRole("link", { name: "Create Bill" }).click();

    // Check URL
    await page.waitForURL(`/bill/new`);

    // Check Header for Create page
    await expect(
      page.getByText("New Bill"),
      "Check current page title to be New Bill"
    ).toBeVisible();

    // Create fake data
    const valueSEK = faker.number.int({ min: 0, max: 1000000000 }).toString();

    // Fill form with fake data
    await page
      //.locator("div")
      //.filter({ hasText: /^VALUE \(SEK\)$/ })
      .getByRole("spinbutton")
      .fill(valueSEK);
    await page.getByText("Save").click();

    // Check URL after "Save" button click
    await page.waitForURL(`/bills`);

    // Get last item in the list
    const element = page.locator(
      "#app > div > div.bills > div:nth-last-child(1)"
    );
    // Check last item to contain the fake data
    await expect(element).toContainText(valueSEK);

    // Delete new entry

    // ...

    // Perform Logout
    await page.goto(`${process.env.BASE_URL}/`);
    await page.getByRole("button", { name: "Logout" }).click();

    await expect(
      page,
      "Check that the url is /login after clicking logout"
    ).toHaveURL(/.*\/login/);
  });
});
