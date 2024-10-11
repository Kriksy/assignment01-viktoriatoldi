import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { CreateClientsPage } from "../pages/create_clients.page";

import { ViewClientsPage } from "../pages/view_clients.page";

test.describe("Clients", () => {
  test("Create Client", async ({ page }) => {
    const createClientsPage = new CreateClientsPage(page);
    const viewClientsPage = new ViewClientsPage(page);

    // Browse to Clients
    await createClientsPage.goto();

    // Create fake client data
    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    await createClientsPage.formName.fill(fullName);
    await createClientsPage.formEmail.fill(userEmail);
    await createClientsPage.formPhoneNo.fill(userPhoneNo);
    await createClientsPage.save();

    await expect(page, "Check that the url is correct").toHaveURL(
      /.*\/clients/
    );

    await viewClientsPage.goto();

    const element = viewClientsPage.lastItem;
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);

    // Delete new entry
    await viewClientsPage.deleteLastItem();
  });
});
