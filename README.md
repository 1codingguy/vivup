## How to run the project

- Run `yarn install` to get all the necessary packages;
- Run `yarn start` to get the project running;

## Assignments
The bellow assignments should take a maximum of 4 hours.

Please create a new branch and push each bug fix/feature implementation in separate commit. Raise a pull request when you're done with the assignment.

Good luck and have fun!
### Bugs
- There is a bug with adding products to the cart - only the last product is present in the cart;
- There is a bug with adding the same product to the cart multiple times - the quantity does not change;
- There is a bug with removing products form the cart - the button does not work;
- Fix the warnings you get in the console and in the terminal.

### Features
- Make the cart label (in the top right part of the page) reflect the number of items and their quantity in the cart;
- Add validations to the billing page:
  - The phone number needs to match a regex;
  - The zip code needs to follow a regex;
- Make sure the billing page is accessible only if there are items in the cart;
- For the country input in the billing page, display them in a select and get all the options by making an async request at: `https://restcountries.com/v3.1/all`. The options need to contain the country flag and common name.