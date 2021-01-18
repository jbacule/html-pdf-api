const express = require("express");
const cors = require("cors");
const pdf = require('html-pdf');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res){
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>

    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>

    </body>
    </html>
    `;
    let options = { format: 'Letter', orientation: 'portrait' };

    pdf.create(html, options).toBuffer(function(err, buffer){
        res.json({message: "Success", result: buffer.toString('base64')})
    });
})

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));