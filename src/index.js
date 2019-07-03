import './assets/index.scss'
import Game2048 from './instance/index'

const Game = window.Game = () => new Game2048()

Game()
