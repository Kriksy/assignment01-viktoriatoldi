import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { LoginPage } from "./pages/login.page";
import { DashboardPage } from "./pages/dashboard.page";

require("dotenv").config();

test.beforeAll(async () => {
  console.log("Before tests");
});

test.afterAll(async () => {
  console.log("After tests");
});

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("http://localhost:3000/");
});

test.describe("Rooms", () => {
  test("Test case: Create New Room", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(
      `${process.env.TEST_USERNAME}`,
      `${process.env.TEST_PASSWORD}`
    );

    await page.waitForTimeout(2000); // Wait for login to succeed

    // Navigate to rooms view
    await dashboardPage.viewRoomsButton.click();
    // Get "Create Room" Button Locator and Click
    await page.getByRole("link", { name: "Create Room" }).click();

    await expect(
      page.getByText("New Room"),
      "Check current page title to be New Room"
    ).toBeVisible();

    // Create new fake room data
    const maxFloorNumber = 20;
    const maxRoomNumber = 20;
    const minPrice = 3000;
    const maxPrice = 10000000;
    const category = faker.helpers.arrayElement(["double", "single", "twin"]);
    const roomNumber = faker.number.int({ max: maxRoomNumber }).toString();
    const floorNumber = faker.number.int({ max: maxFloorNumber }).toString();
    const available = faker.datatype.boolean();
    const price = faker.number.int({ min: minPrice, max: maxPrice }).toString();
    const featureCount = faker.number.int({ min: 1, max: 4 });
    // const features = Array(featureCount).fill(
    //   () => faker.helpers.arrayElement([
    //     "balcony",
    //     "ensuite",
    //     "sea view",
    //     "penthouse",
    //   ])
    // )

    const features = faker.helpers.arrayElement([
      "balcony",
      "ensuite",
      "sea view",
      "penthouse",
    ]);

    // Fill Category
    await page.locator("label").filter({ hasText: /^Category$/ });
    await page
      //.locator("div")
      //.filter({ hasText: /^Category$/ })
      .getByRole("combobox")
      .selectOption(category);
    // Fill Number
    await page
      .locator("div")
      .filter({ hasText: /^Number$/ })
      .getByRole("spinbutton")
      .fill(roomNumber);
    // Fill Floor
    await page
      .locator("div")
      .filter({ hasText: /^Floor$/ })
      .getByRole("spinbutton")
      .fill(floorNumber);

    // Available -- Remove when creating room?
    if (available) {
      await page.locator(".checkbox").click();
    }

    // Fill Price
    await page
      .locator("div")
      .filter({ hasText: /^Price$/ })
      .getByRole("spinbutton")
      .fill(price);

    // Fill Features
    await page
      //.locator("div")
      //.filter({ hasText: /^Features$/ })
      .getByRole("listbox")
      .selectOption(features);
    await page.getByText("Save").click();

    // Get last element in the list
    const element = page.locator(
      "#app > div > div.rooms > div:nth-last-child(1)"
    );

    // Check card information. Example: " 20 Floor 5, Room 20Category: doubleAvailable: Price: 5080137kr Features:  ensuite ";
    await expect(element, "Check category").toContainText(
      `Category: ${category}`
    );
    await expect(element, "Check room").toContainText(`Room ${roomNumber}`);
    await expect(element, "Check floor").toContainText(`Floor ${floorNumber}`);
    await expect(element, "Check price").toContainText(`Price: ${price}kr`);
    await expect(element, "Check features").toContainText(
      `Features: ${features}`
    );
    await expect(element, "Check available").toContainText(
      `Available: ${available ? "true" : ""}`
    );
  });
});
