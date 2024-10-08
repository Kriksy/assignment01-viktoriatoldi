import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateRoomsPage } from "../pages/create_rooms.page";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Rooms", () => {
  test("Create Room", async ({ page }) => {
    const createRoomsPage = new CreateRoomsPage(page);
    const dashboardPage = new DashboardPage(page);

    // Browse to Dashboard page
    await dashboardPage.goto();

    // Browse to Rooms page from Dashboard page
    await dashboardPage.viewRoomsButton.click();

    // Check Header for page
    await expect(
      page.getByRole("heading", { name: "Rooms" }),
      "Check that the heading is now 'Rooms'"
    ).toBeVisible();

    // Browse to Create page using Button
    await page.getByRole("link", { name: "Create Room" }).click();

    // Check URL
    await page.waitForURL(`/room/new`);

    // Check Header for Create page
    await expect(
      page.getByText("New Room"),
      "Check current page title to be New Room"
    ).toBeVisible();

    // Create fake data
    const roomCategory = faker.helpers.arrayElement([
      "double",
      "single",
      "twin",
    ]);
    const roomNumber = faker.number.int({ min: 0, max: 1000 }).toString();
    const roomFloor = faker.number.int({ min: 0, max: 1000 }).toString();
    const roomAvailable = faker.datatype.boolean();
    const roomPrice = faker.number.int({ min: 1, max: 1000 }).toString();
    const roomFeatureCount = faker.number.int({ min: 1, max: 4 });
    const roomFeatures = faker.helpers.arrayElement([
      "Balcony",
      "Ensuite",
      "Sea View",
      "Penthouse",
    ]);
    //for (let i = 0; i < roomFeatureCount; i++) {
    //}

    // Fill form with fake data
    await page
      //.locator("div")
      //.filter({ hasText: /^Category$/ })
      .getByRole("combobox")
      .selectOption(roomCategory);

    await page
      .locator("div")
      .filter({ hasText: /^Number$/ })
      .getByRole("spinbutton")
      .fill(roomNumber);

    await page
      .locator("div")
      .filter({ hasText: /^Floor$/ })
      .getByRole("spinbutton")
      .fill(roomFloor);

    await page
      .locator("div")
      .filter({ hasText: /^Price$/ })
      .getByRole("spinbutton")
      .fill(roomPrice);

    await page
      .locator("div")
      .filter({ hasText: /^Features/ })
      .getByRole("listbox")
      .selectOption(roomFeatures);

    await page.getByText("Save").click();

    // Check URL after "Save" button click
    await page.waitForURL(`/rooms`);

    // Get last item in the list
    const element = page.locator(
      "#app > div > div.rooms > div:nth-last-child(1)"
    );
    // Check last item to contain the fake data
    await expect(element).toContainText(roomCategory);

    // TODO: Check last item
    // getByText('Features: balcony', { exact: true })
    // getByText('Category: double').nth(2)
    // getByText('Available:', { exact: true })
    // getByText('Price: 964kr')

    // Click on "..."
    await element.locator("div.action").click();

    // Delete new entry
    const deleteElement = element.getByText("Delete");
    await deleteElement.click();
  });
});
