import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

let userData;

Before(() => {
  cy.fixture("loginData").then((data) => {
    userData = data;
  });
});

Given("I visit the WorkMotion login page", () => {
  cy.intercept("GET", "**/api/v2/dashboard").as("getDashboard");
  cy.visit("https://beta.workmotion.com/login");
});

When("I enter valid login credentials", () => {
  const { email, password } = userData.validUser;
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
});

When("I enter invalid login credentials", () => {
  const { email, password } = userData.invalidUser;
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
});

When("I click the login button", () => {
  cy.get('button[type="submit"]').click();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});

Then('I should see an error message: {string}', (errorMsg) => {
  cy.contains(errorMsg, { timeout: 7000 }).should("be.visible");
});
