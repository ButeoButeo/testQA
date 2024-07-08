import { test as baseTest } from '@playwright/test'

import { LogInPage } from '../pages/Login.page'


type Pages = {
  loginPage: LogInPage
}
type Options = { workerStorageState: string }

const test = baseTest.extend<Pages, Options>({
  loginPage: async ({ page }, use) => {
    await use(new LogInPage(page))
  },
})

export const describe = test.describe
export const expect = test.expect

export { test }
