const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
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
