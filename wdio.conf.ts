import { wdi5Config } from 'wdio-ui5-service';
import video from 'wdio-video-reporter';

export const config: wdi5Config = {
    autoCompileOpts: {
        autoCompile: true,
    },
    specs: ['./src/tests/**/*.ts'], // Updated to point to the new test files
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: process.argv.includes('--headless')
                    ? ['--headless=new']
                    : ['--window-size=1440,800'],
            },
            acceptInsecureCerts: true,
        },
    ],
    reporters: [
        'spec',
        [
            'allure', {
                outputDir: './reports/allure-results/',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            }
        ],
        ['video', {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
    ],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/TsTodos/webapp/index.html?sap-ui-theme=sap_horizon',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver', 'ui5'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
};

export default config;