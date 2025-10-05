let timeOut = 60000;
const env = process.env.env || 'sit';
const data = require('../../tests/config/' + env.toLowerCase())

const actions = {

    getLocator: async (locator) => {
        if (locator != null) {
            return await page.locator(locator);
        } else {
            return await page.getByText(locator);
        }

    },

    getElement: async (locator, wait = timeOut) => {
        if (locator != null) {
            try {
                let element = await page.waitForSelector(locator, { timeout: wait });
                return element;
            } catch (error) {
                throw new Error('Element not found with locator: ' + locator + 'within timeout ' + timeOut);
            }
        }
        else {
            return await page.getByText(locator);
        }
    },

    checkElementVisible: async (locator) => {
        let flag = true;
        try {
            let element = await actions.getElement(locator, 5000);
            flag = await element.isVisible();
        } catch (Error) {
            flag = false;
        }
        return flag;
    },

    getElementByRole: async (locator, role) => {
        return await page.getByRole(role, { name: locator });
    },

    clickOnElementText: async (locator) => {
        let ele = await page.getByText(locator);
        await ele.click();
    },

    clickOnElement: async (locator) => {
        let ele = await actions.getLocator(locator);
        await ele.click();
    },

    clickOnElementByRole: async (locator) => {
        let ele = await actions.getElementByRole(locator, role);
        await ele.first().click();
    },

    enterValue: async (locator, value) => {
        await page.waitForSelector(locator, { timeout: timeOut });
        let ele = await actions.getLocator(locator);
        await ele.fill(value);
    },

    clearAndEnterValue: async (locator, value) => {
        await page.waitForSelector(locator, { timeout: timeOut });
        let ele = await actions.getLocator(locator);
        await ele.clear();
        await ele.fill(value);
    },

    clearValue: async (locator) => {
        await page.waitForSelector(locator, { timeout: timeOut });
        let ele = await actions.getLocator(locator);
        await ele.clear()

    },

    checkRadio: async (locator) => {

        let button = await actions.getLocator(locator);
        if (await !button.isChecked()) {
            button.check();
        }
    },

    uncheckRadio: async (locator) => {
        let button = await actions.getLocator(locator);
        if (await button.isChecked()) {
            button.check();
        }

    },

    hoverOnElement: async(locator) => {
        let ele = await actions.getLocator(locator);
        await ele.hover();
    },

    getTextOfElement: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.innerText();
    },

    getElementAttribute: async(locator,attribute) => {
        let ele = await actions.getLocatoir(locator);
        return await ele.getElementAttribute(attribute)

    },
    isElementEnabled: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.isEnabled();
    },
    isElementVisible: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.isVisible();
    },
    isChecked: async(locator) => {

        let button = await actions.getLocator(locator);
        return await button.isChecked();
    },

    selectByValue: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.selectOption(value);
    },

    selectByIndex: async(locator) => {
            let ele = await actions.getLocator(locator);
            return await ele.selectOption({index:index});
    },

    selectMultiple: async(locator,array) => {
        let ele = await actions.getLocator(locator);
        await ele.selectOption(array);
    },

    waitForTextLocator: async(textContent) => {
        let textSel = '//*[text()="'+textContent+'"]'
        await page.waitForSelector(textSel,{timeout: timeOut})

    },

    tabOut: async(locator) => {

        await page.locator(locator).press('Tab');
    },

    countOfElements: async(locator) => {

        return await page.locator(locator).count();
    },

    isRadioButtonChecked: async(locator) => {
        return await page.locator(locator).isChecked();
    }

}

module.exports = actions;
