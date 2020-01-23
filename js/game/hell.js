class Hell extends Implementor {
  constructor() {
    super()
  }

  setBackground = () => {
    const img = new Image()
    img.src = 'assets/hell.jpg'
    img.onload = () => (canvas.style.backgroundImage = `url(${img.src})`)
  }

  setDescriptionColor = () => {
    description.style.color = 'maroon'
  }

  setFog = gridworld => {
    gridworld.scene.fog.near = 0.1
    gridworld.scene.fog.far = 0
  }

  setToggle = () => (toggle.checked = true)

  setMonsterColor = () => {
    Monsters.setColor(MONSTER_HELL_COLOR)
  }

  setTreeColor = () => {
    treeMat.color.set(TREE_HELL_COLOR)
  }
}
