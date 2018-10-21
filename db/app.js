let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let MongoClient = require('mongodb').MongoClient;
let session = require('client-sessions');

const util = require('util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	cookieName: 'session',
	secret: 'dubhacks yas 2018',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

class Person {
	constructor(username, password, email) {
		this.username = username;
		this.password = password;
		this.email = email;
	}
}

let server = app.listen(3000, function () {
	console.log("app running on port.", server.address().port);
});

let dev_db_url = 'mongodb://dubhacks2018:WVsf6I9ywakurZZlYmAZSiU9I88AYGof2fNzSN2uTJWgelvJ5QbUWLx7oB7tCcta0N34phJsWXjjafvGer160g%3D%3D@dubhacks2018.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
const client = util.promisify(MongoClient.connect);
let a = null;
let db = null;
let User = null;
setup();

async function setup() {
	a = await client(dev_db_url, { useNewUrlParser: true })
	db = a.db("dubhacks2018");
	User = db.collection("users");
}

app.post('/register', async (req, res) => {
	username = req.body.username;
	password = req.body.password;
	email = req.body.email;
	console.log(username)
	console.log(req)
	person = new Person(username, password, email);

	try {
		let result = await User.insertOne(person).promise;
	} catch (err) {
		console.log(err);
		res.err("Error");
	}
	res.status(200).send("Registered Successfully!");
})

app.get("/logout", function (req, res) {
	req.session.reset();
	res.redirect("/");
});

app.post('/login', async (req, res) => {
	username = req.body.username;
	password = req.body.password;
	try {
		try {
			let user = await User.findOne(
				{ username: username, password: password });
			if (user) {
				req.session.user = user;
				res.status(200).send("Logged In Successfully!");
			} else {
				res.status(403).send("Forbidden");
			}
			console.log(user);
		} catch (err) {
			console.log(err);
			res.err("Error in login");
		}
	} catch (err) {
		console.log(err);
		res.err("Connection error");
	}
});

app.use(function (req, res, next) {
	if (req.session && req.session.user) {
		User.findOne({ username: req.session.user.username }, function (err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				req.session.user = user;  //refresh the session value
				res.locals.user = user;
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

function requireLogin (req, res, next) {
	if (!req.user) {
	  res.redirect('/login');
	} else {
	  next();
	}
  };