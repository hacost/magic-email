const sgMail = require("@sendgrid/mail");

class SendGrid {
  constructor(apiKey, senderParams) {
    this.senderParams = senderParams;
    this.transporter = sgMail.setApiKey(apiKey);
  }

  async sendMail(emailParams, sandboxMode = false) {
    try {
      if (this.senderParams) {
        if (emailParams.to) {
          emailParams.mail_settings = {
            sandbox_mode: {
              enable: sandboxMode,
            },
          };
          this.transporter.send(this.#processEmailParams(emailParams), function(error, response)  {
            if (error) {
                console.log(error);
              } else {
                console.log('Message sent successfully: ' + response.message);
            }
          }) 
        } else {
          throw new Error("emailParams.to is Empty");
        }  
      } else {
        throw new Error('senderParams is empty - senderName and senderEmail');
      }
    } catch (error) {
      console.log(`error: ${error.message}`);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  // private functions

  #removeWhiteSpace = (string) => {
    return string.replace(/\s/g, "");
  };

  #stringToArray = (string) => {
    return this.#removeWhiteSpace(string).split(",");
  };

  #processEmailParams = (emailParams) => {
    emailParams.from = `${this.senderParams.senderName} <${this.senderParams.senderEmail}>`;
    emailParams.to = this.#stringToArray(emailParams.to);
    if (emailParams.cc) {
      emailParams.cc = this.#stringToArray(emailParams.cc);
    }
    if (emailParams.bcc) {
      emailParams.bcc = this.#stringToArray(emailParams.bcc);
    }
    return emailParams;
  };
}

module.exports = SendGrid;
