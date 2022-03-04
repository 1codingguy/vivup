# Bug_1: There is a bug with adding products to the cart - only the last product is present in the cart

- First I guess it has something to do with the logic in reducer.
- console log some line under `CART_ADD_ITEM` and see what I see
- `state.cartItems.find(x => x.id === item.id)` looks for `id`, but console logging `item` I found there's no `id`, so trace back to payload
- turn out `id` is not added to payload in `addToCart` under `cartAction.js`
- after adding `id` in the payload, new item can be added to the cart

