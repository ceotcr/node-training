/*
3. Shopping Cart Processor Given a cart array of products (each with price, quantity): ● Calculate total price ● Apply a 10% discount if total > 100 ● Return the final amount
*/

const cart = [
    { price: 10, quantity: 2 },
    { price: 20, quantity: 1 },
    { price: 5, quantity: 5 },
    { price: 50, quantity: 1 },
]

const calcSubtotal = (cart) => {
    return cart.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
}

const applyDiscount = (subtotal) => {
    return subtotal > 100 ? subtotal * 0.9 : subtotal;
}

const calcTotal = (cart) => {
    const subtotal = calcSubtotal(cart);
    return applyDiscount(subtotal);
}

const total = calcTotal(cart);
console.log('Subtotal: $', calcSubtotal(cart));
console.log('Discount: $', calcSubtotal(cart) - total);
console.log('Discount applied: ', calcSubtotal(cart) > total ? 'Yes' : 'No');
console.log('Discount percentage: ', calcSubtotal(cart) > total ? '10%' : '0%');
console.log('Final amount: $', total);

/*
> node .\p3.js
Subtotal: $ 115
Discount: $ 11.5
Discount applied:  Yes
Discount percentage:  10%
Final amount: $ 103.5
*/