const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const authRouters = require('./routes/auth');
const projectRouters = require('./routes/projects');

var app = express();

const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');

const assert = require('assert');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use('/auth', authRouters);
app.use('/projects', projectRouters);











app.post('/download', function (req, res) {
  let text = create(req.body);
  res.json({ text: text })
});
mongoose
  .connect(
    'mongodb://localhost:27017')
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

function create(item) {
  text = `<!DOCTYPE html>
  <html>
    <title>` + item.first.title + `</title>
  <head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  
  <!-- Popper JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  
  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

  <style>
      .carousel-item {
    height: 100vh;
    min-height: 350px;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    
  }
  .carousel-caption{
      position:absolute;
      top:38%;
      text-transform: uppercase;
      width:100%;
      right: 0;
      left: 0;
  }
  .carousel-caption h1 {
      font-size: 3.8rem;
      font-weight: 600;
      letter-spacing: .3rem;
      text-shadow: .1rem .1rem .8rem black;
      padding-bottom: 1rem;
  }
  .carousel-caption h3 {
      font-size: 2rem;
      text-shadow: .1rem .1rem .5rem black;
      padding-bottom: 1.6rem;
  }
  .sections {     
    padding: 20px;
    background-color: #fbfbfb;
  }

  .caption {
      
      text-transform: uppercase;
      width: 100%;
      color: white;
  }

  .caption h3 {
      font-size: 2.2rem;
      font-weight: 600;
      letter-spacing: .3rem;
      //text-shadow: .1rem .1rem .3rem black;
      padding-bottom: 3rem;
  }

  .caption p {
      font-size: 1rem;        
      letter-spacing: .1rem;
     // text-shadow: .1rem .1rem .2rem rgb(154, 153, 153);
      padding-bottom: 1.6rem;
  }

  .padding-text {
      padding: 50px;
  }
  .navbar-brand {
    letter-spacing: 3px;
    font-size: 28px;
    font-weight: bold;
    color: #${item.second.color} !important;
  }
  a:not([href]):not([tabindex]):hover {
    color: black !important;
  }

  .fas {
    font-size: 70px;
    padding-bottom: 14px;
  }

  </style>
  </head>
  <body>
     <!-- Navigation 
      bg-light - odpowiada za kolor tła 
  -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#">` + item.first.title + `</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">`
  item.second.tab.forEach((el) => {
    text += `<li class="nav-item">
                  <a class="nav-link" href="#${el}">${el}</a>
                </li>`
  })

  text += `</ul>
            </div>
          </div>
        </nav>
  
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active" style="background-image: url('${item.third.image}')">
                  <div class="carousel-caption ">
                    <h1 class="display-4">${item.third.heading}</h2>
                    <h3 class="lead">${item.third.description}</h3>`
  if (item.third.valueBattons.length > 1)
    text = text + `<a href="#${item.second.tab[1]}" class="btn btn-outline-light btn-lg" >${item.third.valueBattons[1]}</a>`
  if (item.third.valueBattons.length > 0)
    text = text + `<a href="#${item.second.tab[0]}" style="background-color: #${item.second.color}" class="btn btn-lg ml-3" >${item.third.valueBattons[0]}</a>`
  text = text + `</div>
                </div>              
              </div>
            </div>`
  item.second.tab.forEach((el, i) => {
    if (item.fourth[i].id === '1') {
      text +=
        `<div style="background-color: #${item.second.color}" class="sections text-center" id="${el}">
                  <div class="caption padding-text">
                     <h3 class="display-4">${item.fourth[i].heading}</h3>
                    <p>${item.fourth[i].description}<p>
                  </div>
                </div
                >`
    }
    if (item.fourth[i].id === '2') {
      text +=
        `<div class="caption padding-text text-center" style='color: #827d7e;' id="${el}">
        <h3 class="display-4">${item.fourth[i].heading}</h3>
        <div class="row">
            <div class="col-sm">
                <h5>${item.fourth[i].firstSubtitle}</h5>
                <p>${item.fourth[i].firstcolumn}</p>
            </div>
            <div class="col-sm">
                <h5>${item.fourth[i].secondSubtitle}</h5>
                <p>${item.fourth[i].secondcolumn}</p>
            </div>
            <div class="col-sm">
                <h5>${item.fourth[i].thirdSubtitle}</h5>
                <p>${item.fourth[i].thirdcolumn}</p>
            </div>
        </div>
    </div>`
    }
    if (item.fourth[i].id === '3') {
      text +=
        `<div style='color: #827d7e;' class="section caption padding-text text-center" id="${el}">
          <h3 class="display-4">${item.fourth[i].heading}</h3>
          <div class="row">
              <div class="col-sm">
                  <h1 style="color: #${item.second.color}" class="fas ${item.fourth[i].firstIcon}"></h1>
                  <h5>${item.fourth[i].firstSubtitle}</h5>
                  <p>${item.fourth[i].firstcolumn}</p>
              </div>
              <div  class="col-sm">
                  <h1 style="color: #${item.second.color}"  class="fas ${item.fourth[i].secondIcon}"></h1>
                  <h5>${item.fourth[i].secondSubtitle}</h5>
                  <p>${item.fourth[i].secondcolumn}</p>
              </div>
              <div  class="col-sm">
                  <h1 style="color: #${item.second.color}"  class="fas ${item.fourth[i].thirdIcon} "></h1>
                  <h5>${item.fourth[i].thirdSubtitle}</h5>
                  <p>${item.fourth[i].thirdcolumn}</p>
              </div>
          </div>
        </div>`
    }
  });
  text +=
    ` </body>
  </html>`
  return text;
}