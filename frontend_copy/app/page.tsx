import React from 'react';

export default function Home() {
    return (
        <div style={{ padding: '50px', fontFamily: 'Arial' }}>
            <h1>Loja de Teste Agêntico 2026</h1>
            <p>Produto: Smartphone X</p>
            <p>Preço: R$ 999,00</p>

            <button
                data-testid="buy-button"
                className="btn-primary"
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Comprar Agora
            </button>

            <div
                className="cart-count"
                data-testid="cart-count"
                style={{ marginTop: '20px' }}
            >
                Itens no carrinho: 0
            </div>
        </div>
    );
}