import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: driver.isAndroid ? "~Sign In" : "~onboardingLayoutScreen",

  SIGNIN_BUTTON: driver.isAndroid ? "~Sign In" : "~bottomPageSwiperButton",
};

class OnboardScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }
  private get signInButton() {
    return $(SELECTORS.SIGNIN_BUTTON);
  }

  async tapOnSignInButton() {
    await this.signInButton.click();
  }
}

export default new OnboardScreen();
