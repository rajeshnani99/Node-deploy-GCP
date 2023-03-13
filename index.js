/** @format */

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const BrandName = require("./model");
app.use(express.json());
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("DB Connection Successful!");
	})
	.catch((err) => console.log(err));

app.get("/getallbrands", async (req, res) => {
	try {
		const alldata = await BrandName.find();
		return res.json(alldata);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/getallbrands/:id", async (req, res) => {
	try {
		const data = await BrandName.findById(req.params.id);
		return res.json(data);
	} catch (err) {
		console.log(err.message);
	}
});

app.post("/addBrands", async (req, res) => {
	const { brandName } = req.body;

	try {
		const newData = new BrandName({ brandName });
		await newData.save();
		return res.json(await BrandName.find());
	} catch (err) {
		console.log(err.message);
	}
});

app.delete("/deleteBrand/:id", async (req, res) => {
	try {
		await BrandName.findByIdAndDelete(req.params.id);
		return res.json(await BrandName.find());
	} catch (err) {
		console.log(err.message);
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log("server running");
});
