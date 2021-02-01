const express = require("express");
const cors = require("cors");
const pdf = require('html-pdf');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res){
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Heebo&family=Potta+One&family=Roboto&family=Coda+Caption:wght@800&family=Lobster&display=swap');
    div.arial{
        font-family: 'Potta One', cursive;
        font-weight:600;
    }
    div.roboto{
        font-family: 'Roboto', sans-serif; 
        font-weight:600;
    }
    div.heebo{
        font-family: 'Heebo', sans-serif; 
        font-weight:600;
    }
    div.coda{
        font-family: 'Coda Caption', sans-serif;
        font-weight:600;
    }
    div.lobster{
        font-family: 'Lobster', cursive;
        font-weight:600;
    }
    body{
        
        margin:0;
        margin-left: 5px;
        margin-top: 0px;
        padding:0;
    }
    div.page-break{
        page-break-after: always;
    }
    </style>
    </head>
    <body>
    <div class="arial">This is a Arial</div>
    <div class="roboto">This is a Roboto</div>
    <div class="coda">This is a Coda Caption</div>
    <div class="lobster">This is a Lobster</div>
    <div class="heebo">This is a Heebo</div>
    <div class="page-break"></div>
    <div>This is a paragraph.</div>

    </body>
    </html>
    `;
    let options = { 
        format: 'Letter', 
        orientation: 'portrait'
    };

    pdf.create(html, options).toBuffer(function(err, buffer){
        res.json({message: "Success", result: buffer.toString('base64')})
    });
})

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
