const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const config = require('./config');

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(
		config.MONGO_URL
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