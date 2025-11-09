
import { Wllama } from '@wllama/wllama';

const CONFIG_PATHS = {
  'single-thread/wllama.wasm': './esm/single-thread/wllama.wasm',
  'multi-thread/wllama.wasm': './esm/multi-thread/wllama.wasm',
};

let llama = new Wllama(CONFIG_PATHS);

export function loadModel(mid, file, onProg) {
  const progressCallback = ({ loaded, total }) => {
    const progressPercentage = Math.round((loaded / total) * 100);
    onProg(progressPercentage);
  };

  llama.loadModelFromHF(mid, file, { progressCallback });
}

export function createCompletion(messages, cb) {
  const conf = {
    nPredict: 50,
    sampling: {
      temp: 0.5,
      top_k: 40,
      top_p: 0.9,
    },
  };

  llama.createChatCompletion(messages, conf)
    .then((text) => {
      cb(text);
    });
}
