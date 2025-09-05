import mongoose from "mongoose";

// Base Page Schema
const baseOptions = {
  discriminatorKey: "slug", // 👈 mongoose will separate schemas based on slug
  collection: "pages",
};

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
  },
  baseOptions
);

export const Page = mongoose.model("Page", pageSchema);

// ---------------- HOME PAGE ----------------
const homeSchema = new mongoose.Schema({
  sections: {
    whatNext: {
      title: String,
      subtitle: [String],
      image: String,
    },
    insights: {
      title: String,
      imageLeft: String,
      imageRight: String,
      paragraph: String,
      button: { text: String, href: String },
    },
    whyNow: {
      title: String,
      points: [String],
      video: String,
      buttons: [{ text: String, href: String, bg: String, textColor: String }],
    },
    pharmaLeadership: {
      title: String,
      cards: [{ img: String, heading: String, description: String }],
      ctaTitle: String,
      ctaButtons: [{ text: String, href: String }],
    },
  },
});

export const HomePage = Page.discriminator("home-page", homeSchema);

// ---------------- ABOUT PAGE ----------------
const newsletterSchema = new mongoose.Schema({
  sections: {
    // Trends Section
    trends: {
      items: [
        {
          heading: String,
          description: String,
          img: String, // e.g. "/shop/uprising.svg"
          isReverse: Boolean,
          buttons: [
            {
              text: String,
              href: String,
              bg: String,
              textColor: String,
            },
          ],
        },
      ],
    },

    // References / Newsletters Section
    references: {
      title: String,
      items: [
        {
          heading: String,
          doc: String,
        },
      ],
    },
  },
});

export const AboutPage = Page.discriminator("newsletter", newsletterSchema);
// ---------------- CONTACT PAGE ----------------
const contactSchema = new mongoose.Schema({
  sections: {
    // Trends Section
    aboutMe: {
      title: String,
      myName: String,
      position: String,
      intro: [String],
      aboutPharma: String,
    },
  },
});

export const ContactPage = Page.discriminator("contact", contactSchema);
// ---------------- THINK-TANKS PAGE ----------------
const thinkTanksSchema = new mongoose.Schema({
  sections: {
    // Product Cut Section
    productCut: {
      title: String,
      subtitle: String,
      cards: [
        {
          description: String,
          title: String,
          subtitle: String,
          img: String,
          isReverse: Boolean,
        },
      ],
    },
  },
});

export const ThinkTanksPage = Page.discriminator(
  "think-tanks",
  thinkTanksSchema
);

// ---------------- QNA PAGE ----------------
const qnaSchema = new mongoose.Schema({
  sections: {
    // Product Cut Section
    qna: {
      title: String,
      subtitle: String,
      img: String,
      questions: [
        {
          heading: [String],
          question: String,
          answer: String,
          img: String,
        },
      ],
    },
  },
});

export const QnaPage = Page.discriminator("qna", qnaSchema);
