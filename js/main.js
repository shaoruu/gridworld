function init() {
  World.getInstance().init()
  Monsters.init(MONSTER_COUNT)
  Monsters.randomize()
}

function render() {
  renderer.render(scene, camera)
}

function animate() {
  stats.begin()

  if (controls.enabled) controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  TWEEN.update()

  monsterShaderTime.value = performance.now() / 1000

  render()

  stats.end()

  requestAnimationFrame(animate)
}

init()
animate()

function decisionLoop() {
  Monsters.update()
  window.setTimeout(decisionLoop, params.decisionInterval)
}

decisionLoop()
