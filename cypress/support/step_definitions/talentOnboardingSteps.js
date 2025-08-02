import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

let userData, talentData;

Before(() => {
  cy.fixture("loginData").then((data) => {
    userData = data;
  });

  cy.fixture("talentData").then((data) => {
    talentData = data;
  });
});

Given("I am logged in and on the dashboard", () => {
  cy.visit("https://beta.workmotion.com/login");

  cy.fixture("loginData").then(({ validUser }) => {
    const { email, password } = validUser;

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

  cy.url({ timeout: 20000 }).should("include", "/dashboard");

  cy.visit("https://beta.workmotion.com/onboarding/intro/hire");

  cy.contains("Talent", { timeout: 20000 }).should("be.visible");
});

When("I click on the Talent button", () => {
  cy.contains("Talent", { timeout: 10000 }).should("be.visible").click({ force: true });
});

When('I select "Egypt" as the country', () => {
  cy.contains('Country')
    .parent()
    .within(() => {
      cy.get('div[role="combobox"], input')
        .click({ force: true })
        .type('Egypt', { force: true });
    });

  cy.contains('div', 'Egypt')
    .should('be.visible')
    .click({ force: true });
});

When("I click Get Started", () => {
  cy.contains("button", "GET STARTED", { matchCase: false, timeout: 10000 })
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
});

When("I fill in the required fields with valid data", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const {
      firstName,
      lastName,
      jobTitle,
      jobDescription,
      eligibleToWork,
      isExecutive,
      employmentType,
      contractType,
      startDate,
      worksFromHome,
      reimburseExpenses,
      costCenter,
      subEntity
    } = validTalent;

    cy.contains("Talent's first name").scrollIntoView().parent().find('input').type(firstName, { force: true });

    cy.contains("Talent's last name").scrollIntoView().parent().find('input').type(lastName, { force: true });

    cy.contains("The talent is eligible to work in that country")
      .scrollIntoView()
      .parent()
      .contains(eligibleToWork)
      .click({ force: true });

    cy.contains("Is the talent an executive?")
      .scrollIntoView()
      .parent()
      .contains(isExecutive)
      .click({ force: true });

    cy.contains("Job title").scrollIntoView().parent().find('input').type(jobTitle, { force: true });

    cy.contains("Job description").scrollIntoView().parent().find('textarea').type(jobDescription, { force: true });

    cy.contains("Employment type").scrollIntoView().parent().contains(employmentType).click({ force: true });

    cy.contains("Contract type").scrollIntoView().parent().contains(contractType).click({ force: true });

cy.contains("Contract start date")
  .scrollIntoView()
  .parent()
  .find('input')
  .click({ force: true });

cy.get('button')
  .filter(':visible')
  .contains(/^15$/)
  .first()
  .click({ force: true });

cy.get('button')
  .contains(/^OK$/i)
  .should('be.visible')
  .click({ force: true });

  cy.contains("Contract end date")
    .scrollIntoView()
    .parent()
    .find('input')
    .click({ force: true });

  cy.get('button')
    .filter(':visible')
    .contains(/^30$/)
    .first()
    .click({ force: true });

  cy.get('button')
    .contains(/^OK$/i)
    .should('be.visible')
    .click({ force: true });

    cy.contains("Is the talent going to work from home?")
      .scrollIntoView()
      .parent()
      .contains(worksFromHome)
      .click({ force: true });

    cy.contains("Do you want to reimburse expenses?")
      .scrollIntoView()
      .parent()
      .contains(reimburseExpenses)
      .click({ force: true });

    cy.contains("Cost Center").scrollIntoView().parent().find('input').type(costCenter, { force: true });

cy.contains(/continue/i).scrollIntoView().click({ force: true });
  });
});

When("I fill in the second screen with valid data", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const { probationPeriod } = validTalent;

    cy.contains("Shall the talent have a probationary period?")
      .scrollIntoView()
      .parent()
      .contains(probationPeriod)
      .click({ force: true });

    cy.contains('button', /continue/i)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    });
});

