const report = require('multiple-cucumber-html-reporter');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// Get buildId from environment or use 'local'
const buildId = process.env.buildId || 'local';
const jsonDir = `./reports/multi-json-html/${buildId}`;
const reportPath = `./reports/html-report/${buildId}`;

// Check if JSON report exists
if (!fs.existsSync(path.join(jsonDir, 'cucumber_report.json'))) {
    console.error(`❌ JSON report not found at: ${jsonDir}/cucumber_report.json`);
    console.error('Please run tests first to generate the JSON report.');
    process.exit(1);
}

// Read execution date/time if available
let executionDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
if (fs.existsSync('executionDateAndTime.properties')) {
    const content = fs.readFileSync('executionDateAndTime.properties', 'utf8');
    const match = content.match(/executionDateAndTime=(.+)/);
    if (match) {
        executionDateTime = match[1];
    }
}

// Generate HTML report
report.generate({
    jsonDir: jsonDir,
    reportPath: reportPath,
    metadata: {
        browser: {
            name: process.env.BROWSER || 'chromium',
            version: 'Latest'
        },
        device: 'Local Machine',
        platform: {
            name: process.platform,
            version: require('os').release()
        }
    },
    customData: {
        title: 'Test Execution Report',
        data: [
            { label: 'Project', value: 'Sauce Demo E2E Tests' },
            { label: 'Environment', value: process.env.env || 'qa' },
            { label: 'Build ID', value: buildId },
            { label: 'Execution Date', value: executionDateTime },
            { label: 'Browser', value: process.env.BROWSER || 'chromium' }
        ]
    },
    pageTitle: 'Playwright Cucumber Test Report',
    reportName: `Test Report - Build ${buildId}`,
    displayDuration: true,
    displayReportTime: true,
    durationInMS: true,
    openReportInBrowser: true,
    saveCollectedJSON: true
});

console.log('════════════════════════════════════════════════════════════');
console.log('✅ HTML Report Generated Successfully!');
console.log('════════════════════════════════════════════════════════════');
console.log(`📁 Report Location: ${reportPath}/index.html`);
console.log(`🔖 Build ID: ${buildId}`);
console.log(`🌍 Environment: ${process.env.env || 'qa'}`);
console.log(`🌐 Browser: ${process.env.BROWSER || 'chromium'}`);
console.log('════════════════════════════════════════════════════════════');