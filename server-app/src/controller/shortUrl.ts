import express from "express";
import { urlModel } from "../model/shortUrl";

type IdParam = { id: string };

// Create new short URL
export const createUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      return res.status(400).send({ message: "fullUrl is required" });
    }

    const existing = await urlModel.findOne({ fullUrl });
    if (existing) {
      return res.status(409).send(existing);
    }

    const shortUrl = await urlModel.create({ fullUrl });
    return res.status(201).send(shortUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};

// Get all URLs
export const getAllUrl = async (req: express.Request, res: express.Response) => {
  try {
    const urls = await urlModel.find();
    if (!urls || urls.length === 0) {
      return res.status(404).send({ message: "No short urls found" });
    }
    return res.status(200).send(urls);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};

// Redirect by shortUrl
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { shortUrl } = req.params;   // must match router name
    if (!shortUrl) {
      return res.status(400).send({ message: "Missing shortUrl param" });
    }

    const url = await urlModel.findOne({ shortUrl });
    if (!url) {
      return res.status(404).send({ message: "Short URL not found" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.fullUrl!);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};


// Delete by MongoDB _id
export const deleteUrl = async (req: express.Request<IdParam>, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Missing id" });

    const deleted = await urlModel.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send({ message: "URL deleted successfully" });
    } else {
      return res.status(404).send({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};
