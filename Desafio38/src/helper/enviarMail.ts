const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ona51@ethereal.email',
        pass: 'HXyTCfBdVMgTZhVfF4'
    },
    tls : { rejectUnauthorized: false }
});


export const sendMail = (mailOptions: any) => {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            console.log(`error transporter.sendMail: ${err}`)
            return err
        }
        //console.log(info)
    })
}




const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'melcg23@gmail.com',
        pass: '******'
    },
    tls : { rejectUnauthorized: false }
});

export const sendGMail = (mailOptions: any) => {
    //console.log('sendGMail')
    transporterGmail.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            console.log(`error transporter.sendGMail: ${err}`)
            return err
        }
        //console.log(info)
    })
}
