const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const http = require("http");

const authRoute = require("./src/api/routes/authRoutes");
const userRoute = require("./src/api/routes/userRoutes");
const imageUploadRoute = require("./src/api/routes/imageUploadRoute");
const categoryImageRoute = require("./src/api/routes/categoryImageRoute");
const productRoute = require("./src/api/routes/product");
const profileImageRoute = require("./src/api/routes/userImageRoute");

const app = express();

dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
	fileUpload({
		useTempFiles: true,
	}),
);

// Define your allowCors middleware function
const allowCors = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT",
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	);
	next();
};

// creating the connection with database
mongoose
	.connect(process.env.URL)
	.then(() => {
		console.log("Database Connection Succeeded 🔥");
	})
	.catch((err, res) => {
		console.log("Database Connection Failed ❌ - Error: " + err);
	});

// middleware
app.use(express.json());

// Use the allowCors middleware for all routes
app.use(allowCors);

app.get("/", (req, res) => {
	res.send("Welcome to Travel Bee");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(productRoute);
app.use("/api", imageUploadRoute);
app.use("/api", categoryImageRoute);
app.use("/api/user", profileImageRoute);

// creating the port connection with the backend server
const port = process.env.PORT || 5000;

app.listen(port || 5000, () => {
	console.log("Server listening on port " + port || 5000, "🔥");

	// var options = {
	// 	port: port,
	// 	host: "ctms-api.vercel.app",
	// };

	// var request = http.request(options);

	// request.setHeader("Cookie", ["type=ninja", "language=javascript"]);
	// // request.setHeader('content-type', 'text/html');

	// request.end();
});
