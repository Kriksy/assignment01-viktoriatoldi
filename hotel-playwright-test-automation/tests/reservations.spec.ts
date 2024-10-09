import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateReservationsPage } from "../pages/create_reservations.page";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Reservations", () => {
  test("Create Reservation", async ({ page }) => {
    const createReservationsPage = new CreateReservationsPage(page);
    const dashboardPage = new DashboardPage(page);

    // Browse to Dashboard page
    await dashboardPage.goto();

    // Browse to Rooms page from Dashboard page
    await dashboardPage.viewReservationsButton.click();

    // Check Header for page
    await expect(
      page.getByRole("heading", { name: "Reservations" }),
      "Check that the heading is now 'Reservations'"
    ).toBeVisible();

    // Browse to Create page using Button
    await page.getByRole("link", { name: "Create Reservation" }).click();

    // Check URL
    await page.waitForURL(`/reservation/new`);

    // Check Header for Create page
    await expect(
      page.getByText("New Reservation"),
      "Check current page title to be New Reservation"
    ).toBeVisible();

    // Create fake data
    const start = "2024-09-01";
    const end = "2024-09-20";

    await page
      .locator("div")
      .filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ })
      .getByPlaceholder("YYYY-MM-DD")
      .fill(start);

    await page
      .locator("div")
      .filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ })
      .getByPlaceholder("YYYY-MM-DD")
      .fill(end);

    await page
      .locator("div")
      .filter({
        hasText: /^Client/,
      })
      .getByRole("combobox")
      .selectOption("2"); // Mikael Eriksson (#02)

    await page
      .locator("div")
      .filter({
        hasText: /^Room/,
      })
      .getByRole("combobox")
      .selectOption("3"); // Floor 1, Room 102

    await page
      .locator("div")
      .filter({ hasText: /^Bill/ })
      .getByRole("combobox")
      .selectOption("1"); // ID: 1

    await page.getByText("Save").click();

    // Check URL after "Save" button click
    await page.waitForURL(`/reservations`);

    // Get last item in the list
    const element = page.locator(
      "#app > div > div.reservations > div:nth-last-child(1)"
    );

    // Click on "..."
    await element.locator("div.action").click();

    // Delete new entry
    const deleteElement = element.getByText("Delete");
    await deleteElement.click();
  });
});
