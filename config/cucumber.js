let buildId = (process.env.buildId != null) ? process.env.buildId : 'local';
module.exports = {
  default: {
    parallel: 1,
    //requireModule: ['ts-node/register'],
    require: ['tests/steps_def/*.js', 'tests/setup/*.js'],
    paths: ['tests/features/**/*.feature'],
    format: [
      'progress',  // Console output
      `json:reports/multi-json-html/${buildId}/cucumber_report.json`,  // JSON for HTML report
      'html:reports/cucumber-report.html',  // Built-in HTML report
      `junit:reports/multi-json-html/${buildId}/cucumber_report.xml`  // JUnit XML (optional)
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true          //  retry: 1

  }

}
