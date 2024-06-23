import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import playerStore from "../../stores/PlayerStore";

import {
  Headline,
  Image,
  SimpleCell,
  Footnote,
  IconButton,
} from "@vkontakte/vkui";

import {
  Icon16MoreVertical,
  Icon20Play,
  Icon20Pause,
  Icon20GraphOutline,
} from "@vkontakte/icons";

import cover from "../../assets/cover.png";

import styles from "./Player.module.css";

interface props {
  audioSrc: string;
}

const Player = observer(({ audioSrc }: props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimeUpdate = (): void => {
    playerStore.setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handlePlay = (): void => {
    audioRef.current && audioRef.current.play();
    playerStore.setIsPlaying(true);
  };

  const handlePause = (): void => {
    audioRef.current && audioRef.current.pause();
    playerStore.setIsPlaying(false);
  };

  const handleEnded = (): void => {
    playerStore.setIsPlaying(false);
    playerStore.setCurrentTime(0);
  };

  const handlePlayPause = (): void => {
    if (playerStore.isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const formatTime = (timer: number): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement?.addEventListener("timeupdate", handleTimeUpdate);
    audioElement?.addEventListener("ended", handleEnded);

    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement?.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <SimpleCell
      className={styles["music-card"]}
      before={
        <Image
          className={styles.pic}
          src={cover}
          alt="обложка"
          size={40}
          borderRadius="m"
          onClick={handlePlayPause}
        >
          {playerStore.isPlaying && (
            <Image.Overlay
              aria-label="Музыкальные волны"
              theme="dark"
              visibility="always"
            >
              <Icon20GraphOutline />
            </Image.Overlay>
          )}
          <Image.Overlay aria-label="Кнопка Проигрывания/Паузы">
            {playerStore.isPlaying ? <Icon20Pause /> : <Icon20Play />}
          </Image.Overlay>
        </Image>
      }
      after={
        <div className={styles["after-block"]}>
          <Footnote className={styles.timer}>
            {formatTime(playerStore.currentTime)}
          </Footnote>
          <IconButton label="Меню">
            <Icon16MoreVertical />
          </IconButton>
        </div>
      }
      subtitle={<Footnote>Linkin Park</Footnote>}
    >
      <Headline level="1">The Messenger</Headline>
      <audio ref={audioRef} src={audioSrc} />
    </SimpleCell>
  );
});

export default Player;
