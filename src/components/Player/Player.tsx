import { useState, useRef, useEffect } from "react";

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

function Player({ audioSrc }: props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimeUpdate = (): void => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handlePlay = (): void => {
    audioRef.current && audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = (): void => {
    audioRef.current && audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleEnded = (): void => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePlayPause = (): void => {
    if (isPlaying) {
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
          {isPlaying && (
            <Image.Overlay
              aria-label="Музыкальные волны"
              theme="dark"
              visibility="always"
            >
              <Icon20GraphOutline />
            </Image.Overlay>
          )}
          <Image.Overlay aria-label="Кнопка Проигрывания/Паузы">
            {isPlaying ? <Icon20Pause /> : <Icon20Play />}
          </Image.Overlay>
        </Image>
      }
      after={
        <div className={styles["after-block"]}>
          <Footnote className={styles.timer}>
            {formatTime(currentTime)}
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
}

export default Player;
