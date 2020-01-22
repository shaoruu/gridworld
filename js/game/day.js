class Day extends Implementor {
  constructor() {
    super()
  }

  setBackground = () => {
    const img = new Image()
    img.src = 'assets/day.png'
    img.onload = () => (canvas.style.backgroundImage = `url(${img.src})`)
  }

  setDescriptionColor = () => {
    description.style.color = 'black'
  }

  setFog = gridworld => {
    gridworld.scene.fog.near = 1
    gridworld.scene.fog.far = FOG_FAR
  }

  setToggle = () => (toggle.checked = false)

  setMonsterColor = () => {
    Monsters.setColor(MONSTER_DAY_COLOR)
  }
}
