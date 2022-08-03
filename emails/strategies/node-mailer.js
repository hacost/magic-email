const nodemailer = require('nodemailer');

class NodeMailer {
  constructor (smtpParams, senderParams){
    this.senderParams = senderParams;
    this.transport = nodemailer.createTransport({
      host: smtpParams.host,
      port: smtpParams.port,
      secure: true,
      auth: {
        user: smtpParams.user,
        pass: smtpParams.password
      }
    })
  }

  async sendMail(emailParams, sandboxMode = false) {
    try {
      if (this.senderParams) {
        if (emailParams.to) {
          emailParams.from = `${this.senderParams.senderName} <${this.senderParams.senderEmail}>`;
          if (!sandboxMode) {
            await this.transport.sendMail(emailParams);     
            console.log('email sent successfully')            
          } else {
            //sandboxMode
          }         
        } else {
          throw new Error('emailParams.to is empty');
        }        
      } else {
        throw new Error('senderParams is empty - senderName and senderEmail');
      }

    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }
}

module.exports = NodeMailer;