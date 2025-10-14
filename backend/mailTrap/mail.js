import {verifyCodeTemplate,welcomeEmailTemplate} from './mailTemplate.js'
import {client,sender} from './mailTrapConfig.js'

export const sendVerificationEmail =  async(email, verificationCode) =>{
    try {
        const reponse = client
        .send({
          from: sender,
          to: [{ email: email }],
          subject: "Verification Email",
          html: verifyCodeTemplate.replace("{CODE}",verificationCode),
          category: "email verification",
        })

        console.log("email sent succefully", await reponse);
    } catch (error) {
        console.log("error while sending verification email",error);
    }   
}

export const welcomeEmail =  async(email,name) =>{
    try {
        const reponse = client
        .send({
          from: sender,
          to: [{ email: email }],
          subject: "Verification Email",
          html: welcomeEmailTemplate.replace("{USER_NAME}",name),
          category: "email verification",
        })

        console.log("email sent succefully", await reponse);    
    } catch (error) {
        console.log("error while sending verification email",error);
    }
}
