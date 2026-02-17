import { test, expect } from '@playwright/test';

const API_URL = process.env.API_URL || 'http://localhost:3001g';

test.beforeEach(async ({ request }) => {
    expect(API_URL).toBeDefined();
    console.log('Usando API_URL:', API_URL);

    const response = await request.post(`${API_URL}/api/testing/reset`);
    expect(response.ok()).toBeTruthy();
});

test('deve listar o usuário criado pelo seed no banco', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByText('Tester')).toBeVisible();
});

test('deve cadastrar um novo usuário e persistir na lista', async ({ page }) => {
    const email = `user${Date.now()}@email.com`;

    await page.goto('http://localhost:3000');


    await page.getByPlaceholder('Nome').fill('Novo Usuario');
    await page.getByPlaceholder('Email').fill(email);
    await page.getByRole('button', { name: 'Adicionar' }).click();

    await expect(page.getByText('Novo Usuario')).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
});