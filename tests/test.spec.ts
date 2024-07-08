import { test, expect } from '../fixtures/Pom.fixtures';


test('login fails with other credentials and an error message is shown', async ({ page, loginPage  }) => {
  await page.goto('https://platform-staging.reffie.me/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Reffie | Login/);
  // Expects page to have a heading with the name of Reffie.
  await expect(page.getByText('Reffie')).toBeVisible();
  // click sign in button without fill in the form
  await loginPage.continue.click()
  //error message is shown
    const validationMessage = await loginPage.emailAddress.evaluate((element) => {
      const input = element as HTMLInputElement
      return input.validationMessage
    })
    expect(validationMessage).toContain("Please fill in this field")
  // Login with incorrect credencials
  await loginPage.doLogIn("qa_interview@reffie.me", "QaEngineerInter2024-06-20")
  //Expects schema validation error message is shown
  await expect(loginPage.validationError).toBeVisible();
  await expect(loginPage.validationError).toHaveText('Either the user does not exist or the password is incorrect');
});
test('able to login with the right credentials', async ({ page, loginPage  }) => {
  await page.goto('https://platform-staging.reffie.me/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Reffie | Login/);
  // Expects page to have a heading with the name of Reffie.
  await expect(page.getByText('Reffie')).toBeVisible();
  // click sign in button without fill in the form
  await loginPage.continue.click()
  //error message is shown
    const validationMessage = await loginPage.emailAddress.evaluate((element) => {
      const input = element as HTMLInputElement
      return input.validationMessage
    })
    expect(validationMessage).toContain("Please fill in this field")
  // Login with incorrect credencials
  await loginPage.doLogIn("qa_engineer_interview@reffie.me", "QaEngineerInterview2024-06-20")
  //Expects you should be able to navigate to the conversations page. 
  await page.getByRole('button', { name: 'Conversations' }).isVisible()
  //Select any lead in “Active” category
  await page.getByText('Active').first().click();
  //Clicking the checkbox 
  await page.getByRole('cell').first().hover();
  await page.getByRole('row').first().getByRole('checkbox').hover();
  await page.getByRole('row').first().getByRole('checkbox').check();
  //Expects should open a drawer on the bottom
  await page.getByRole('button', { name: 'Mark Unread' }).isVisible()
  await page.getByRole('button', { name: 'Edit Lead' }).isVisible()
  await page.getByRole('button', { name: 'Archive' }).isVisible()
  await page.locator('button:nth-child(5)').isVisible()
});
