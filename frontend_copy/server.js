const http = require('http');

const html = `
<button id="add-to-cart">Add</button>
<span class="cart-count">1</span>
`;

http.createServer((req, res) => {
    res.end(html);
}).listen(3000, '0.0.0.0');

console.log('Frontend running');