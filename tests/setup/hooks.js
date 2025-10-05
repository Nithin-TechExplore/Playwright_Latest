const {
    Before,
    After,
    BeforeAll,
    AfterAll,
    AfterScenario,
    BeforeScenario,
    BeforeStep,
    AfterStep,
    Status,
    setDefaultTimeout
} = require('@cucumber/cucumber')
const {chromium,chrome,firefox,webkit,edge,opera} = require('playwright')
require("dotenv/config")
const fs = require("fs")
const os = require("os")
const moment = require("moment")
const propertiesPath = "executionDateAndTime.properties"
const scenarioContext = require('../../helpers/context/scenario_context')
let DEFAULT_TIMEOUT = 180000;
setDefaultTimeout(DEFAULT_TIMEOUT);
const common = require('../../helpers/common.utils')
let currentDate;
const options = {
    headless: false,
    args: ['--start-maximized']
}

if(process.env.HTTP_PROXY){
    options.proxy = {
        server: process.env.HTTP_PROXY,
    }
}

let executablePath;
let dateTime;
let headless = true;
let userProfile = os.homedir();

let osName = process.platform;

// if(osName.includes('win32')){
//     executablePath = `${userProfile}/AppData/Local/ms-playwright/chromium-1169/chrome-win/chrome.exe`
//     headless = false
// }

let genericPage = require('../pages/genericPage')



BeforeAll(async() => {
    currentDate = moment().format('YYYY-MM-DD')
    let currentTime = moment().format('HH.mm.ss')
    dateTime = `${currentDate}_${currentTime}`
    fs.open('executionDateAndTime.properties','w',function(err){
        if(err) throw err;
    })
    fs.appendFileSync(propertiesPath,'executionDateAndTime='+currentDate+" "+currentTime+"\n")
    global.environment = process.env.env
    global.brand = process.env.brand
    global.projectType = process.env.project
    global.globalTimeout = DEFAULT_TIMEOUT
    const browserType = (process.env.BROWSER != null) ? process.env.BROWSER : 'chromium';
    switch(browserType){

        case 'chrome': 
            options.channel = 'chromium';
            global.browser = await chromium.launch(
            {
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',               
                 headless: false,
                 args: ['--start-maximized'],
                //args: ['--window-size=1920,1080','--window-position=0,0'],
            });
            break;
        case 'edge':
            //options.channel = 'edge';

            global.browser = await chromium.launch({
                executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Adjust path for your OS

                headless:false,
                args: ['--window-size=1920,1080','--window-position=0,0'],

            })
            break;
            case 'chromium':
    
                global.browser = await chromium.launch({
                    headless:false,
                    args: ['--window-size=1920,1080','--window-position=0,0'],
    
                })
                break;
        default:
            throw new Error('Unsupported browser choice')

    }
})

Before(async function(scenario){
    console.log('@Before Scenario Hook')
    scenarioContext.setContext("tags",scenario.pickle.tags)
    global.context = await global.browser.newContext({ignoreHTTPSErrors: true})
    context = await global.browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: "reports/video_reports",
        }
    })
    global.page = await global.context.newPage();


})


After(async function(scenario){
    console.log(`Finished Executing Scenario: ${scenario.pickle.name}`);
    const screenshotPath = `reports/screenshots/${scenario.pickle.name.replace(/ /g,'_')}_endstep.png`;
    const buffer = await global.page.screenshot({path:screenshotPath,fullPage:true});
    await this.attach(buffer,'image/png');
    if(global.page)
    {
        await global.page.close();
    }

    if(global.context)
    {
        await global.context.close();
    }

    console.log('Test Status ',scenario.result.status)

    if (scenario.result.status === 'FAILED') {
        const failedTestCase = scenario.pickle.name;
        fs.appendFileSync('failed-tests.txt', `${failedTestCase}\n`);
        console.log('Failed Test Case')
    }
})

AfterStep(async function(scenario){
    if(scenario.result?.status !== Status.PASSED)
    {
        const screenshotPath = `reports/screenshots/${scenario.pickle.name.replace(/ /g,'_')}_${moment().format('HH.mm.ss')}.png`;
        const buffer = await global.page.screenshot({path:screenshotPath,fullPage: true});
        await this.attach(buffer,'image/png');
    }

})

AfterAll(async()=>{
    await global.browser.close();
})