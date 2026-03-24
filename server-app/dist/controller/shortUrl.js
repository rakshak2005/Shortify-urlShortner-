"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../model/shortUrl");
// Create new short URL
const createUrl = async (req, res) => {
    try {
        const { fullUrl } = req.body;
        if (!fullUrl) {
            return res.status(400).send({ message: "fullUrl is required" });
        }
        const existing = await shortUrl_1.urlModel.findOne({ fullUrl });
        if (existing) {
            return res.status(409).send(existing);
        }
        const shortUrl = await shortUrl_1.urlModel.create({ fullUrl });
        return res.status(201).send(shortUrl);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "something went wrong" });
    }
};
exports.createUrl = createUrl;
// Get all URLs
const getAllUrl = async (req, res) => {
    try {
        const urls = await shortUrl_1.urlModel.find();
        if (!urls || urls.length === 0) {
            return res.status(404).send({ message: "No short urls found" });
        }
        return res.status(200).send(urls);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "something went wrong" });
    }
};
exports.getAllUrl = getAllUrl;
// Redirect by shortUrl
const getUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params; // must match router name
        if (!shortUrl) {
            return res.status(400).send({ message: "Missing shortUrl param" });
        }
        const url = await shortUrl_1.urlModel.findOne({ shortUrl });
        if (!url) {
            return res.status(404).send({ message: "Short URL not found" });
        }
        url.clicks++;
        await url.save();
        return res.redirect(url.fullUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
};
exports.getUrl = getUrl;
// Delete by MongoDB _id
const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ message: "Missing id" });
        const deleted = await shortUrl_1.urlModel.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send({ message: "URL deleted successfully" });
        }
        else {
            return res.status(404).send({ message: "URL not found" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "something went wrong" });
    }
};
exports.deleteUrl = deleteUrl;
