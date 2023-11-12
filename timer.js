class Timer {
  constructor() {
    this.currentTime = 0;
    this.timer = undefined;
  }

  increaseTime() {
    // console.log(this.currentTime)
    // debug
    document.querySelector('.debug_timer').textContent = this.getFormattedTime();

    this.currentTime += 1;
  }

  start(startTime) {
    this.currentTime = startTime ? startTime : this.currentTime;
    this.timer = setInterval(() => { this.increaseTime() }, 1000);

    return
  }

  stop() {
    return clearInterval(this.timer);
  }

  reset() {
    this.stop();
    this.currentTime = 0;
    this.start();1
  }

  getTime() {
    return this.currentTime;
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