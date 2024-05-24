import { Given, When, Then, DataTable } from '@wdio/cucumber-framework';
import OnboardSrceen from '../screens/OnboardSrceen.js';
import MSLoginScreen from '../screens/MSLoginScreen.js';
import IjamLoginScreen from '../screens/IjamLoginScreen.js';
import OTCScreen from '../screens/OTCScreen.js';
import StaySignInScreen from '../screens/StaySignInScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import { getTOTP } from '../helpers/Utils.js';


Given('the user is on the login screen', async () => {
    await OnboardSrceen.waitForIsShown()
});

When('the user login with Microsoft account', async (credential: DataTable) => {
    // [When] Describes the action or event that triggers the scenario.
    // <DataTable> argument is detected:
    // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
    // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
    await OnboardSrceen.tapOnSignInButton()
    await MSLoginScreen.waitForIsShown()
    const username = credential.hashes()[0].username ? credential.hashes()[0].username : process.env.MANAGER_USERNAME
    const password = credential.hashes()[0].password ? credential.hashes()[0].password : process.env.MANAGER_PASSWORD
    await MSLoginScreen.submitMSEmail({ username: username })
    await IjamLoginScreen.waitForIsShown()
    await IjamLoginScreen.submitLoginForm({ username: username, password: password })

    if (!await IjamLoginScreen.isErrorMessageDisplayed()) {
        const totp = getTOTP("Microsoft", process.env.MANAGER_USERNAME, "SHA1", 6, 30, process.env.MANAGER_SECRET)
        if (driver.isAndroid) {
            await driver.switchContext("WEBVIEW_com.betalabs.elsie.staging")
        }
        await OTCScreen.submitOTC({ OTC: totp })
        await StaySignInScreen.waitForIsShown()
        await StaySignInScreen.tapOnYesButton()
        if (driver.isAndroid) {
            await driver.switchContext("NATIVE_APP")
        }
    }
});

Then('the login fail', async () => {
    // [When] Describes the action or event that triggers the scenario.
    await IjamLoginScreen.waitForIsShown()
});

Then('the user should see a login failure message', async () => {
    // [Then] Describes the expected outcome or result of the scenario.
    expect(await IjamLoginScreen.isErrorMessageDisplayed()).toBeTruthy()
});

Then('the user should be prompted to retry login', async () => {
    // [Then] Describes the expected outcome or result of the scenario.
    await IjamLoginScreen.waitForIsShown()
});



Then('the user should be directed to the home page', async () => {
    // [Then] Describes the expected outcome or result of the scenario.
    expect(await HomeScreen.waitForIsShown()).toBeTruthy()
});