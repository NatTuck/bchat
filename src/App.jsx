import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';

import { loadModel } from './llama';
import Chat from './chat';

//const default_mid = "unsloth/Qwen3-0.6B-GGUF";
//const default_fpa = "Qwen3-0.6B-UD-Q4_K_XL.gguf";
const default_mid = 'unsloth/granite-4.0-h-350m-GGUF';
const default_fpa = 'granite-4.0-h-350m-UD-Q4_K_XL.gguf';

function App() {
  const [modelId, setModelId] = useState(default_mid);
  const [filePath, setFilePath] = useState(default_fpa);
  const [progress, setProgress] = useState(null);

  function reset(ev) {
    ev.preventDefault()
    setProgress(null);
  }

  if (progress && progress == 100) {
    return <Chat title={`${modelId}:${filePath}`} reset={reset} />
  }

  if (progress) {
    return <ShowProgress
      progress={progress}
      modelId={modelId}
      filePath={filePath} />;
  }

  function ch(setFn) {
    return (ev) => {
      setFn(ev.target.value);
    };
  }

  function load(ev) {
    ev.preventDefault();
    loadModel(modelId, filePath, setProgress);
  }

  return (
    <>
      <h1>Bchat</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Model ID</Form.Label>
          <Form.Control
            type="text"
            value={modelId}
            onChange={ch(setModelId)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>File Path</Form.Label>
          <Form.Control
            type="text"
            value={filePath}
            onChange={ch(setFilePath)} />
        </Form.Group>
        <Button variant="primary" onClick={load}>
          Launch
        </Button>
      </Form>
    </>
  )
}

function ShowProgress({ modelId, filePath, progress }) {
  return (
    <div>
      <p>Progress for #{modelId} / {filePath}.</p>
      <p>{progress} %</p>
    </div>
  );
}

export default App
