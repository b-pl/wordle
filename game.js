const dictionary = [
  'DOMEK'.split(''),
  // 'RYSIK'.split(''),
  // 'KOZAK'.split('')
]

class Game {
  constructor() {
    // pobieranie danych z localStorage w przypadku niedokończonej gry
    // pobranie słownika haseł
    this.localDictionary = dictionary
    this.answerWord = this.drawWord()
    this.userWord = ''
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
  isWon = () => {
    const response = {
      correctPositionTile: [],
      inWordTile: []
    }

    const res = [];

    // for (let [index, letterObj] of this.userWord.entries()) {
    //   if (letterObj.letter === this.answerWord[index]) response.correctPositionTile.push({id: letterObj.tileId, letter: letterObj.letter})
    //   else if (this.answerWord.includes(letterObj.letter)) response.inWordTile.push({id: letterObj.tileId, letter: letterObj.letter})
    // }
    for (let [index, letterObj] of this.userWord.entries()) {
      if (letterObj.letter === this.answerWord[index]) res.push({id: letterObj.tileId, letter: letterObj.letter, type: 'correctPosition'})
      else if (this.answerWord.includes(letterObj.letter)) res.push({id: letterObj.tileId, letter: letterObj.letter, type: 'inWord'})
    }

    if (response.correctPositionTile.length === 5) return true

    // return response
    return res
  }

  resetGame() {
    console.log('xD')
  }

  // DEBUG
  // return Answer word array
  _getWord() {
    return this.answerWord
  }
}

export default Game