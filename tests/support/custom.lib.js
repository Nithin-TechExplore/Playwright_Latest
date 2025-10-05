const actions = require('./actions.lib')
const env = process.env.env || 'qa';
const data = require('../../tests/config/' + env.toLowerCase());

const custom = {
    enterCredntials: async(data) => {
        await actions.enterValue("//input[@id='user-name']",atob(data['userName']))
        await page.waitForTimeout(2000);
        await actions.enterValue("//input[@id='password']",atob(data['password']))
        await page.waitForTimeout(2000);
        await actions.clickOnElement("//input[@id='login-button']");
        await page.waitForTimeout(2000);

    }
};

module.exports = custom;
