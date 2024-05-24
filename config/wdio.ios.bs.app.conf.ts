import { config as baseConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    // =============================
    // Browserstack specific config
    // =============================
    // User configuration
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    // Use browserstack service
    services: ['browserstack'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
        {
            // Set URL of the application under test
            'appium:app': process.env.BROWSERSTACK_APP_ID || 'BROWSERSTACK_APP_ID',

            'bstack:options': {
                // Set your BrowserStack config
                debug: true,

                // Specify device and os_version for testing
                device: 'iPhone 14 Pro Max',
                os_version: '16',

                // Set other BrowserStack capabilities
                projectName: 'wdio-test-project',
                buildName: 'ios',
                sessionName: 'wdio-test'
            }
        },
    ] as WebdriverIO.Capabilities[],
};