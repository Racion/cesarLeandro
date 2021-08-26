const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const router = express.Router();
const generatePDF = require("../utils/generatePdf");

router.post("/send-email", (req, res) => {
  const { nombre, telefono, direccion, city } = req.body;
  generatePDF(nombre, telefono, direccion, city, ...yTodoLoQueNecesite);
  const contentHtml = `
    <h1>Formulario para Sunpower-nodemailer</h1>
    <ul>
    <li>nombre: ${nombre}</li>
    <li>correo: ${direccion}</li>
    <li>telefono: ${telefono}</li>
    </ul>
    <p>${city}</p>
    `;

  const CLIENT_ID =
    "677602571372-meaamlnla8emiieph6r47qs01unsujsk.apps.googleusercontent.com";
  const CLIENT_SECRET = "fiWePov0sit8PH0-AIhRSO7F";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04YyVktuY_tQaCgYIARAAGAQSNwF-L9Ir2n3uaIqNFwgiYi1_839Sd__KM4S4VYHOJ8XJGQaJJPlLdMYbJxUVZvp7cRQ807Mv7KI";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail() {
    try {
      const accessToken = oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "sunpowerform@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Página web Nodemailer <sunpowerform@gmail.com>",
        to: "clvillas@unal.edu.co",
        subject: "Nodemailer prueba",
        html: contentHtml,
        attachments: [
          {
            filename: "cesar24-8-2021.pdf",
            contentType: "application/pdf",
            path: "C:/Users/nano_/Downloads/cesar24-8-2021.pdf",
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  sendMail()
    .then((result) => res.status(200).send("enviado"))
    .catch((error) => console.log(error.message));
});

module.exports = router;
