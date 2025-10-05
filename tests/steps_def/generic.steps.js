const { expect } = require('@playwright/test')

const { When, Then, Given, And } = require('@cucumber/cucumber')
const actions = require('../support/actions.lib')
const scenarioContext = require('../../helpers/context/scenario_context')
const genericPage = require('../pages/genericPage')
const common = require('../../helpers/common.utils')
let custom = require('../support/custom.lib')
const env = process.env.env || 'qa';
const data = require('../../tests/config/' + env.toLowerCase())
let locators = common.readYamlFiles(process.cwd()+'/tests/locators/'+'generic.yml')

Given('I login to the application by entering Credentials', async function () {
    await genericPage.navigateToURL();
    await page.waitForTimeout(3000);
    await custom.enterCredntials(data);
});

When(/^I select the following produts from Cart$/,async function(data) {
    let fieldDetails=data.raw();
    await genericPage.selectProducts(fieldDetails);
    
})

Then(/^I click on "([^*]*)" button$/,async function(btnName){
    if(locators[btnName]!=null)
    {
        await actions.clickOnElement(locators[btnName]);
    }
    else{
        await actions.clickOnElementText(btnName);
    }

})

Then(/^I enter the following checkout Info and click on "([^*]*)" button$/,async function(btnName,data) {

    let fieldDetails= await data.hashes();
    await genericPage.enterCheckoutInfo(fieldDetails);
    await actions.clickOnElementText(btnName);

    await page.waitForTimeout(5000);
})


Then(/^check if the ThankYou Message is displayed$/, async function() {
    await expect(page.locator("//h2")).toContainText("thank you", { ignoreCase: true });

});