import { test as teardown, expect } from "@playwright/test";

teardown("Logout", async ({ page }) => {
  await page.goto(`/`);
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(
    page,
    "Check that the url is /login after clicking logout"
  ).toHaveURL(/.*\/login/);
});
