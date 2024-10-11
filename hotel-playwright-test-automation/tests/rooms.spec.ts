import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateRoomsPage } from "../pages/create_rooms.page";
import { ViewRoomsPage } from "../pages/view_rooms.page";

test.describe("Rooms", () => {
  test("View Rooms", async ({ page }) => {
    const viewRoomsPage = new ViewRoomsPage(page);
    await viewRoomsPage.goto();
    await expect(page, "Check that the url is correct").toHaveURL(/.*\/rooms/);

    await viewRoomsPage.gotoCreateRoom();
  });

  test("Create Room", async ({ page }) => {
    const createRoomsPage = new CreateRoomsPage(page);

    // Browse to page
    await createRoomsPage.goto();

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
      "balcony",
      "ensuite",
      "sea view",
      "penthouse",
    ]);

    // Fill form with fake data
    await createRoomsPage.formRoomCategory.selectOption(roomCategory);

    await createRoomsPage.formRoomNumber.fill(roomNumber);

    await createRoomsPage.formRoomFloor.fill(roomFloor);

    await createRoomsPage.formRoomPrice.fill(roomPrice);

    await createRoomsPage.formRoomFeatures.selectOption(roomFeatures);

    await createRoomsPage.save();

    await expect(page, "Check that the url is correct").toHaveURL(/.*\/rooms/);

    const viewRoomsPage = new ViewRoomsPage(page);
    await viewRoomsPage.goto();

    const element = viewRoomsPage.lastItem;

    // Check last item to contain the fake data
    await expect(element).toContainText(roomCategory);
    await expect(element).toContainText(roomNumber);
    await expect(element).toContainText(roomFloor);
    await expect(element).toContainText(roomPrice);
    await expect(element).toContainText(roomFeatures);

    // Delete new entry
    await viewRoomsPage.deleteLastItem();
  });
});
