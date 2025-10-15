// Based on docs/test-cases/ui/README.md - Test Cases 1-5
// User authentication flows: registration, login, logout

import { TAGS } from '../../../data/constants'
import { expect, test } from '../../../fixtures'
import { verifyPageWithActiveNav, verifyElementTextVisible, navigateToHomeAndVerify, deleteAccountAndVerifyAndContinue } from '../helpers'

test.describe('Authentication Tests', () => {
  test(
    'Test Case 1: Register User',
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE, TAGS.SPEED.SLOW] },
    async ({ pages, testData }) => {
      const user = testData.user.getUser()

      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Verify 'New User Signup!' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.signupForm.title, 'New User Signup!')
      })
      await test.step(`Enter name and email address`, async () => {
        await pages.login.fillSignupForm(user.name, user.email)
      })
      await test.step(`Click 'Signup' button`, async () => {
        await pages.login.signupForm.signupButton.click()
      })
      await test.step(`Verify that 'ENTER ACCOUNT INFORMATION' is visible`, async () => {
        await expect(pages.signup.page).toHaveURL(pages.signup.URL)
        await verifyElementTextVisible(pages.signup.accountForm.title, 'Enter Account Information')
      })
      await test.step(`Fill details: Title, Name, Email, Password, Date of birth`, async () => {
        await (user.title === 'Mr' ? pages.signup.accountForm.titleMr : pages.signup.accountForm.titleMrs).check()
        await pages.signup.accountForm.nameInput.fill(user.name)
        // NOTE: input disabled state prevents email modification during signup
        // await pages.signupLogin.accountInformationForm.emailInput.fill(user.email)
        await pages.signup.accountForm.passwordInput.fill(user.password)
        await pages.signup.accountForm.daySelect.selectOption(user.birth_date)
        await pages.signup.accountForm.monthSelect.selectOption(user.birth_month)
        await pages.signup.accountForm.yearSelect.selectOption(user.birth_year)
      })
      await test.step(`Select checkbox 'Sign up for our newsletter!'`, async () => {
        await pages.signup.accountForm.newsletterCheckbox.check()
      })
      await test.step(`Select checkbox 'Receive special offers from our partners!'`, async () => {
        await pages.signup.accountForm.offersCheckbox.check()
      })
      await test.step(`Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number`, async () => {
        await pages.signup.accountForm.firstNameInput.fill(user.firstname)
        await pages.signup.accountForm.lastNameInput.fill(user.lastname)
        await pages.signup.accountForm.companyInput.fill(user.company)
        await pages.signup.accountForm.address1Input.fill(user.address1)
        await pages.signup.accountForm.address2Input.fill(user.address2)
        await pages.signup.accountForm.countrySelect.selectOption(user.country)
        await pages.signup.accountForm.stateInput.fill(user.state)
        await pages.signup.accountForm.cityInput.fill(user.city)
        await pages.signup.accountForm.zipcodeInput.fill(user.zipcode)
        await pages.signup.accountForm.mobileNumberInput.fill(user.mobile_number)
      })
      await test.step(`Click 'Create Account button'`, async () => {
        await pages.signup.accountForm.createAccountButton.click()
      })
      await test.step(`Verify that 'ACCOUNT CREATED!' is visible`, async () => {
        await expect(pages.accountCreated.page).toHaveURL(pages.accountCreated.URL)
        await verifyElementTextVisible(pages.accountCreated.title, 'Account Created!')
      })
      await test.step(`Click 'Continue' button`, async () => {
        await pages.accountCreated.continueButton.click()
      })
      await test.step(`Verify that 'Logged in as username' is visible`, async () => {
        await verifyPageWithActiveNav(pages.home, pages.home.header.homeLink)
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${user.name}`)
      })
      await deleteAccountAndVerifyAndContinue(pages)
    }
  )

  test(
    `Test Case 2: Login User with correct email and password`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.CRITICAL, TAGS.EXECUTION.SMOKE] },
    async ({ pages, testUser }) => {
      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Verify 'Login to your account' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.loginForm.title, 'Login to your account')
      })
      await test.step(`Enter correct email address and password`, async () => {
        await pages.login.fillLoginForm(testUser.email, testUser.password)
      })
      await test.step(`Click 'login' button`, async () => {
        await pages.login.loginForm.loginButton.click()
      })
      await test.step(`Verify that 'Logged in as username' is visible`, async () => {
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${testUser.name}`)
      })
      await test.step(`Click 'Delete Account' button`, async () => {
        await pages.home.header.deleteAccountLink.click()
      })
      await test.step(`Verify that 'ACCOUNT DELETED!' is visible`, async () => {
        await expect(pages.accountDeleted.page).toHaveURL(pages.accountDeleted.URL)
        await verifyElementTextVisible(pages.accountDeleted.title, 'Account Deleted!')
      })
    }
  )

  test(
    `Test Case 3: Login User with incorrect email and password`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testData }) => {
      const user = testData.user.getUserCredentials()

      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Verify 'Login to your account' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.loginForm.title, 'Login to your account')
      })
      await test.step(`Enter incorrect email address and password`, async () => {
        await pages.login.fillLoginForm(user.email, user.password)
      })
      await test.step(`Click 'login' button`, async () => {
        await pages.login.loginForm.loginButton.click()
      })
      await test.step(`Verify error 'Your email or password is incorrect!' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.loginForm.errorMessage, 'Your email or password is incorrect!')
      })
    }
  )

  test(
    `Test Case 4: Logout User`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.HIGH, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testUser }) => {
      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Verify 'Login to your account' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.loginForm.title, 'Login to your account')
      })
      await test.step(`Enter correct email address and password`, async () => {
        await pages.login.fillLoginForm(testUser.email, testUser.password)
      })
      await test.step(`Click 'login' button`, async () => {
        await pages.login.loginForm.loginButton.click()
      })
      await test.step(`Verify that 'Logged in as username' is visible`, async () => {
        await verifyElementTextVisible(pages.home.header.loggedInAsText, `Logged in as ${testUser.name}`)
      })
      await test.step(`Click 'Logout' button`, async () => {
        await pages.home.header.logoutLink.click()
      })
      await test.step(`Verify that user is navigated to login page`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.loginForm.title, 'Login to your account')
        await verifyElementTextVisible(pages.login.signupForm.title, 'New User Signup!')
      })
    }
  )

  test(
    `Test Case 5: Register User with existing email`,
    { tag: [TAGS.DOC.DOCUMENTED, TAGS.TYPE.UI, TAGS.PRIORITY.MEDIUM, TAGS.EXECUTION.REGRESSION] },
    async ({ pages, testUser }) => {
      await navigateToHomeAndVerify(pages)
      await test.step(`Click on 'Signup / Login' button`, async () => {
        await pages.home.header.loginLink.click()
      })
      await test.step(`Verify 'New User Signup!' is visible`, async () => {
        await verifyPageWithActiveNav(pages.login, pages.login.header.loginLink)
        await verifyElementTextVisible(pages.login.signupForm.title, 'New User Signup!')
      })
      await test.step(`Enter name and already registered email address`, async () => {
        await pages.login.fillSignupForm(testUser.name, testUser.email)
      })
      await test.step(`Click 'Signup' button`, async () => {
        await pages.login.signupForm.signupButton.click()
      })
      await test.step(`Verify error 'Email Address already exist!' is visible`, async () => {
        await verifyPageWithActiveNav(pages.signup, pages.signup.header.loginLink)
        await verifyElementTextVisible(pages.login.signupForm.errorMessage, 'Email Address already exist!')
      })
    }
  )
})
