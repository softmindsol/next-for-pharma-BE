import { Page } from "../models/Page.js";

export const getPage = async (req, res) => {
  console.log("🚀 ~ getPage ~ req.params.slug:", req.params.slug);

  try {
    const page = await Page.findOne({ slug: req.params.slug });
    console.log("🚀 ~ getPage ~ page:", page);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePage = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, upsert: true }
    );
    console.log("🚀 ~ updatePage ~ page:", page);
    res.json(page);
  } catch (err) {
    console.log("🚀 ~ updatePage ~ err:", err);
    res.status(500).json({ message: err.message });
  }
};
