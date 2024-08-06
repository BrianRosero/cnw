const pdf = require('html-pdf');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdfTemplate = require('./documents/document');
const env = require('dotenv');
env.config();

exports.createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error generating PDF');
        }
        res.send('PDF generated');
    });
};

exports.fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, 'invoice.pdf'));
};

exports.sendPdf = (req, res) => {
    const pathToAttachment = path.join(__dirname, 'invoice.pdf');
    const attachment = fs.readFileSync(pathToAttachment).toString('base64');

    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL1,
            pass: process.env.PASSWORD1
        },
    });

    smtpTransport.sendMail({
        from: process.env.EMAIL1,
        to: req.body.email,
        subject: 'Pdf Generate document',
        html: 'Testing Pdf Generate document, Thanks.',
        attachments: [
            {
                content: attachment,
                filename: 'invoice.pdf',
                contentType: 'application/pdf',
                path: pathToAttachment
            }
        ]
    }, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            res.send('Mail has been sent to your email. Check your mail');
        }
    });
};
