import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I am logged in and on the dashboard workmotion", () => {
  cy.visit("https://beta.workmotion.com/login");

  cy.fixture("loginData").then(({ validUser }) => {
    const { email, password } = validUser;

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 20000 }).should("include", "/dashboard");

    cy.visit("https://beta.workmotion.com/talents/onboardings?companyId=da83d3b5-a4f8-491c-a3d3-12ab1ff2e2a9");
  });
});

When("I navigate to the {string} tab", (tabName) => {
  cy.contains(tabName, { matchCase: false }).click({ force: true });
});

Then("I should see the talent listed in the results", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const fullName = `${validTalent.firstName} ${validTalent.lastName}`;
    cy.contains(fullName, { timeout: 10000 }).should("be.visible");
  });
});


Then("I verify the talent information is correct", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const fullName = `${validTalent.firstName} ${validTalent.lastName}`;

    cy.contains(fullName).should("be.visible");
    cy.contains("15 Aug 2025").should("be.visible");
    cy.contains("Egypt").should("be.visible");
  });
});
