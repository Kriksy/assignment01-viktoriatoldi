import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateReservationsPage } from "../pages/create_reservations.page";
import { ViewReservationsPage } from "../pages/view_reservations.page";

test.describe("Reservations", () => {
  test("View Reservations", async ({ page }) => {
    const viewReservationsPage = new ViewReservationsPage(page);
    await viewReservationsPage.goto();
    await expect(page, "Check that the url is correct").toHaveURL(
      /.*\/reservations/
    );

    await viewReservationsPage.gotoCreateReservation();
  });

  test("Create Reservation", async ({ page }) => {
    const createReservationsPage = new CreateReservationsPage(page);

    // Browse to page
    await createReservationsPage.goto();

    // Create fake data
    const start = "2024-09-01";
    const end = "2024-09-20";

    await createReservationsPage.formStartDate.fill(start);
    await createReservationsPage.formEndDate.fill(end);

    await createReservationsPage.formClient.selectOption("2"); // Mikael Eriksson (#02)
    await createReservationsPage.formRoom.selectOption("2"); // Floor 1, Room 102
    await createReservationsPage.formBill.selectOption("1"); // ID: 1

    await createReservationsPage.save();

    await expect(page, "Check that the url is correct").toHaveURL(
      /.*\/reservations/
    );
    const viewReservationsPage = new ViewReservationsPage(page);
    await viewReservationsPage.goto();

    const element = viewReservationsPage.lastItem;
    await expect(element).toContainText("Mikael Eriksson (#02)");
    await expect(element).toContainText("Floor 1, Room 102");
    await expect(element).toContainText("ID: 1");

    // Delete new entry
    await viewReservationsPage.deleteLastItem();
  });
});
