const dotenv = require('dotenv');
dotenv.config();

var FormData = require('form-data');
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const apikey = process.env.API_KEY;

const app = express()

const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve("dist/index.html"));
})

const https = require("https");
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post("/", async function (req, res) {
    const response = await meaningCloud(req.body.text);
    try {
      console.log(response);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });
  const meaningCloud = (text) => {
    return new Promise((resolve, reject) => {
      https
        .get(
          `https://api.meaningcloud.com/sentiment-2.1?key=${apikey}&lang=en&model=general&txt=${text}`,
          (res) => {
            console.log(res);
            res.on("data", (d) => {
              const apicall = JSON.parse(d);
              console.log(apicall.agreement);
              const apiData = {
                agreement: apicall.agreement,
                subjectivity: apicall.subjectivity,
                confidence: apicall.confidence,
              };
              resolve(apiData);
            });
            res.on("error", (error) => {
              console.log(error);
              reject(error);
            });
          }
        )
        .on("error", (e) => {
          console.error(e);
        });
    });
  };

//POST route that takes form input, makes and API call, then returns response

// app.post('/oops', function(req, res) {
//     const inputTxt = req.body.feeling;
//     console.log(inputTxt);
//     const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
//     const scndURL = '&lang=en&model=general&txt=';

//     const goApi = async() => {
//         const result = await fetch(baseURL + process.env.API_KEY + scndURL + inputTxt)
//         try {
//             const data = await result.json();
//             console.log(data);
//             res.send(data);
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
//     goApi();
// })