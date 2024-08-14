import OpenAI from "openai";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const openai = new OpenAI({
    apiKey: "",
  });

const allowedSizes = ["1024x1024", "1792x1024", "1024x1792"];

async function main() {
  let n = NaN;
  let imageSize = "";

  do {
    let answer = await rl.question('Number of images? (1-10)\n> ');
    n = parseInt(answer);
  } while (n > 10 || n <= 0 || isNaN(n));

  do {
    imageSize = await rl.question('Image size? (1024x1024, 1792x1024, 1024x1792")\n> ');
  } while (allowedSizes.indexOf(imageSize) == -1);

  const prompt = await rl.question('> ');

  const response = await openai.images.generate({
    model: "dall-e-3",
    n: n,
    size: imageSize,
    prompt: prompt
  });

    console.log(response.data[0].url);
}
main();