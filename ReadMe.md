To run in local
npx cross-env env=uat browser=chrome TEST_USERNAME="standard_user" TEST_PASSWORD="secret_sauce" cucumber-js --config config/cucumber.js --tags @e2eUAT
