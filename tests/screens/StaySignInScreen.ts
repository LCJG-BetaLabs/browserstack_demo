import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: driver.isAndroid
    ? '*//img[@id="bannerLogo"]'
    : "~Organization banner logo",
  YES_BUTTON: driver.isAndroid ? '*//input[@id="idSIButton9"]' : "~Yes",
  NO_BUTTON: driver.isAndroid ? '*//input[@id="idBtn_Back"]' : "~No",
};

class StaySignInScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }

  get screen() {
    return $(SELECTORS.SCREEN);
  }
  private get yesButton() {
    return $(SELECTORS.YES_BUTTON);
  }
  private get noButton() {
    return $(SELECTORS.NO_BUTTON);
  }

  async tapOnYesButton() {
    await this.yesButton.click();
  }

  async tapOnNoButton() {
    await this.noButton.click();
  }
}

export default new StaySignInScreen();
