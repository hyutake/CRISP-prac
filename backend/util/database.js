const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const username = "crisp-user";
const password = "coqLDaVngHnfRtKG";

const mongoConnect = (callback) => {
	MongoClient.connect(
		`mongodb+srv://${username}:${password}@cluster0.k09vqz6.mongodb.net/tasks?retryWrites=true&w=majority`
	)
		.then((client) => {
			console.log("Connected!");
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getDB = () => {
	if (_db) {
		return _db;
	}
	throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
