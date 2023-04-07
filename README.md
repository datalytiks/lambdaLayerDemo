# Lambda Layer how to
This project explains how to create Lambda layer for cdk nodejs project

## Purpose
To access npm packages and custom functions from Lambda

## How to create lambda layer for node modules and helper functions
*   Create following structure in src folder
    `/src/layers/npm-packages/nodejs`
    `/src/layers/helper-functions/nodejs`
*   In the `npm-packages/nodejs`  do  `npm init -y` to generate `package.json`.
*   Now do the `npm install <packageName> in this folder
    As a result node_modules folder will be created here
*   For the helper functions layer create the modules and export the members as shown in the code
*   Now the npm packages and helper functions are accessible in lambda function
