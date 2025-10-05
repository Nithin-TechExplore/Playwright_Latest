const actions = require('../support/actions.lib')
const common = require('../../helpers/common.utils')
const path = process.cwd();
const env = process.env.env || 'qa';
const data = require('../../tests/config/' + env.toLowerCase());
const custom = require('../support/custom.lib')
const scenarioContext = require('../../helpers/context/scenario_context')
const produtsLocator = common.readYamlFiles(process.cwd()+'/tests/locators/'+'products.yml')
const checkoutLocator = common.readYamlFiles(process.cwd()+'/tests/locators/'+'checkoutInfo.yml')

class genericPage {
    async navigateToURL() {
        await page.goto(data['baseUrl']);
        console.log('URL ', data['baeUrl']);
        await page.waitForTimeout(2000);
    }

    async enterCredentials() {
        await custom.enterCredntials(data);

    }

    async switchToTab() {
        let pages = await context.pages;
        let secondTab = await pages[1];
        await secondTab.bringToFront();
        await page.waitForTimeout();
        return secondTab;

    }

    async getPageUrl(pageTab) {
        let url = await pageTab.url();
        return url;
    }

    async selectProducts(fields){

        for(let i=1;i<fields.length;i++)
        {
            let product=produtsLocator['product'].replace('item',fields[i])
            console.log('Product Name ',product);
            await actions.clickOnElement(product);
            await page.waitForTimeout(3000);
        }

    }

    async enterCheckoutInfo(data){
        let fieldDetails=Object.keys(data[0]);
        console.log("Data ",data.length)
        console.log("FieldSetails ",fieldDetails.length);
        for(let i=0;i<data.length;i++)
        {
            let row=data[i];
            console.log("row ",row)
            for(let j=0;j<fieldDetails.length;j++)
            {

                let id=fieldDetails[j];
                let value=row[id];

                console.log("id ", id)
                console.log("value ",value)
                await actions.enterValue(checkoutLocator[id],value);
                await page.waitForTimeout(5000);
                console.log("#####################################")



            }
        }
    }

}


module.exports = new genericPage();
