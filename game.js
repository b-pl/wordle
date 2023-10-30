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

  // check correctness of letter positions
  checkWord() {
    if (this.userWord === this.answerWord) return this.gameWon()
    
    const response = {
      isInRightPosition: [],
      isInWord: []
    }

    for (let [index, letter] of this.userWord.entries()) {
      if (letter === this.answerWord[index]) response.isInRightPosition.push(index)
      else if (this.answerWord.includes(letter)) response.isInWord.push(index)
    }

    return response
  }

  gameWon() {
    alert('congrats, you won')
  }

  // DEBUG
  // return Answer word array
  _getWord() {
    return this.answerWord
  }
}

export default Game