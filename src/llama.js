
import { Wllama } from '@wllama/wllama';

const CONFIG_PATHS = {
  'single-thread/wllama.wasm': './esm/single-thread/wllama.wasm',
  'multi-thread/wllama.wasm': './esm/multi-thread/wllama.wasm',
};

let llama = null;

async function init1() {
  llama = new Wllama(CONFIG_PATHS);

  const progressCallback = ({ loaded, total }) => {
    const progressPercentage = Math.round((loaded / total) * 100);
    console.log(`Downloading... ${progressPercentage}%`);
  };

  await llama.loadModelFromHF(
    'unsloth/granite-4.0-h-350m-GGUF',
    'granite-4.0-h-350m-UD-Q4_K_XL.gguf',
    {
      progressCallback,
    }
  );

  const outputText = await llama.createChatCompletion(
    [
      { role: "user", content: "What color is the sky?" }
    ],
    {
      nPredict: 50,
      sampling: {
        temp: 0.5,
        top_k: 40,
        top_p: 0.9,
      },
    });
  console.log(outputText);
}

export function init() {
  init1();
}
