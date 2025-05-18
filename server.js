const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ConnectDb = require("./db/connection");
require("dotenv").config();

const GlobalRoutes = require("./routes/GlobalRoutes");
const responseModel = require("./models/responseModel");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// const CreateResponse = async (req, res) => {
//   try {
//     const data = await responseModel.create(req.body);
//     res.status(201).send({ message: "Response Saved", data: data });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

const responseModel = require("../models/responseModel");
const nodemailer = require("nodemailer");

const CreateResponse = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    // Save to DB
    const data = await responseModel.create({
      fullname: name,
      email,
      phone_number: phone,
      subject,
      message,
    });

    // Send email

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Contact Form" <ganeshgod1133@gmail.com>',
      to: "dineshkr748199@gmail.com",
      subject: `New Message from ${name} - ${subject}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: "Response saved and mail sent!", data });
  } catch (error) {
    console.error("Error in CreateResponse:", error);
    res.status(400).send({ error: error.message });
  }
};

const getAllResponse = async (req, res) => {
  try {
    const data = await responseModel.find();
    res.status(200).send({ message: "Data Fetched", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

app.get("/", getAllResponse);
app.post("/", CreateResponse);
// app.use("/", GlobalRoutes);

const startConnection = async () => {
  try {
    await ConnectDb(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Connection error:", error);
  }
};

startConnection();
