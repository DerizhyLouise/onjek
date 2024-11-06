import mysql2 from "mysql2";

const conn = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "mysql",
	database: "onjek_db",
});

conn.connect((err) => {
	if (err) {
		console.log("Database disconnected");
		console.error(err);
	} else {
		console.log("Database is connected");
	}
});

export { conn };
