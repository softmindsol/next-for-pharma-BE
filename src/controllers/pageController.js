import { Page } from "../models/Page.js";

export const getPage = async (req, res) => {
  console.log("👉 [getPage] API called");
  console.log("👉 [getPage] req.params:", req.params);

  try {
    console.log("👉 [getPage] Searching page with slug:", req.params.slug);
    const page = await Page.findOne({ slug: req.params.slug });

    if (!page) {
      console.warn("⚠️ [getPage] Page not found for slug:", req.params.slug);
      return res.status(404).json({ message: "Page not found" });
    }

    console.log("✅ [getPage] Page found:", page);
    res.json(page);
  } catch (err) {
    console.error("❌ [getPage] Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updatePage = async (req, res) => {
  console.log("👉 [updatePage] API called");
  console.log("👉 [updatePage] req.params:", req.params);
  console.log("👉 [updatePage] req.body:", req.body);

  try {
    console.log("👉 [updatePage] Updating page with slug:", req.params.slug);
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, upsert: true }
    );

    console.log("✅ [updatePage] Page updated/created:", page);
    res.json(page);
  } catch (err) {
    console.error("❌ [updatePage] Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
};
