const nodemailer = require("nodemailer");
require('dotenv').config()
module.exports = (usuario) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: process.env.EMAIL_NODEMAILER, //email de gmail del cual se envia el mail
            pass: process.env.PASS_NODEMAILER, //clave generada desde el link de gmail
        },
    });
    
    const mailOptions = {
        from: "Concesionarias",
        to: usuario.email,
        subject: "Bienvenido",
        html: `<h1 style="color: blue;">BIENVENIDO ${usuario.nombre}!!!</br><span style="color: green;">Nos agrada contar con vos en nuestro sitio!!!</span></h1>`,
        /* attachments : [
            {path : "../../clasesApoyo/clase11_25-01_concesionarias/public/images/1684370621776_img_.jpg"}
        ] */
    };
    
    try {
        transporter.sendMail(mailOptions);
    } catch (err) {
        console.log(err);
    }
}
// link para generar lass contraseñas 
// https://security.google.com/settings/security/apppasswords