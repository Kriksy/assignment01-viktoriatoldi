import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateRoomsPage } from "../pages/create_rooms.page";
import { ViewRoomsPage } from "../pages/view_rooms.page";
test.describe("Rooms", () => {
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
      "Balcony",
      "Ensuite",
      "Sea View",
      "Penthouse",
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

    // TODO: Check last item
    // getByText('Features: balcony', { exact: true })
    // getByText('Category: double').nth(2)
    // getByText('Available:', { exact: true })
    // getByText('Price: 964kr')

    // Click on "..."
    await viewRoomsPage.deleteLastItem();
  });
});
