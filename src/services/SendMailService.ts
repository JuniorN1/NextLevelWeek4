import nodemailer, {  Transporter } from 'nodemailer';
class SendMailService{
    private client:Transporter
    constructor(){
        nodemailer.createTestAccount().then(account=>{
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass, // generated ethereal password
                },
              });
            this.client = transporter;
        })
    }
    async execute(to:string,subject:string,body:string){ 
        const message = await this.client.sendMail(
            {
                to,
                subject,
                html:body,
                from:"NPS <norelay@nps.com.br>"
            }
        )
        console.log("Message sent: %s", message.messageId);
 
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

    }

}

export default new SendMailService();