export default class BasePage {
    async open(url: string): Promise<void> {
        await browser.url(url); // Use the globally available browser object
    }

    async click(selector: string): Promise<void> {
        const element = await $(selector);
        await element.waitForClickable({ timeout: 5000 });
        await element.click();
    }

    async setValue(selector: string, value: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 5000 }); // Ensure the element is visible
        await element.setValue(value);
    }

    async getText(selector: string): Promise<string> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 5000 }); // Ensure the element is visible
        return await element.getText();
    }

    async isDisplayed(selector: string): Promise<boolean> {
        try {
            const element = await $(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}