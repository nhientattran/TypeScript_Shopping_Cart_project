"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function createUser(name, age) {
    return {
        id: (0, uuid_1.v4)(),
        name: name,
        age: age,
        cart: []
    };
}
function createItem(name, price, quantity, description) {
    return {
        id: (0, uuid_1.v4)(),
        name: name,
        price: price,
        quantity: quantity,
        description: description
    };
}
function addToCart(item, user) {
    user.cart.push(item);
    console.log(`${item.name} has been added to ${user.name}'s cart`);
}
function removeFromCart(user, item) {
    user.cart = user.cart.filter((cartItem) => cartItem.id != item.id);
}
function removeQuantityFromCart(item, quantity, user) {
    const existItem = user.cart.find((cartItem) => cartItem.id === item.id);
    if (existItem) {
        if (existItem.quantity <= quantity) {
            removeFromCart(user, existItem);
        }
        else {
            existItem.quantity -= quantity;
        }
    }
}
function cartTotal(user) {
    let totalPrice = 0;
    for (let item of user.cart) {
        totalPrice += (item.price * item.quantity);
    }
    return totalPrice;
}
function printCart(user) {
    console.log(`Items in ${user.name}'s cart: `);
    for (let item of user.cart) {
        console.log(`- ${item.quantity} ${item.name}: $${item.price}`);
    }
}
// Driver Code
const user1 = createUser('Nhien', 27);
const itemA = createItem('item A', 10, 1, 'item A description');
const itemB = createItem('item B', 10, 1, 'item B description');
const itemC = createItem('item C', 10, 1, 'item C description');
addToCart(itemA, user1);
printCart(user1);
cartTotal(user1);
addToCart(itemB, user1);
addToCart(itemC, user1);
printCart(user1);
removeFromCart(user1, itemB);
removeFromCart(user1, itemC);
removeQuantityFromCart(itemA, 1, user1);
printCart(user1);
cartTotal(user1);
