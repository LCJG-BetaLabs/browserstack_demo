import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: driver.isAndroid
    ? '*//android.widget.EditText[@resource-id="userNameInput"]'
    : "~Lane Crawford",
  EMAIL_INPUT: driver.isAndroid
    ? '*//android.widget.EditText[@resource-id="userNameInput"]'
    : "class name:XCUIElementTypeTextField",
  PASSWORD_INPUT: driver.isAndroid
    ? '*//android.widget.EditText[@resource-id="passwordInput"]'
    : "class name:XCUIElementTypeSecureTextField",
  SIGNIN_BUTTON: driver.isAndroid
    ? "class name:android.widget.Button"
    : "class name:XCUIElementTypeButton",
  ERROR_MESSAGE: driver.isAndroid
    ? '*//android.view.View[@resource-id="errorText"]'
    : "~Incorrect user ID or password. Type the correct user ID and password, and try again.",
};

class IjamLoginScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }

  get screen() {
    return $(SELECTORS.SCREEN);
  }

  private get email() {
    return $(SELECTORS.EMAIL_INPUT);
  }
  private get password() {
    return $(SELECTORS.PASSWORD_INPUT);
  }
  private get signInButton() {
    return $(SELECTORS.SIGNIN_BUTTON);
  }
  private get errorMessage() {
    return $(SELECTORS.ERROR_MESSAGE);
  }

  async waitforErrorMessageDisplayed() {
    return $(SELECTORS.ERROR_MESSAGE).waitForDisplayed();
  }
  async tapOnEmail() {
    await this.email.click();
  }
  async tapOnPassword() {
    await this.password.click();
  }

  async inputEmail(username: string) {
    await this.tapOnEmail();
    await this.email.setValue(username);
    if (await driver.isKeyboardShown()) {
      /**
       * Normally we would hide the keyboard with this command `driver.hideKeyboard()`, but there is an issue for hiding the keyboard
       * on iOS when using the command. You will get an error like below
       *
       *  Request failed with status 400 due to Error Domain=com.facebook.WebDriverAgent Code=1 "The keyboard on iPhone cannot be
       *  dismissed because of a known XCTest issue. Try to dismiss it in the way supported by your application under test."
       *  UserInfo={NSLocalizedDescription=The keyboard on iPhone cannot be dismissed because of a known XCTest issue. Try to dismiss
       *  it in the way supported by your application under test.}
       *
       * That's why we click outside of the keyboard.
       */
      if (driver.isIOS) {
        await $("~Go").click();
      }
    }
  }

  async inputPassword(password: string) {
    await this.tapOnPassword();
    await this.password.setValue(password);
    if (await driver.isKeyboardShown()) {
      /**
       * Normally we would hide the keyboard with this command `driver.hideKeyboard()`, but there is an issue for hiding the keyboard
       * on iOS when using the command. You will get an error like below
       *
       *  Request failed with status 400 due to Error Domain=com.facebook.WebDriverAgent Code=1 "The keyboard on iPhone cannot be
       *  dismissed because of a known XCTest issue. Try to dismiss it in the way supported by your application under test."
       *  UserInfo={NSLocalizedDescription=The keyboard on iPhone cannot be dismissed because of a known XCTest issue. Try to dismiss
       *  it in the way supported by your application under test.}
       *
       * That's why we click outside of the keyboard.
       */
      if (driver.isIOS) {
        await $("~Go").click();
      }
    }
  }

  async submitLoginForm({
    username,
    password,
  }: {
    username?: string;
    password?: string;
  }) {
    if (username) {
      await this.inputEmail(username);
    }
    if (password) {
      await this.inputPassword(password);
    }
    if (driver.isAndroid) {
      await this.signInButton.click();
    }
  }
}

export default new IjamLoginScreen();
