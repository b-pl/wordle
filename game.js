import Dictionary from './dictionary.js';
import Stats from './stats.js';

class Game {
  constructor() {
    // pobieranie danych z localStorage w przypadku niedokończonej gry
    this.localDictionary = Dictionary
    this.answerWord = this.drawWord().toUpperCase().split('')
    this.userWord = ''
    this.stats = new Stats();
    this.timesGuessed = 0;
    // run timer
    this.stats.timer.start();
  }

  // returns random int from 0 to max
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // picks one word from dictionary and sets it as Answer
  drawWord() {
    return this.localDictionary[this.getRandomInt(this.localDictionary.length)]
  }

  // get User word and save it to variables
  setUserWord(word) {
    this.userWord = word
  }

  /**
   * Checks if games is won
   * @returns true if all letters are in correct position || response object w/ correctPosition/inWord tiles ids
   */
  isWon() {
    this.timesGuessed = this.timesGuessed + 1;
    const res = [];

    // Mark letters in correctPosition or inWord
    for (let [index, letterObj] of this.userWord.entries()) {
      if (letterObj.letter === this.answerWord[index]) res.push({id: letterObj.tileId, letter: letterObj.letter, type: 'correctPosition'})
      else if (this.answerWord.includes(letterObj.letter)) res.push({id: letterObj.tileId, letter: letterObj.letter, type: 'inWord'})
    }

    // Count correctPositions and return true or array
    const isWon = res.reduce((acc, curr) => {
      if (curr.type === 'correctPosition') acc += 1;
        return acc;
    }, 0) === 5 ? true : res

    // If game's won
    if (isWon === true) this.updateStatsGameWon();

    // If game's lost
    if (this.timesGuessed === 6) this.updateStatsGameLost();
    
    // If game contninues
    return isWon;
  }

  resetGame() {
    this.answerWord = this.drawWord().toUpperCase().split('');
    this.userWord = '';
    this.stats.setStats({
      timesLost: this.stats.stats.timesLost + 1,
      currentWinStreak: 0
    }, true);
    this.stats.timer.reset();

    return;
  }

  updateStatsGameWon() {
    console.log('updateStatsGameWon')
    const updatesStats = {
      lowTime: this.stats.stats.lowTime === 0 ?
               this.stats.stats.currentTime : 
               (this.stats.stats.currentTime < this.stats.stats.lowTime ? this.stats.stats.currentTime : this.stats.stats.lowTime),

      highTime: this.stats.stats.highTime === 0 ?
                this.stats.stats.currentTime :
                (this.stats.stats.currentTime > this.stats.stats.highTime ? this.stats.stats.currentTime : this.stats.stats.highTime),

      timesWon: this.stats.stats.timesWon + 1,
      currentWinStreak: this.stats.stats.currentWinStreak + 1,
      highestWinStreak: (this.stats.stats.currentWinStreak + 1) > this.stats.stats.highestWinStreak ? 
                        this.stats.stats.currentWinStreak + 1 :
                        this.stats.stats.highestWinStreak,

      [`guess${this.timesGuessed}`]: this.stats.stats[`guess${this.timesGuessed}`] + 1
    }

    return this.stats.setStats({...updatesStats}, true);
  }

  updateStatsGameLost() {
    console.log('updateStatsGameLost')
    const updatedStats = {
      timesLost: this.stats.stats.timesLost + 1,
      currentWinStreak: 0,
    }

    return this.stats.setStats({...updatedStats});
  }

  // DEBUG
  // return Answer word array
  _getWord() {
    return this.answerWord
  }

  _setAnswer(word) {
    return this.answerWord = word;
  }
}

  export default Game