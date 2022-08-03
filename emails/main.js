const SendGrid = require('./strategies/send-grid');
const NodeMailer = require('./strategies/node-mailer');

// private
senderParams = {
	senderName: 'Magic Intelligence',
	senderEmail: 'app@magicintelligence.com'
}

const magicEmail = {
  async sendEmail(strategyParams, emailParams, sandboxMode = false) {
    try {
      switch (strategyParams.strategyName) {
      case 'SendGrid':
        let sendGrid = new SendGrid(strategyParams.apiKey, senderParams);
        sendGrid.sendMail(emailParams, sandboxMode);
        break;
      case 'MailerSend':
        //mailerSend.sendMail(apiKey, emailParams, sandboxMode);
        break;
      case 'NodeMailer':
        let nodeMailer = new NodeMailer(strategyParams.smtp, senderParams);
        nodeMailer.sendMail(emailParams, sandboxMode);
        break;
      default:
        console.log(`Sorry, email strategy not found ${strategyParams.strategyName}.`);
    }
    } catch (error) {
      console.log(`error: ${error.message}`);
    }  
  }
}

module.exports = magicEmail;