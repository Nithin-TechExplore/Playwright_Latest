Feature: Perform an E2E Test

    @e2eQA
    Scenario Outline: Order some Products from Sauce Demo QA
        Given I login to the application by entering Credentials
        When I select the following produts from Cart
            | Items   |
            | <Item1> |
            | <Item2> |
        Then I click on "cart" button
        Then I click on "CHECKOUT" button
        And I enter the following checkout Info and click on "Continue" button
            | FirstName   | LastName   | ZipCode   |
            | <FirstName> | <LastName> | <ZipCode> |
        Then I click on "FINISH" button
        And check if the ThankYou Message is displayed

        Examples:
            | Item1                 | Item2               | FirstName | LastName | ZipCode |
            | Sauce Labs Bike Light | Sauce Labs Backpack | Henry     | Donalds  | 560022  |


        @e2eUAT
    Scenario Outline: Order some Products from Sauce Demo UAT
        Given I login to the application by entering Credentials
        When I select the following produts from Cart
            | Items   |
            | <Item1> |
            | <Item2> |
        Then I click on "cart" button
        Then I click on "CHECKOUT" button
        And I enter the following checkout Info and click on "Continue" button
            | FirstName   | LastName   | ZipCode   |
            | <FirstName> | <LastName> | <ZipCode> |
        Then I click on "FINISH" button
        And check if the ThankYou Message is displayed

        Examples:
            | Item1                 | Item2               | FirstName | LastName | ZipCode |
            | Sauce Labs Fleece Jacket| Sauce Labs Backpack | Henry     | Donalds  | 560022  |