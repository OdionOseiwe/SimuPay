import {verifyCodeTemplate,welcomeEmailTemplate} from './mailTemplate.js'
import {transporter} from './mailConfig.js'

export const sendVerificationEmail =  async(email, verificationCode) =>{
    try {
    const mailOptions = {
        from: "oseiweifebhor@gmail.com",
        to: email,
        subject: "Verifiation Email",
        html: verifyCodeTemplate.replace("{CODE}",verificationCode),
    };
    transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error while sending verification email",error);
    }   
}

export const welcomeEmail =  async(email,name) =>{
    try {
        const mailOptions = {
        from: "oseiweifebhor@gmail.com",
        to: email,
        subject: "Welcome Email",
        html: welcomeEmailTemplate.replace("{USER_NAME}",name),
    };
    transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error while sending Welcome email",error);
    }
}
