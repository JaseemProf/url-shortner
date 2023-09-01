import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import randomstring from "randomstring";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  await mongoose.connect(process.env.MONGOOSE_URL);
} catch (error) {
  handleError(error);
}

const urlSchema = mongoose.Schema({
  longUrl: String,
  shortUrl: String,
});

const Url = mongoose.model("Url", urlSchema);

app.post("/postdata", async (req, res) => {
  const { url } = req.body;
  const randStr = randomstring.generate(7);
  const data = await Url.find({ longUrl: url }).exec();
  try {
    res.send(data[0].shortUrl);
  } catch (e) {
    const newUrl = new Url({
      longUrl: url,
      shortUrl: randStr,
    });
    await newUrl.save();
    res.send(randStr);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Url.find({ shortUrl: id }).exec();
  try {
    res.redirect(data[0].longUrl);
  } catch (e) {
    res.send("Not Found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on  port ${port}`);
});
