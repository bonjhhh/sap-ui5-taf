import ToDosPage from '../pages/toDosPage';

describe('SAPUI5 Todos App', () => {
    const appUrl =
        'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/TsTodos/webapp/index.html?sap-ui-theme=sap_horizon';

    before(async () => {
        await ToDosPage.open(appUrl);
    });

    it('should add a new todo item', async () => {
        const todoText = 'Learn WebdriverIO';
        await ToDosPage.addTodoItem(todoText);

        const items = await ToDosPage.getTodoItems();
        expect(items).toContain(todoText);
    });

    it('should clear completed items', async () => {
        const todoText = 'Complete this test';
        await ToDosPage.addTodoItem(todoText);

        // Simulate marking the item as completed (this depends on the app's behavior)
        const items = await ToDosPage.getTodoItems();
        expect(items).toContain(todoText);

        await ToDosPage.clearCompleted();
        const updatedItems = await ToDosPage.getTodoItems();
        expect(updatedItems).not.toContain(todoText);
    });
});