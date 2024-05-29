import AppScreen from "./AppScreen.js";

const SELECTORS = {
  SCREEN: driver.isAndroid
    ? '*//android.webkit.WebView[@text="Elsie"]'
    : "~banner",
};

class StaySignInScreen extends AppScreen {
  constructor() {
    super(SELECTORS.SCREEN);
  }

  get screen() {
    return $(SELECTORS.SCREEN);
  }
}

export default new StaySignInScreen();
