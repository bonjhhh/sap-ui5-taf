import BasePage from '../utils/basePage';

class ToDosPage extends BasePage {
    private inputField = '#container-TsTodos---app--addTodoItemInput-inner';
    private todoListItems = '#container-TsTodos---app--todoList-listUl .sapMText';
    private clearCompletedButton = '#container-TsTodos---app--clearCompleted-footer';
    private filterButton = (filterName: string) => `//li[@role="option"]//div[text()="${filterName}"]`;

    /**
     * Adds a new todo item.
     * @param todoText - The text of the todo item to add.
     */
    async addTodoItem(todoText: string): Promise<void> {
        await this.setValue(this.inputField, todoText);
        await browser.keys(['Enter']);
    }

/**
 * Retrieves the list of todo items.
 * @returns An array of todo item texts.
 */
async getTodoItems(): Promise<string[]> {
    console.log('Looking for todo items with selector:', this.todoListItems);
    try {
        const items = await $$(this.todoListItems);
        console.log(`Found ${items.length} todo items`);
        
        if (items.length === 0) {
            console.log('No todo items found');
            return [];
        }
        
        const result: string[] = [];
        for (const item of items) {
            try {
                const text = await item.getText();
                console.log('Got text:', text);
                result.push(text);
            } catch (e) {
                console.error('Error getting text from item:', e);
            }
        }
        
        return result;
    } catch (e) {
        console.error('Error in getTodoItems:', e);
        return [];
    }
}

    /**
     * Clears completed todo items if the "Clear completed" button is displayed.
     */
    async clearCompleted(): Promise<void> {
        if (await this.isDisplayed(this.clearCompletedButton)) {
            await this.click(this.clearCompletedButton);
        }
    }

    /**
     * Clicks on a filter button (e.g., "All," "Active," "Completed").
     * @param filterName - The name of the filter to click.
     */
    async clickFilter(filterName: string): Promise<void> {
        const filterSelector = this.filterButton(filterName);
        console.log(`Using selector: ${filterSelector}`); // Debug log
        await this.click(filterSelector);
    }
}

export default new ToDosPage();