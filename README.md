# Install project

Run `npm install`

## Start development

Run `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### To build project for production

Run `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

⚠️ You will need to run this command before deploying

#### Deployment

Two environments are currently hosted on an aws bucket : prod and next (for staging).

First you will need to install aws cli :
`msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi`
`aws --version`

Then connect to aws : add to C:\Users\{USER}\.aws
`aws_access_key_id=ACCESSKEY`
`aws_secret_access_key=SECRETKEY`

1. Generate build : `npm run build`
2. Run for preprod deployment:
    `aws s3 sync --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par  build/ s3://msg-next --delete`
3. Prod deployment
    `aws s3 sync --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par  build/ s3://msg-prod`


You can check available buckets with :
    `aws s3 ls --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par`
