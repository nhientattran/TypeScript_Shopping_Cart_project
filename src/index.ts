import { v4 as uuidv4 } from "uuid";

type itemType = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    description: string
};

type userType = {
    id: string,
    name: string,
    age: number,
    cart: itemType[]
}

function createUser(name: string, age: number):userType {
    return {
        id: uuidv4(),
        name: name,
        age: age,
        cart: []
    }
}

function createItem(name: string, price: number,quantity: number,description: string):itemType{
    return {
        id: uuidv4(),
        name: name,
        price: price,
        quantity: quantity, 
        description: description
    }
}

function addToCart(item: itemType, user: userType):void{
    user.cart.push(item)
    console.log(`${item.name} has been added to ${user.name}'s cart`)
}

function removeFromCart(user: userType, item: itemType):void{
    user.cart = user.cart.filter((cartItem) => cartItem.id != item.id)
} 

function removeQuantityFromCart(item: itemType,quantity: number,user: userType):void{
    const existItem = user.cart.find((cartItem) => cartItem.id === item.id)

    if (existItem) {
        if (existItem.quantity <= quantity){
            removeFromCart(user, existItem)
        } else {
            existItem.quantity -= quantity
        }
    }
}

function cartTotal(user:userType):number{
    let totalPrice = 0

    for (let item of user.cart){
        totalPrice += (item.price*item.quantity)
    }
    return totalPrice
}

function printCart(user:userType):void{
    console.log(`Items in ${user.name}'s cart: `)
    for (let item of user.cart){
        console.log(`- ${item.quantity} ${item.name}: $${item.price}`)
    }
}

// Driver Code
const user1 = createUser('Nhien', 27)

const itemA = createItem('item A', 10, 1, 'item A description')
const itemB = createItem('item B', 10, 1, 'item B description')
const itemC = createItem('item C', 10, 1, 'item C description')

addToCart(itemA, user1)
printCart(user1)

cartTotal(user1)

addToCart(itemB, user1)
addToCart(itemC, user1)

printCart(user1)

removeFromCart(user1, itemB)
removeFromCart(user1, itemC)
removeQuantityFromCart(itemA, 1, user1)

printCart(user1)
cartTotal(user1)
