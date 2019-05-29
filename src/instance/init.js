import initState from './initState'
export default function init (Game) {
  const { prototype: proto } = Game
  proto.init = function () {
    const gm = this
    initState(gm)
  }
}
