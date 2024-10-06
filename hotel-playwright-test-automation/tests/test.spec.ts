import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateClientsPage } from "../pages/create_clients.page";
import { LoginPage } from "../pages/login.page";

require("dotenv").config();

test.describe("Clients", () => {
  test("Create Client", async ({ page }) => {
    const createClientsPage = new CreateClientsPage(page);

    await page.goto("/");
    await page.waitForURL(`/`);

    // Browse to Clients
    await page.locator("#app > div > div > div:nth-child(2) > a").click();

    await expect(
      page.getByRole("heading", { name: "Clients" }),
      "Check that the heading is now 'Clients'"
    ).toBeVisible();

    // Browse to Clients / Create Client
    await page.getByRole("link", { name: "Create Client" }).click();

    await expect(
      page.getByText("New Client"),
      "Check current page title to be New Client"
    ).toBeVisible();

    // Create fake client data
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

    // Perform Logout
    await page.goto(`${process.env.BASE_URL}/`);
    await page.getByRole("button", { name: "Logout" }).click();

    await expect(
      page,
      "Check that the url is /login after clicking logout"
    ).toHaveURL(/.*\/login/);
  });
});
