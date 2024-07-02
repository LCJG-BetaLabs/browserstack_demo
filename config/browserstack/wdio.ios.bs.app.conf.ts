import { config as baseConfig } from "../wdio.shared.conf.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
type CucumberOpts = {
  tags?: string;
};

interface Argv {
  cucumberOpts?: CucumberOpts;
  [key: string]: unknown;
}
const argv = yargs(hideBin(process.argv)).argv as Argv;
const cucumberTagExpression = argv.cucumberOpts?.tags;

export const config: WebdriverIO.Config = {
  ...baseConfig,
  // =============================
  // Browserstack specific config
  // =============================
  // User configuration
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  // Use browserstack service
  services: [
    [
      "browserstack",
      {
        app: process.env.BROWSERSTACK_IOS_APP_ID || "BROWSERSTACK_APP_ID",
        buildIdentifier: "${BUILD_NUMBER}",
        browserstackLocal: true,
        buildName: `${process.env.ENV}_${process.env.VERSION}`,
        projectName: "wdio-test-project",
        buildTag: cucumberTagExpression,
        enablePasscode: true,
        debug: true,
        percy: true,
        percyCaptureMode: 'auto'
      },
    ],
  ],
  maxInstances: 3,
  specs: ["../../tests/features/**/*.feature"],
  // ============
  // Capabilities
  // ============
  // For all capabilities please check
  // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
  capabilities: [
    {
      platformName: "ios",
      "appium:platformVersion": "17.0",
      // Set URL of the application under test
      "bstack:options": {
        // Set your BrowserStack config
        appiumVersion: "2.0.1",
        // Specify device and os_version for testing
        deviceName: "iPhone 15",
        // Set other BrowserStack capabilities
      },
    },
  ] as WebdriverIO.Capabilities[],
};
