/*const http=require('http');

const hostname = 'localhost';
const port =3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hellow\n');
});

server.listen(port, hostname, () => {
  console.log('Server is running at http://${hostname}:${port}');
});
*/

//"use strict" //strict모드로 해석한다! const let을 사용 가능함

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
//client에서 서버로 온 문자열을 decode한다. ACKII값으로 데이터가 오기 때문에!
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json //body데이터를 json으로 바꾸어준다!.
app.use(bodyParser.json());

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

app.use('/users', require('./api/user'));//라우터 모듈 추가//index.js를 디폴트로 찾음.

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
