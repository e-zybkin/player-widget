import Player from "../Player/Player";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.page}>
      <Player audioSrc="/audio/The Messenger.mp3" />
    </div>
  );
}

export default App;
