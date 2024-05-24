import AppScreen from './AppScreen.js';

const SELECTORS = {
    SCREEN: driver.isAndroid
        ? '*//android.webkit.WebView'
        : '~Organization banner logo',
    ERROR_MESSAGE: driver.isAndroid
        ? '*//span[@id="idSpan_SAOTCC_Error_OTC"]'
        : "~You didn't enter the expected verification code. Please try again.",
    OTC_INPUT: driver.isAndroid
        ? '*//input[@name="otc"]'
        : 'class name:XCUIElementTypeTextField',
    VERIFY_BUTTON: driver.isAndroid
        ? '*//input[@id="idSubmit_SAOTCC_Continue"]'
        : '~Verify',
    CANCEL_BUTTON: driver.isAndroid
        ? '*//input[@id="idBtn_Back"]'
        : "~Cancel"
};

class OTCScreen extends AppScreen {
    constructor() {
        super(SELECTORS.SCREEN);
    }

    get screen() { return $(SELECTORS.SCREEN); }
    private get errorMessage() { return $(SELECTORS.ERROR_MESSAGE); }
    private get OTC() { return $(SELECTORS.OTC_INPUT); }
    private get verifyButton() { return $(SELECTORS.VERIFY_BUTTON); }
    private get cancelButton() { return $(SELECTORS.CANCEL_BUTTON); }

    async isErrorMessageDisplayed() {
        return this.errorMessage.isDisplayed();
    }

    async tapOnVerifyButton() {
        await this.verifyButton.click();
    }

    async tapOnCancelButton() {
        await this.cancelButton.click();
    }

    async tapOnOTC() {
        await this.OTC.click();
    }


    async submitOTC({ OTC }: { OTC: string }) {
        await this.tapOnOTC()
        await this.OTC.setValue(OTC);

        // if (await driver.isKeyboardShown()) {
        //     /**
        //      * Normally we would hide the keyboard with this command `driver.hideKeyboard()`, but there is an issue for hiding the keyboard
        //      * on iOS when using the command. You will get an error like below
        //      *
        //      *  Request failed with status 400 due to Error Domain=com.facebook.WebDriverAgent Code=1 "The keyboard on iPhone cannot be
        //      *  dismissed because of a known XCTest issue. Try to dismiss it in the way supported by your application under test."
        //      *  UserInfo={NSLocalizedDescription=The keyboard on iPhone cannot be dismissed because of a known XCTest issue. Try to dismiss
        //      *  it in the way supported by your application under test.}
        //      *
        //      * That's why we click outside of the keyboard.
        //      */
        //     await $(SELECTORS.SCREEN).click();
        // }
        await this.verifyButton.click();
    }

}

export default new OTCScreen();