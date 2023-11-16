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
    this.start();
  }

  getTime() {
    return this.currentTime;
  }

  getFormattedTime(timeToFormat) {
    const time = timeToFormat ? timeToFormat : this.currentTime

    if (time < 10) return `0:0${time}`;
    if (time > 10 && time < 60) return `0:${time}`;
  
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
  
    return `${minutes}:${secondsFormatted}`;
  }
}

export default Timer