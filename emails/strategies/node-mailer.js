const nodemailer = require('nodemailer');

class NodeMailer {
  constructor (smtpParams, senderParams){
    this.senderParams = senderParams;
    this.transporter = nodemailer.createTransport({
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
            this.#verifiedConnection();
            this.transporter.sendMail(emailParams, function(error, response)  {
              if (error) {
                  console.log(error);
                  res.end("error");
              } else {
                  console.log('Message sent successfully: ' + response.message);
                  res.end("sent");
              }
            })         
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

  #verifiedConnection() {
    this.transporter.verify(function (error, success){
      if (error) {
        console.log(error)
      } else {
        console.log("Mailer connection verified");
      }
    })
  }
}

module.exports = NodeMailer;