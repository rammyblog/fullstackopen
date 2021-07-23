describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get("#username");
    cy.get("#password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("rammy");
      cy.get("#password").type("12345678");
      cy.get("#login-btn").click();
      cy.contains("Onasany Tunde logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("rammy");
      cy.get("#password").type("12345");
      cy.get("#login-btn").click();
      cy.contains("wrong credentials");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("rammy");
      cy.get("#password").type("12345678");
      cy.get("#login-btn").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("This is a new test");
      cy.get("#author").type("Onasanya Tunde");
      cy.get("#url").type("https://google.com");
      cy.get("#create-blog").click();
      cy.contains("This is a new test");
    });

    it("A blog can be liked", function () {
      cy.contains("Hello world, Yeah")
        .contains("view")
        .click()
        .get(".likeButton")
        .first()
        .click();
    });

    it("A blog can be deleted", function () {
      cy.contains("Hello world, Yeah")
        .contains("view")
        .click()
        .get(".deleteBtn")
        .first()
        .click();

      // Failed because user didn't create it
      cy.get("html").should("contain.not", "Hello world, Yeah");
    });
  });
});
