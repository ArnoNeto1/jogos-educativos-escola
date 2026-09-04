import { directions, keys } from './constants.js'
import Sokoban from './Sokoban.js'

const levelLabel = document.querySelector('#level-label')
const actionButton = document.querySelector('#action-button')

const updateLevelLabel = () => {
  levelLabel.textContent = sokoban.currentLevelName()
}

const updateActionButton = () => {
  actionButton.textContent =
    sokoban.won && !sokoban.isLastLevel() ? 'Próxima fase ▶' : 'Reiniciar fase'
}

// init
const sokoban = new Sokoban({ level: 1 })
sokoban.render({ restart: true })
updateLevelLabel()
updateActionButton()

// re-render
document.addEventListener('keydown', (event) => {
  const playerCoords = sokoban.findPlayerCoords()

  switch (event.key) {
    case keys.up:
    case keys.w:
      sokoban.move(playerCoords, directions.up)
      break
    case keys.down:
    case keys.s:
      sokoban.move(playerCoords, directions.down)
      break
    case keys.left:
    case keys.a:
      sokoban.move(playerCoords, directions.left)
      break
    case keys.right:
    case keys.d:
      sokoban.move(playerCoords, directions.right)
      break
    default:
  }

  sokoban.render()
  updateActionButton()
})

actionButton.addEventListener('click', () => {
  if (sokoban.won && !sokoban.isLastLevel()) {
    sokoban.nextLevel()
    sokoban.render()
  } else {
    sokoban.render({ restart: true })
  }
  updateLevelLabel()
  updateActionButton()
})
