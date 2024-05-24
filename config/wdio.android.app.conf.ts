import { join } from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: 'Android',
            maxInstances: 1,
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // 'appium:fullReset': true,
            //
            // NOTE: Change this name according to the Emulator you have created on your local machine
            'appium:deviceName': 'Pixel 7 Pro API 34',
            //
            // NOTE: Change this version according to the Emulator you have created on your local machine
            'appium:platformVersion': '14.0',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',

            // The path to the app
            'appium:app': join(
                process.cwd(),
                'apps',
                `${process.env.ENV}`,
                //
                // NOTE: Change this name according to the app version you downloaded
                'Elsie-STAG.apk',
            ),
            // 'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
            'appium:newCommandTimeout': 240,
        },
    ],
};