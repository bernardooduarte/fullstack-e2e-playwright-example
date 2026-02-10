import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
    const response = await request.post('http://127.0.0.1:3001/api/testing/reset');

    if (!response.ok()) {
        console.error('Erro no Reset:', response.status(), await response.text());
    }

    expect(response.ok()).toBeTruthy();
});
test('deve listar o usuário criado pelo seed no banco', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Tester')).toBeVisible({ timeout: 10000 });
});

test('deve cadastrar um novo usuário e persistir na lista', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Nome').fill('Novo Usuario');
    await page.getByPlaceholder('Email').fill('novo@email.com');
    await page.getByRole('button', { name: 'Adicionar' }).click();

    await expect(page.getByText('Novo Usuario')).toBeVisible();
    await expect(page.getByText('novo@email.com')).toBeVisible();
});