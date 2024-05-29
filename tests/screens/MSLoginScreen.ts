import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: driver.isAndroid
    ? "class name:android.widget.EditText"
    : "~Microsoft",
  ERROR_MESSAGE: driver.isAndroid
    ? '*//android.widget.TextView[@resource-id="usernameError"]'
    : "~Enter a valid email address or phone number.",
  MS_EMAIL_INPUT: driver.isAndroid
    ? "class name:android.widget.EditText"
    : "~Enter your email or phone",
  NEXT_BUTTON: driver.isAndroid
    ? '*//android.widget.Button[@resource-id="idSIButton9"]'
    : "~Next",
};

class MSLoginScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }

  get screen() {
    return $(SELECTORS.SCREEN);
  }

  private get MSEmail() {
    return $(SELECTORS.MS_EMAIL_INPUT);
  }
  private get nextButton() {
    return $(SELECTORS.NEXT_BUTTON);
  }
  private get errorMessage() {
    return $(SELECTORS.ERROR_MESSAGE);
  }

  async isErrorMessageDisplayed() {
    return this.errorMessage.isDisplayed();
  }

  async tapOnMSEmail() {
    await this.MSEmail.click();
  }

  async tapOnNextButton() {
    await this.nextButton.click();
  }

  async submitMSEmail({ username }: { username?: string }) {
    await this.tapOnMSEmail();
    await this.MSEmail.setValue(username ?? "");

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
      } else {
        await this.nextButton.click();
      }
    } else {
      await this.nextButton.click();
    }
  }
}

export default new MSLoginScreen();