When("I fill in the third screen with valid data", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const {
      employeeParticipation,
      currency,
      baseSalary,
      receiveBonus,
      receiveVariableBonus,
      signOnBonus,
      receiveAllowances,
    } = validTalent;

    cy.contains("Do you intend to provide ESOP, VSOP or any other type of employee participation")
      .scrollIntoView()
      .parent()
      .contains(employeeParticipation)
      .click({ force: true });

cy.get('body').scrollTo('bottom', { ensureScrollable: false });

cy.get('[data-cy="steps-salary-currency-select-input"]')
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

cy.get('[data-cy="steps-salary-currency-select-input"]')
  .type('EGP', { force: true });

cy.get('[data-cy="steps-salary-currency-select-input"]')
  .type('{enter}', { force: true });


    cy.contains("Base salary/month")
      .scrollIntoView()
      .parent()
      .find('input')
      .first()
      .clear()
      .type(baseSalary, { force: true });


    cy.contains("Does the Talent receive a bonus?")
      .scrollIntoView()
      .parent()
      .contains(receiveBonus)
      .click({ force: true });

    cy.contains("Does the talent receive any variable bonus?")
      .scrollIntoView()
      .parent()
      .contains(receiveVariableBonus)
      .click({ force: true });

        cy.contains("Sign-on bonus")
        .scrollIntoView()
        .parent()
        .find('input')
        .first()
        .clear()
        .type(signOnBonus, { force: true });

        cy.contains("Does the talent receive any allowances?")
          .scrollIntoView()
          .parent()
          .contains(receiveAllowances)
          .click({ force: true });

        cy.contains('button', /continue/i)
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });
  });
});

When("I fill in the email screen with valid email", () => {
     cy.fixture("talentData").then(({ validTalent }) => {
       cy.contains("Talent's email")
         .scrollIntoView()
         .parent()
         .find("input")
         .clear()
         .type(validTalent.talentEmail, { force: true });

       cy.contains("Continue").click({ force: true });
     });
   });


When("I review all data and finish it", () => {
  cy.contains(
    "I hereby confirm that the above information is accurate"
  )
    .scrollIntoView({ ensureScrollable: false })
    .find('input[type="checkbox"]')
    .check({ force: true });

  cy.get('[data-cy="steps-finish-btn"]', { timeout: 10000 })
    .scrollIntoView({ ensureScrollable: false })
    .should('be.visible')
    .click({ force: true });

    cy.contains('button', /go to talent list/i, { timeout: 15000 })
        .scrollIntoView({ ensureScrollable: false })
        .should('be.visible')
        .click({ force: true });
});

Then("I search for the new talent in the Onboarding tab and assert it appears", () => {
  cy.contains('button', 'Onboarding', { matchCase: false })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.get('input[placeholder*="Search"]')
    .should('be.visible')
    .clear()
    .type('Ahmed');

  cy.wait(1000);

  cy.contains(/ahmed/i)
    .should('be.visible');
});


When("I missing to enter email in email screen", () => {
cy.contains("Talent's email")
    .scrollIntoView()
    .parent()
    .find("input")
    .clear({ force: true });

  cy.contains("Continue").click({ force: true });
});

Then("Assert that validation message appear", () => {
  cy.contains(/email.*required/i).should("be.visible");
});


When("I fill in the required fields with valid data without set Contract start date", () => {
  cy.fixture("talentData").then(({ validTalent }) => {
    const {
      firstName,
      lastName,
      jobTitle,
      jobDescription,
      eligibleToWork,
      isExecutive,
      employmentType,
      contractType,
      startDate,
      worksFromHome,
      reimburseExpenses,
      costCenter,
      subEntity
    } = validTalent;

    cy.contains("Talent's first name").scrollIntoView().parent().find('input').type(firstName, { force: true });

    cy.contains("Talent's last name").scrollIntoView().parent().find('input').type(lastName, { force: true });

    cy.contains("The talent is eligible to work in that country")
      .scrollIntoView()
      .parent()
      .contains(eligibleToWork)
      .click({ force: true });

    cy.contains("Is the talent an executive?")
      .scrollIntoView()
      .parent()
      .contains(isExecutive)
      .click({ force: true });

    cy.contains("Job title").scrollIntoView().parent().find('input').type(jobTitle, { force: true });

    cy.contains("Job description").scrollIntoView().parent().find('textarea').type(jobDescription, { force: true });

    cy.contains("Employment type").scrollIntoView().parent().contains(employmentType).click({ force: true });

    cy.contains("Contract type").scrollIntoView().parent().contains(contractType).click({ force: true });

  cy.contains("Contract end date")
    .scrollIntoView()
    .parent()
    .find('input')
    .click({ force: true });

  cy.get('button')
    .filter(':visible')
    .contains(/^30$/)
    .first()
    .click({ force: true });

  cy.get('button')
    .contains(/^OK$/i)
    .should('be.visible')
    .click({ force: true });

    cy.contains("Is the talent going to work from home?")
      .scrollIntoView()
      .parent()
      .contains(worksFromHome)
      .click({ force: true });

    cy.contains("Do you want to reimburse expenses?")
      .scrollIntoView()
      .parent()
      .contains(reimburseExpenses)
      .click({ force: true });

    cy.contains("Cost Center").scrollIntoView().parent().find('input').type(costCenter, { force: true });

cy.contains(/continue/i).scrollIntoView().click({ force: true });
  });
});

Then("Assert that validation message for start date appear", () => {
  cy.contains(/start date.*required/i).should("be.visible");
});



