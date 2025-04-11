import ToDosPage from '../pages/toDosPage';

describe('SAPUI5 Todos App', () => {
    const appUrl =
        'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/TsTodos/webapp/index.html?sap-ui-theme=sap_horizon';

    before(async () => {
        // Open the application URL
        await ToDosPage.open(appUrl);
    });

    it('should add a new todo item and validate its status', async () => {
        const todoText = 'Learn WebdriverIO';

        // Add a new todo item
        await ToDosPage.addTodoItem(todoText);

        // Validate the item exists in "All"
        await ToDosPage.clickFilter('All');
        const allItems = await ToDosPage.getTodoItems();
        expect(allItems).toContain(todoText);

        // Validate the item exists in "Active"
        await ToDosPage.clickFilter('Active');
        const activeItems = await ToDosPage.getTodoItems();
        expect(activeItems).toContain(todoText);

        // Validate the item does not exist in "Completed"
        await ToDosPage.clickFilter('Completed');
        const completedItems = await ToDosPage.getTodoItems();
        expect(completedItems).not.toContain(todoText);
    });
});