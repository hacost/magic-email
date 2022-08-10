# ✨magic-email ✨
This library allows you to quickly and easily send emails.
## Features
  * Send email with NodeMailer 
  * Send email with SendGrid
 
## Installation
To install in your project
```console
$ npm install magic-email
```
## How to use
```js
const magicEmail = require('magic-email');

// To use NodeMailer
strategyParams = {
  strategyName: 'NodeMailer',
  smtp: {
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD
    }
}

// To use SendGrid
strategyParams = {
  strategyName: 'SendGrid',
  apiKey: API_KEY
}

emailParams = {
  to: 'mail@mail.com',
  cc: 'mail@mail.com',
  bcc: 'mail@mail.com',
  subject: 'This is the Subject',
  html: '<b> This is the HTML content</b>'
}

magicEmail.sendEmail(strategyParams, emailParams);

```