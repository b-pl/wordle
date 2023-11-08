import Timer from './timer.js'

const stats = {
  lowTime: 0,
  hightTime: 0,
  timesPlayed: 0,
  timesWon: 0,
  timesLost: 0,
  currentWinStreak: 0,
  highestWinStreak: 0,
  guessDist: [
    {try: 1, times: 0},
    {try: 2, times: 0},
    {try: 3, times: 0},
    {try: 4, times: 0},
    {try: 5, times: 0},
    {try: 6, times: 0}
  ]
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
   * @param {object} stats
   */
  setStats({...stats}) {
    if (stats) {
      this.stats = {...this.stats, ...stats}
    } 
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

}

export default Stats