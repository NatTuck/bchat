import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { createCompletion } from './llama';

export default function Chat({ title, reset }) {
  const [msgs, setMsgs] = useState([
    {
      role: "system",
      content: "Talk like a pirate."
    }
  ]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  let msgsView = msgs
    .filter((msg) => msg.role != "system")
    .map((msg, ii) => <Message msg={msg} key={ii} />);

  function send(ev) {
    ev.preventDefault();
    let mm = { role: "user", content: msg + "/no_think" };
    const ms = [...msgs, mm];

    createCompletion(ms, (msg) => {
      let mm2 = { role: "assistant", content: msg };
      const ms2 = [...ms, mm2];
      setMsgs(ms2);
      setBusy(false);
    });

    setMsgs(ms);
    setMsg("");
    setBusy(true);
  }

  let formView = (
    <Form onSubmit={send}>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="textarea"
          value={msg}
          onChange={(ev) => setMsg(ev.target.value)}

        />
      </Form.Group>
      <Button onClick={send}>
        Send
      </Button>
    </Form>
  );

  if (busy) {
    formView = (<p>Thinking...</p>);
  }

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <h1>Chat</h1>
      <p><strong>{title}</strong></p>

      {msgsView}

      {formView}
    </>
  );
}

function Message({ msg }) {
  let { role, content } = msg;
  content = content.replace("<think>", "");
  content = content.replace("</think>", "");
  content = content.replace("/no_think", "");
  return (<p>({role}) {content}</p>);
}
