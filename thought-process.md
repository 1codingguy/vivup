# Bug_1: There is a bug with adding products to the cart - only the last product is present in the cart

- First I guess it has something to do with the logic in reducer.
- console log some line under `CART_ADD_ITEM` and check
- `state.cartItems.find(x => x.id === item.id)` looks for `id`, but console logging `item` I found there's no `id`, so trace back to payload
- turn out `id` is not added to payload in `addToCart` under `cartAction.js`
- after adding `id` in the payload, new item can be added to the cart

# Bug_2 : There is a bug with adding the same product to the cart multiple times - the quantity does not change;

- it must be related to this line:
```
cartItems: state.cartItems.map(x =>
            x.id === existItem.id ? item : x
          ),
```
- There's no quantity change here
- use Redux in devtool to monitor state change
- change the ternary statement into if else block for better reading
- Checkout page currency under "Subtotal" is GBP sign, while the products are in $ sign?

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

# Feature_1: Make the cart label (in the top right part of the page) reflect the number of items and their quantity in the cart;

- check the code in header component
- reuse `cartItems.reduce()` from `CheckoutScreen.js`
- ideally refactor it out, but first test it things work correctly, then think about refactoring later
- what in React-bootstrap gives a round container for the number of items, same as "badge" in MUI?
- turn out there's also a "badge" component in React-bootstrap
- from docs - `pills` make badges more round - which is what I want
  - But it seems there's no option to place the badge on the top right corner of the icon like in MUI
  - for now just put the badge next to the word "cart", since there should be a space between the word "cart" and the badge, insert {` `} after "Cart"
- It works, but again, ideally the `cartItems.reduce()` can be refactored out

* On a second thought when I read the wording of this feature: it says
1. reflect the number of items AND
2. their quantity
  - Does it mean there are two different things to display? But it's weird to have two things displayed next the cart logo, usually it's only a number like my implementation. Am I understanding the feature correctly?

# Feature 2: Add validations to the billing page:

1. The phone number needs to match a regex;
2. The zip code needs to follow a regex;

- not sure are "match a regex" equivalent to "follow a regex", but I supposed they both mean the input has to match a pattern.
- add `pattern` attribute to validate the input
- zip code type was "number", but in order to match a regex, the input type has to be password, text or tel according to mozilla

# Feature 3: Make sure the billing page is accessible only if there are items in the cart:

- in normal usage, if the cart is empty, the next button is disabled and therefore can't process forward to the billing page
- so this feature is for the case of typing '/billing' path in the url
- so I should check the `cartItems` when the `BillingScreen` just mount by useEffect() with empty dependency array
- display an alert and direct user back to homepage so the billing page is not accessible

# Feature 4: display country in a select with its flag
> "For the country input in the billing page, display them in a select and get all the options by making an async request at: https://restcountries.com/v3.1/all. The options need to contain the country flag and common name."

- async fetch function call to the API
- should only call the async fetch function when the `BillingScreen` mounts, so this function call is inside the existing useEffect()
- length of returned array is 250
  - `object.name.common` - gets the name
  - `object.flags.png` - gets the flag image url
- after fetching the data, retain only the name and flag
- sort the country by name, then assign to `countriesData` variable
  - I could use a.localCompare(b), which I previously forgot until searching for how to sort alphabet with 
  
## But how to insert the flag inline with the country name????
- can't nest an <img> under <option>, if did so [object object] is displayed instead of the flag
- can't use ::before pseudo element
- according to Mozilla, <option> styling is very limited
  > " For example, Firefox will apply color and background-color when set on the <option> elements, Chrome won't. Neither of them will apply any kind of spacing (e.g. padding). "
  > "If you really need full control over the option styling, you'll have to either use some kind of library to generate a custom control, or build your own custom control"
  - https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
- That means, I can't add image into <option> without using some kind of library

## Replace <select> with react-bootstrap dropdown
- use <Dropdown> and <DropdownButton> from react-bootstrap
- Use dev-tool to copy the styling from other fields, experiment what works and apply to dropdown menu via css
- validation from <form> does not work in <Dropdown>, so I need to customize classes for validation purpose
  - if valid, display a green border around dropdown menu
  - if invalid, display a red border around dropdown menu, also display "Please provide a valid country" underneath.
- add logic in `handleSubmit()` to check if a valid country is selected 

## alternative solution: display the flag on the same line as "country" label
- Spec for feature 4 says " The options need to contain the country flag and common name."
- So I am not sure if the solution must contain <select> and <option>.
- if so, as per Mozilla quoted above, it's not possible to add a flag inside the <option> tag.
- so I provide an alternative solution, which display the flag on the same line as "country" label.
- please refer to here for the code: https://github.com/1codingguy/vivup/blob/features/src/screens/BillingScreen.js#L115


# The quantity button is having weird bahaviour in CheckoutScreen:
- when clicked on a number from menu, it increase the selected amount
- but this displayed number doesn't reflect the updated number of that item after clicking
- so the number of items in the cart keeps adding up (top right corner), but the number displayed next to the item are always 1-5 because of how it's set up.
- ideally clicking on a number here triggers an update cart function - update the number of item in the cart according to the selected quantity.