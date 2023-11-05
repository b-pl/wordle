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
      correctPositionTileId: [],
      inWordTileId: []
    }

    for (let [index, letterObj] of this.userWord.entries()) {
      if (letterObj.letter === this.answerWord[index]) response.correctPositionTileId.push(letterObj.tileId)
      else if (this.answerWord.includes(letterObj.letter)) response.inWordTileId.push(letterObj.tileId)
    }

    if (response.correctPositionTileId.length === 5) return true

    return response
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