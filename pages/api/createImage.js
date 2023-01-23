import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  try {
    const response = await openai.createImage({
      prompt: `Artistically create an image that represents a dream with the following prompt: ${req.body.prompt}`, // this is where the prompts is, the request.
      n: 1,
      size: '1024x1024',
    });
    console.log(response.data.data[0].url);
    const imgURL = response.data.data[0].url;
    res.status(200).json({ result: imgURL }); // send back the URL to the image generated
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to get the image from openai');
  }
}
