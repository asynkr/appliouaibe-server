var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function(req, res) {
  res.send("Hello " + req.url);
});


app.get("/test/*", function(req, res) {
  res.json({ "msg": req.url.substr(6) })
});

app.get("/testQuery", function(req, res) {
  res.json(req.query)
});

let count = 0;
app.get("/cpt/query", function(req, res) {
  res.json(count);
});

app.get("/cpt/inc*", function(req, res) {
  let v = req.query.v;

  if (typeof v === "undefined") {
    // No "v" in query
    count++;
    return res.json({ "code": 0 });
  }

  let vNumber = parseInt(v);
  if (isNaN(vNumber)) {
    // "v" is not a number
    return res.json({ "code": -1 });
  }

  count += vNumber;
  return res.json({ "code": 0 });
});



var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// get
app.get("/msg/get/*", function(req, res) {

  if (/^\d+$/.test(req.url.substr(9))) {
    let msgIndex = parseInt(req.url.substr(9));

    if (allMsgs[msgIndex] !== undefined) {
      return res.json({ "code": 1, "msg": allMsgs[int_url] });
    }
    // else: On a un int, mais qui dépasse la taille du tableau
  }
  res.json({ "code": 0 });
});

// post
app.get("/msg/post/*", function(req, res) {
  const msg = unescape(req.url.substr(10));
  allMsgs.push(msg);
  res.json(allMsgs.length - 1);
});

// getAll
app.get("/msg/getAll", function(req, res) {
  res.json(allMsgs);
});

// nber
app.get("/msg/nber", function(req, res) {
  res.json(allMsgs.length);
});

// del
app.get("/msg/del/*", function(req, res) {
  if (/^\d+$/.test(req.url.substr(9))) {
    let msgIndex = parseInt(req.url.substr(9));

    if (allMsgs[msgIndex] !== undefined) {
      allMsgs.splice(msgIndex, 1);
      return res.json({ "code": 1 });
    }
  }

  return res.json({ "code": 0 });
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");