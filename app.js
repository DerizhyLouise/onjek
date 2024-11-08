import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api", routes);

app.use("/maincss", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/style/main.css"));
});
app.use("/main", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/script/main.js"));
});
app.use("/homescript", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/script/home.js"));
});
app.use("/loginscript", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/script/login.js"));
});
app.use("/registerscript", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/script/register.js"));
});
app.use("/food", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/assets/food.jpg"));
});

app.use("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/home/index.html"));
});
app.use("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/login/index.html"));
});
app.use("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/register/index.html"));
});
app.use("/onride", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/onride/index.html"));
});
app.use("/oncar", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/oncar/index.html"));
});
app.use("/shop", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/shop/index.html"));
});
app.use("/product", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/app/product/index.html"));
});

app.get("/", (req, res) => {
	const htmlPath = path.join(__dirname, "/public/app/home/index.html");
	fs.readFile(htmlPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading the file:", err);
			res.status(500).send("Internal Server Error");
		} else {
			res.setHeader("Content-Type", "text/html");
			res.send(data);
		}
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log("Server ready on port:", PORT));
