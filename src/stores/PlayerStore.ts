import { makeAutoObservable } from "mobx";

class PlayerStore {
  isPlaying = false;
  currentTime = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setIsPlaying(playing: boolean) {
    this.isPlaying = playing;
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }

  reset() {
    this.isPlaying = false;
    this.currentTime = 0;
  }
}

const playerStore = new PlayerStore();
export default playerStore;
