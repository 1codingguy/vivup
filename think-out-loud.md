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

