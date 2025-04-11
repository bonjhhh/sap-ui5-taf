export default class BasePage {
    /**
     * Validates the selector and retrieves the element.
     * @param selector - The selector of the element.
     * @returns The WebdriverIO element.
     */
    private async getElement(selector: string): Promise<WebdriverIO.Element> {
        if (!selector || typeof selector !== 'string') {
            throw new Error(`Invalid selector: ${selector}`);
        }
        try {
            const element = await $(selector);
            return element;
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
            throw new Error(`Failed to locate element with selector: ${selector}. Error: ${errorMessage}`);
        }
    }

    /**
     * Opens a specified URL in the browser.
     * @param url - The URL to open.
     */
    async open(url: string): Promise<void> {
        await browser.url(url);
    }

    /**
     * Clicks on an element specified by the selector.
     * @param selector - The selector of the element to click.
     */
    async click(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.waitForClickable({ timeout: 5000 });
        await element.click();
    }

    /**
     * Sets a value in an input field specified by the selector.
     * @param selector - The selector of the input field.
     * @param value - The value to set.
     */
    async setValue(selector: string, value: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.setValue(value);
    }

    /**
     * Retrieves the text content of an element specified by the selector.
     * @param selector - The selector of the element.
     * @returns The text content of the element.
     */
    async getText(selector: string): Promise<string> {
        const element = await this.getElement(selector);
        await element.waitForDisplayed({ timeout: 5000 });
        return await element.getText();
    }

    /**
     * Checks if an element specified by the selector is displayed.
     * @param selector - The selector of the element.
     * @returns True if the element is displayed, false otherwise.
     */
    async isDisplayed(selector: string): Promise<boolean> {
        try {
            const element = await this.getElement(selector);
            return await element.isDisplayed();
        } catch {
            return false;
        }
    }
}