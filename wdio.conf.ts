import { wdi5Config } from 'wdio-ui5-service';

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
    logLevel: 'error',
    bail: 0,
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver', 'ui5'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
};

export default config;