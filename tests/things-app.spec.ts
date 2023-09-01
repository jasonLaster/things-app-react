import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector('[data-test-loaded="true"]');
  await deleteAllTests(page);
});

test.afterEach(async ({ page }) => {
  await deleteAllTests(page);
});

test.describe("Todos", () => {
  test("should allow me to add todo items", async ({ page }) => {
    await page.fill("data-test=new-todo", "buy milk");
    await page.press("data-test=new-todo", "Enter");
    await page.waitForSelector('[data-test="todo-item"]:has-text("buy milk")');
  });
});

async function deleteAllTests(page) {
  await waitForFinishedUpdating(page);
  const todos = await page.$$("li");

  for (const todo of todos) {
    await todo.scrollIntoViewIfNeeded();
    await todo.hover();

    const deleteButton = await todo.$(".delete");
    await deleteButton.click();
    await waitForFinishedUpdating(page);
  }
}

async function waitForFinishedUpdating(page) {
  return page.waitForSelector('[data-test-updating="false"]');
}
