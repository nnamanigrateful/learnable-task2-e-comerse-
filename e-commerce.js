const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const products = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Smartphone', price: 500 },
    { id: 3, name: 'Headphones', price: 150 }
];

let cart = [];

function displayProducts() {
    console.log("\nAvailable Products:");
    products.forEach(product => {
        console.log(`${product.id}. ${product.name} - $${product.price}`);
    });
}

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ product, quantity });
        console.log(`\nAdded ${quantity} ${product.name}(s) to the cart.`);
    } else {
        console.log("\nProduct not found.");
    }
    askForAction();
}

function calculateTotal() {
    return cart.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
}

function checkout() {
    console.log("\nChecking out...");
    console.log("Items purchased:");
    cart.forEach(item => {
        console.log(`${item.quantity} x ${item.product.name} - $${item.product.price}`);
    });
    console.log(`Total: $${calculateTotal()}`);
    rl.close();
}

function askForProductID() {
    rl.question('\nEnter the ID of the product you want to add to the cart: ', (id) => {
        const productId = parseInt(id);
        askForQuantity(productId);
    });
}

function askForQuantity(productId) {
    rl.question('Enter the quantity: ', (quantity) => {
        addToCart(productId, parseInt(quantity));
    });
}

function askForAction() {
    rl.question('\nDo you want to [A]dd a product, or [C]heckout? ', (answer) => {
        if (answer.toLowerCase() === 'a') {
            displayProducts();
            askForProductID();
        } else if (answer.toLowerCase() === 'c') {
            checkout();
        } else {
            console.log("Invalid option, please choose 'A' to add a product or 'C' to checkout.");
            askForAction();
        }
    });
}

console.log('Welcome to our simple eCommerce console app!');
askForAction();
