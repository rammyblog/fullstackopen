describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get("#username");
    cy.get("#password");
    // cy.get("#login-btn").click();
    // cy.contains("Onasany Tunde logged in");
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
});
