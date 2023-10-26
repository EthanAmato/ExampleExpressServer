import express from "express";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors"; // import the cors package

config();
// Config object lets us connect with OpenAI
const configuration = new Configuration({
  apiKey: process.env.VITE_API_KEY,
});

delete configuration.baseOptions.headers["User-Agent"];
const openai = new OpenAIApi(configuration);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your front-end's actual domain
  })
);
app.use(express.json());

app.post("/api/story", async (req, res) => {
  try {
    const response = await openai.createChatCompletion(req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
