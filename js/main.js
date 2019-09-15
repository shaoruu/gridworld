function init() {
  World.getInstance().init()
  Monsters.init(MONSTER_COUNT)
  Monsters.randomize()
}

function render() {
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)

  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  TWEEN.update()

  monsterShaderTime.value = performance.now() / 1000

  render()
}

init()
animate()

setInterval(() => {
  Monsters.update()
}, MONSTER_DECISION_INTERVAL)
