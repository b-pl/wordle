class Timer {
  constructor() {
    this.currentTime = 0;
    this.timer = undefined;
  }

  getTime() {
    return this.currentTime;
  }

  increaseTime() {
    console.log(this.currentTime)
    this.currentTime += 1
  }

  start(startTime) {
    this.currentTime = startTime ? startTime : this.currentTime;
    this.timer = setInterval(() => { this.increaseTime() }, 1000);

    return
  }

  stop() {
    return clearInterval(this.timer);
  }

  getFormattedTime() {
    if (this.currentTime < 10) return `0:0${this.currentTime}`;
    if (this.currentTime > 10 && this.currentTime < 60) return `0:${this.currentTime}`;
  
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime - minutes * 60;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
  
    return `${minutes}:${secondsFormatted}`;
  }
}

export default Timer