const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//POST route that takes form input, makes and API call, then returns response
app.post('/', newPost);

function newPost(req, res){
    let inputTxt = req.body.feeling;
    console.log(inputTxt);
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", inputTxt);
    formdata.append("lang", "EN");  // 2-letter code, like en es fr ...
    
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => ({
        status: response.status, 
        body: response.json()
        }))
        .then(({ status, body }) => console.log(status, body))
        .catch(error => console.log('error', error));
        res.send(response);
}