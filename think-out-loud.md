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
Does it mean there are two different things to display? But it's weird to have two things displayed next the cart logo, usually it's only a number like my implementation. Am I understanding the feature correctly?

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

---

# The quantity button is having weird bahaviour
- there's only options of number 1-5
- and the value displayed doesn't reflect the updated number of that item after clicking


---

# Feature 4: display country in a select with its flag
> For the country input in the billing page, display them in a select and get all the options by making an async request at: https://restcountries.com/v3.1/all. The options need to contain the country flag and common name.

- async fetch function call to the API
- should only call the async fetch function when the `BillingScreen` mounts, so this function call is inside the existing useEffect()
- length of returned array is 250
  - `object.name.common` - gets the name
  - `object.flags.svg` - gets the flag image url
- after fetching the data, retain only the name and flag
- sort the country by name, then assign to `countriesData` variable

But how to insert the flag inline with the country name?

react-select?
https://stackoverflow.com/questions/45940726/populate-react-select-with-image

MUI select?

## alternative solution: display the flag on the same line as "country" label

- Forgot how to get a 'placeholder' for drop down menu
  - `<option value='' disabled hidden> Placeholder </option>` 
    - `value=''` - empty value doesn't pass validation
    - https://stackoverflow.com/questions/25321180/how-do-you-set-up-a-required-select-without-a-default-value-selected
    - `disabled` - A disabled option is unusable and un-clickable
    - `hidden` - When present, it specifies that an element is not yet, or is no longer, relevant.
- I should add a try...catch block in fetchCountries()

## MUI
- Unsure if need to use `Select` from MUI, test not using it first
- components of interest here are:
  - MenuItem
    - ListItemIcon
    - ListItemText


## Try before pseudo element
How to pass the URL dynamically?
Should I use styled-component?
adjust the size and position using rem?

Pass dynamic url to css, problems:
- `url( attr() )` doesn't work

### add a wrapper around <select> tag
- wrapper = position: relative
- select = position: absolute
- Then add a before pseudo element and adjust the position within the select box
  - But not every option has a flag next to it, only the selected country has a flag in the box. 
  - Not sure if this is the requirement? 
    > "The options need to contain the country flag and common name."
    - meaning every one option needs a name and a flag to display?

### what about add a wrapper around each <option> tag?
- adding a wrapper around each <option> tag means the wrapper element will be children of <select> element
- but "only Zero or more <option> or <optgroup> elements" are permitted content under <select> element.
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
- also, <option> styling is very limited
  > " For example, Firefox will apply color and background-color when set on the <option> elements, Chrome won't. Neither of them will apply any kind of spacing (e.g. padding). "
  > "If you really need full control over the option styling, you'll have to either use some kind of library to generate a custom control, or build your own custom control"
  - https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling
  

## then use styled-component? How does styled-component pass argument from html/ jsx?
props

## Try react-bootstrap dropdown
https://stackoverflow.com/questions/60814704/flags-inside-a-react-bootstrap-select-option-renders-as-object-object

- After submitting the form, how does the form object look like again? console log to find out
- what about validation of the dropdown manu?


### correct styling parameters applied in dev-tool

`.dropdown` <div> 
- border: 1px solid #ced4da;

<button className='dropdown-toggle'>:
- width: 100%;
- text-align: left;
- position: relative; 

The dropdown button
button.dropdown-toggle.btn.btn-transparent::after {
    position: absolute;
    right: 1rem;
    top: 1rem;

dropdown-menu
width: 100%


So styling seems ok, needs to deal with 
- inserting a flag 
- passing the value from the menu to state variable
- value validation
