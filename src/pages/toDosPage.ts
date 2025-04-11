import BasePage from '../utils/basePage';

class ToDosPage extends BasePage {
    private inputField = 'input[placeholder="What needs to be done?"]';
    private todoListItems = '.sapMListItems .sapMText';
    private clearCompletedButton = 'button[title="Clear completed"]';

    async addTodoItem(todoText: string): Promise<void> {
        await this.setValue(this.inputField, todoText);
        await browser.keys(['Enter']); // Ensure 'Enter' is sent as an array
    }

    async getTodoItems(): Promise<string[]> {
        const items = await $$(this.todoListItems);
        if (!items || items.length === 0) {
            return [];
        }
    
        const texts: string[] = [];
        for (const item of items) {
            texts.push(await item.getText());
        }
    
        return texts;
    }
    
    
    async isTodoItemDisplayed(todoText: string): Promise<boolean> {
        const items = await this.getTodoItems();
        return items.includes(todoText);
    }    

    async clearCompleted(): Promise<void> {
        if (await this.isDisplayed(this.clearCompletedButton)) {
            await this.click(this.clearCompletedButton);
        }
    }
}

export default new ToDosPage();