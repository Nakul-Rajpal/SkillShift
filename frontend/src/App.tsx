import "./App.css";

import QueryForm from "./components/QueryForm";
import useImage from "./hooks/useImage";
import useText from "./hooks/useText";
import { useEffect } from "react";

function App() {
  const { image, imgError, imgIsLoading } = useImage("");
  const { text, textError, textIsLoading } = useText("", "chatroom-image");

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div>
      {(imgIsLoading || textIsLoading) && <div className="spinner-border" />}
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
