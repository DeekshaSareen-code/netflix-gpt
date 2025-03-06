import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_GPT_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
