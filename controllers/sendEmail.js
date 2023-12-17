const nodemailer = require("nodemailer");
// const Brevo = require("@getbrevo/brevo");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
// const { authenticate } = require("@google-cloud/local-auth");
// const { google } = require("googleapis");

const sendEmail2 = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "trenton55@ethereal.email",
      pass: "4nhWudVxqk1AXsJtxX",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo " <benedictnnaoma0@gmail.com>', // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ", // Subject line
    // plain text body
    html: "<h2>Hello world?</h2>", // html body
  });
  res.json(info);
};

const sendEmail1 = async () => {
  const data = {
    from: "benedictnnaoma0@gmail.com",
    to: "toarin@istuck.online",
    subject: "Subject",
    text: "Email body",
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
};

const sendEmail3 = async () => {
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = path.join(process.cwd(), "token.json");
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

  /**
   * Reads previously authorized credentials from the save file.
   *
   * @return {Promise<OAuth2Client|null>}
   */
  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  /**
   * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  /**
   * Load or request or authorization to call APIs.
   *
   */
  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

  /**
   * Lists the labels in the user's account.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  async function listLabels(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.labels.list({
      userId: "me",
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
      console.log("No labels found.");
      return;
    }
    console.log("Labels:");
    labels.forEach((label) => {
      console.log(`- ${label.name}`);
    });
  }

  authorize().then(listLabels).catch(console.error);
};


// send email using mailtrap
const sendEmail4 = async () => {
  let html = `
<h1> Hello world</h1>
<p> finally sent the email</p>
`;
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0db7db19c4f026",
      pass: "fcb6c0cd20d48b",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
  from:'SoftJourney <benedictnnaoma0@gmail.com>',
  to:'toarin@istuck.online',
  subject: 'Testing ,',
  html
  });
  console.log('message sent:' + info.messageId );
};

const sendEmail5 = async ()=>{
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: "benedictnnaoma0@gmail.com",
      pass: "Chigozie0",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

var mailOptions = {
  from: "benedictnnaoma0@gmail.com",
  to: "toarin@istuck.online",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

const sendEmail=async(req,res)=>{
const mg = mailgun.client({
  username: "api",
  key: process.env.MAIL_GUN_API_KEY,
});
  mg.messages
    .create("sandbox2cf6c0a1568d4e52acaef87faa0d03c0.mailgun.org", {
      from: "Excited User <benedctnnaoma0@gmail.com>",
      to: ["wutzib@msize.space"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err));

  // mailgun({
  //   apiKey: process.env.MAIL_GUN_API_KEY2,
  //   domain: "sandbox2cf6c0a1568d4e52acaef87faa0d03c0.mailgun.org",
  // });
  // const {to,subject,message}=req.body
  // const emailInfo = {
  // from : '"Benedict" <benedctnnaoma0@gmail.com>',
  // to :[`${to}`],
  // subject:`${subject}`,
  // html:`${message}`
  // } 
  // mailgun().messages().send(emailInfo,(error,body)=>{
  //   if (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       message:'Something went wrong'
  //     })
  //   }else{
  //     res.send({
  //       message:'email sent'
  //     })
  //   }
  // })
  // console.log(emailInfo);
  res.json(req.body)
}
module.exports = sendEmail;
