# Bug_1: There is a bug with adding products to the cart - only the last product is present in the cart

- First I guess it has something to do with the logic in reducer.
- console log some line under `CART_ADD_ITEM` and see what I see
- `state.cartItems.find(x => x.id === item.id)` looks for `id`, but console logging `item` I found there's no `id`, so trace back to payload
- turn out `id` is not added to payload in `addToCart` under `cartAction.js`
- after adding `id` in the payload, new item can be added to the cart

# Bug_2 : There is a bug with adding the same product to the cart multiple times - the quantity does not change;

it must be related to this line:
```
cartItems: state.cartItems.map(x =>
            x.id === existItem.id ? item : x
          ),
```
- There's no quantity change here
- use Redux in devtool to monitor state change
- change the ternary statement into if else block for better reading

- The quantity does add up correctly now, but the checkout page only display 3 items?
- after reloading the app it functions correctly.

Checkout page currency under "Subtotal" is GBP sign, while the products are in $ sign?

# Bug_3: There is a bug with removing products form the cart - the button does not work;

- It must have something to do with `removeItemHandler()` in `CheckoutScreen.js`
- first console.log something out to see if behaviour is correct
- `id` is passed into `removeItemHandler()` correctly 
- so it must be the `removeItem()` in `cartAction.js` => reducer logic
- console log the payload to check if id is passed correctly = correct
- `x.product` should be `x.id`
- after changing the above line it behaves correctly

# Bug 4: Fix the warnings you get in the console and in the terminal.
- console says "Check the render method of `Paginate`"
- so must be a `map()` in `Paginate` without a key
- should not use index or simple number, ideally an uuid to ensure its uniqueness
- but in this case `page-${x}` would suffice since it's a small app, adding a uuid library seems like an overkill




