import Timer from './timer.js'

const stats = {
  currentTime: 0,
  lowTime: 0,
  hightTime: 0,
  timesPlayed: 0,
  timesWon: 0,
  timesLost: 0,
  currentWinStreak: 0,
  highestWinStreak: 0,
  guess1: 0,
  guess2: 0,
  guess3: 0,
  guess4: 0,
  guess5: 0,
  guess6: 0
}

class Stats {
  constructor() {
    this.timer = new Timer();

    if (localStorage.getItem('stats') === null) {
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    
    this.stats = {...JSON.parse(localStorage.getItem('stats')), currentTime: this.timer.getTime()}

  }

  /**
   * Save stats to localStorage
   */
  setLocalStorage() {
    return localStorage.setItem('stats', JSON.stringify({...this.stats}))
  }

  /**
   * Sets stats
   * Alternativaly updates localStorage
   * @param {object} stats
   * @param {bool} updateLocalStorage
   */
  setStats({...stats}, updateLocalStorage) {
    if (stats && typeof(stats) === 'object') {
      this.stats = {...this.stats, ...stats}
    }

    if (updateLocalStorage) this.setLocalStorage();

    this._consoleStats();

    return
  }

  /**
   * Returns stats
   * @param {array} stats - array of strings with stat names 
   */
  getStats(stats) {
    if (stats) {
      let response = {};
  
      for (let stat of stats) {
        response = {...response, [stat]: this.stats[stat]}
      }
      return response;
    }
  
    return this.stats;
  }

  _consoleStats() {
    console.group('module stats:')
    for (let [key, value] of Object.entries(this.stats)) {
      console.log(`${key}: ${value}`)
    }
    console.groupEnd('module stats:')

    console.group('localStorage stats:')
    for (let [key, value] of Object.entries(JSON.parse(localStorage.getItem('stats')))) {
      console.log(`${key}: ${value}`)
    }
    console.groupEnd('localStorage stats:')
  }

}

export default Stats