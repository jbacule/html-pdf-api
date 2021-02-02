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
    body,p{
        margin:0;
        padding:0;
    }
    *{
        font-family: Consolas,monaco,monospace; 
        color: #000000;
     }
     p.title{
         line-height: 1;
         letter-spacing: 0.2px;
         margin-bottom: 5px;
         text-align: justify;
         text-justify: inter-word;
         font-family: Consolas,monaco,monospace; 
     }
     p.sub-title{
         line-height: 1;
         text-align: center;
         margin-top: 5px;
         letter-spacing: 0.5px;
         font-family: Consolas,monaco,monospace; 
     }
     div.page-break{
        page-break-after: always !important;
    }
    </style>
    </head>
    <body>
    <div class="page">
        <p class="title" style="font-size: 10.47px;">Arborwear Men's 400240 Double Thick Pullover Sweatshirt, Cardinal Red - M <strong>New</strong></p>
        <img height="38.40" width="100%" src="data:image/png;base64,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" alt="test">
        <p class="sub-title" style="font-size: 10.47px;"><strong>ABW-400240_CardinalRed_M</strong> <span>/</span> X002CH9ROP</p>
    </div>
    <div class="page-break"></div>
    <div class="page" >
        <p class="title" style="font-size: 10.47px;">Arborwear Men's 400240 Double Thick Pullover Sweatshirt, Cardinal Red - M <strong>New</strong></p>
        <img height="38.40" width="100%" src="data:image/png;base64,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" alt="test">
        <p class="sub-title" style="font-size: 10.47px;"><strong>ABW-400240_CardinalRed_M</strong> <span>/</span> X002CH9ROP</p>
    </div>
    </body>
    </html>
    `;
    let options = { 
        // format: 'Letter', 
        // orientation: 'portrait',
        
        width: '3in',
        height: '1.2in',
        border: '2px'
    };

    pdf.create(html, options).toBuffer(function(err, buffer){
        // res.json({message: "Success", result: buffer.toString('base64')})
        res.send(`<embed type="application/pdf" src="data:application/pdf;base64,${buffer.toString('base64')}" height="100%" width="100%"></embed>`)
    });
})

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
