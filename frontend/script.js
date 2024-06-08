document.getElementById('orderForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const qty = document.getElementById('qty').value;
    const price = document.getElementById('price').value;

    document.getElementById('loader').classList.remove('hidden');

    try {
        await axios.post('http://localhost:5000/api/orders', {
            qty: parseInt(qty),
            price: parseFloat(price)
        });
        loadOrders();
    } catch (error) {
        console.error('Error placing order', error);
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
});

async function loadOrders() {
    try {
        const pendingResponse = await axios.get('http://localhost:5000/api/pending-orders');
        const completedResponse = await axios.get('http://localhost:5000/api/completed-orders');

        const pendingOrders = pendingResponse.data;
        const completedOrders = completedResponse.data;

        let pendingTableContent = '<tr><th>Buyer Qty</th><th>Buyer Price</th><th>Seller Price</th><th>Seller Qty</th></tr>';
        for (let order of pendingOrders) {
            pendingTableContent += `<tr><td>${order.buyerQty}</td><td>${order.buyerPrice}</td><td>${order.sellerPrice}</td><td>${order.sellerQty}</td></tr>`;
        }

        document.getElementById('pendingOrders').innerHTML = pendingTableContent;

        let completedTableContent = '<tr><th>Price</th><th>Qty</th></tr>';
        for (let order of completedOrders) {
            completedTableContent += `<tr><td>${order.price}</td><td>${order.qty}</td></tr>`;
        }

        document.getElementById('completedOrders').innerHTML = completedTableContent;
    } catch (error) {
        console.error('Error loading orders', error);
    }
}

window.onload = loadOrders;
