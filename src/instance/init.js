import initState from './state'
export default function (Game, proto) {
  proto._init = function () {
    const gm = this
    initState(gm)
    gm.score = 4
  }
}
