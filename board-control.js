import Game from './game.js'

class BoardControl {
  constructor() {
    this.game = undefined;
    this.activeTileId = 1;
    this.activeRowId = 1;
    this.correctPositions = [];
    this.inWordPositions = [];
    this.userInputResults = [];
  }

  /**
   * Updates activeTileId; false - decrement; true - increment 
   * @param {bool} increment 
   */
  updateActiveTileId(increment) {
    // console.log(`updated tile id from ${this.activeTileId}`)
    if (increment) this.activeTileId += 1;
    else this.activeTileId -= 1;
    // console.log(`to ${this.activeTileId}`)

    return
  }

  updateActiveRowId() {
    return this.activeRowId += 1;
  } 

  /**
   * Clears text-content for tile
   * @param {element} tile 
   */
  clearTile(tile) {
    return tile.textContent = '';
  }

  /**
   * Toggles data-is_active attribute
   * @param {array} elements - array of selectors to toggle data-is_active attribute
   */
  toggleActiveAttribute(elements) {
    // console.group('toggleActiveAttribute')
    // console.log(tiles)
    // console.groupEnd('toggleActiveAttribute')
    elements.forEach((element) => {
      if (element.getAttribute('data-is_active') === 'true') element.setAttribute('data-is_active', 'false')
      else element.setAttribute('data-is_active', 'true')
    })

    return
  }

  /**
   * Sets active tile
   * Clears tile
   * @param {bool} position - true -> next / false -> prev
   * @param {bool} goToNextRow 
   */
  setActiveTile(position, goToNextRow) {
    const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
    const isRowActive = activeTile.parentElement.getAttribute('data-is_active') === 'true' ? true : false;

    if (!position) {
      const prevTile = this.activeTileId - 1 !== 0 && isRowActive ? document.querySelector(`[data-tile_id="${this.activeTileId - 1}"]`) : false;
      const tileToClear = activeTile.textContent ? activeTile : (prevTile.parentElement.getAttribute('data-is_active') === 'true' ? prevTile : false );
      console.group('setActiveTile')
      console.log(`@params: position = ${position}, goToNextRow = ${goToNextRow}`)
      console.log(`function consts: activeTile = ${activeTile.getAttribute('data-tile_id')}, isRowActive = ${isRowActive}`)
      console.log(`!position consts: prevTile = ${prevTile.getAttribute('data-tile_id')}, tileToClear = ${tileToClear.getAttribute('data-tile_id')}`)
      console.groupEnd('setActiveTile')
      if (tileToClear) this.clearTile(tileToClear);
      if (!prevTile) return;

      this.toggleActiveAttribute([prevTile, activeTile]);
      this.updateActiveTileId(0);

      return
    }

    // set next tile as active
    if (position && ((this.activeTileId % 5 !== 0 ) || goToNextRow)) {
      const nextTile = document.querySelector(`[data-tile_id="${this.activeTileId + 1}"]`);
      this.toggleActiveAttribute([activeTile, nextTile])
      this.updateActiveTileId(1);
      if (goToNextRow) {
        const currentRow = document.querySelector(`[data-row_id="${this.activeRowId}"]`);
        const nextRow = document.querySelector(`[data-row_id="${this.activeRowId + 1}"]`);
        this.updateActiveRowId();
        this.toggleActiveAttribute([currentRow, nextRow])
      }

      return
    }
  }

  isRowComplete() {
    let isComplete = true;
    const tiles = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile`);

    for (let tile of tiles) {
      if (tile.textContent === '') {
        isComplete = false;
        break;
      }
    }

    return isComplete
  }

  markTilesAndKeys() {
    const rowIndexInArray = this.activeRowId - 1;
    const userInputRowInArray = this.userInputResults[rowIndexInArray];
    // console.log(userInputRowInArray)
    const uniqueinWordPositionsRowInArray = userInputRowInArray.sort((a, b) => a.type > b.type ? 1 : -1).reduce((accumulator, current) => {
      if (!accumulator.find((item) => item.letter === current.letter)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    for (let el of uniqueinWordPositionsRowInArray) {
      if (el.type === 'correctPosition') {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-inCorrectPosition', 'true');

        // to do funkcji
        // przy correctPosition wykrywać czy key jest oznaczony jako inWord -> jeśli tak to zmienić na correctPosition
        const keyboardKey = document.querySelector(`.keyboard_key[value="${el.letter.toLowerCase()}"]`);
        if (keyboardKey && !keyboardKey.getAttribute('data-marked')) {
          keyboardKey.setAttribute('data-marked', 'true');
          keyboardKey.setAttribute('data-inCorrectPosition', 'true');
        }
      } else {
        document.querySelector(`[data-tile_id="${el.id}"]`).setAttribute('data-inWord', 'true');

        const keyboardKey = document.querySelector(`.keyboard_key[value="${el.letter.toLowerCase()}"]`);
        if (keyboardKey && !keyboardKey.getAttribute('data-marked')) {
          keyboardKey.setAttribute('data-marked', 'true');
          keyboardKey.setAttribute('data-inWord', 'true');
        }
      }
    }
  }

  createUserWordArray() {
    const wordArray = []
    const wordTiles = document.querySelectorAll(`[data-row_id="${this.activeRowId}"] .tile`);
    for (let el of wordTiles) {
      const letterObj = {
        letter: el.textContent.toUpperCase(),
        tileId: el.getAttribute('data-tile_id')
      }
      wordArray.push(letterObj);
    }
    console.group(`createUserWordArray`)
    console.log(`wordArray = ${wordArray}`)
    console.groupEnd(`createUserWordArray`)

    return wordArray;
  }

  enterKeyEvent() {
    if (!this.isRowComplete()) return false;
    this.game.setUserWord(this.createUserWordArray())

    const isWon = this.game.isWon();
    console.log(isWon)
    if (isWon === true) return this.gameWon();

    this.userInputResults.push(isWon)

    this.markTilesAndKeys();
    this.setActiveTile(1, true);

    return
  }

  handleKeyboardKeyClick() {
    const keys = document.querySelectorAll('.keyboard_key:not(.keyboard_key--special)');
    const backspaceKey = document.querySelector('.keyboard_key.--backspace');
    const enterKey = document.querySelector('.keyboard_key.--enter');

    keys.forEach((key) => {
      key.addEventListener('click', () => {
        const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
        if (activeTile.textContent !== '') return false

        activeTile.textContent = key.getAttribute('value');
        this.setActiveTile(1);
      })
    })

    backspaceKey.addEventListener('click', () => this.setActiveTile(0));

    enterKey.addEventListener('click', () => this.enterKeyEvent())

    // physical keyboard events
    window.addEventListener('keydown', (e) => {
      // letters
      if (e.code.includes('Key')) {
        const activeTile = document.querySelector(`[data-tile_id="${this.activeTileId}"]`);
        if (activeTile.textContent !== '') return false

        activeTile.textContent = e.key
        this.setActiveTile(1);
      }

      // backspace
      if (e.code === 'Backspace') this.setActiveTile(0)

      // enter
      if (e.code === 'Enter') this.enterKeyEvent()
    })

  }

  gameWon = () => {
    return alert('You\'ve won!')
  }

  init = (game) => {
    this.game = game;

    this.handleKeyboardKeyClick();
  }
}

export default BoardControl