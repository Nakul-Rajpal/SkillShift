import "./styles.css";

import QueryForm from "./components/QueryForm";
import useText from "./hooks/useText";
import { useEffect } from "react";

function App() {
  const { text, textError, textIsLoading } = useText("", "chatroom-image");

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div>
      {(textIsLoading) && <div className="spinner-border" />}
      <br />
      <QueryForm />
      <br />
    </div>
  );
}

export default App;

/**
 * <QueryForm />
      <br />
      <ChatRoom />
 */
