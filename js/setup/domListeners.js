function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2(0, 0)
const onClickPosition = new THREE.Vector2()

function onMouseMove(event) {
  event.preventDefault()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

document.addEventListener('mousemove', onMouseMove, false)

function onMouseClick(evt) {
  evt.preventDefault()

  camera.lookAt(scene.position)
  raycaster.setFromCamera(mouse, camera)

  const intersections = raycaster.intersectObjects(
    World.getInstance().pillarGroup.children,
    true
  )
  const { object } = intersections.length > 0 ? intersections[0] : {}

  if (!object) return

  const { r, c } = getRCFromRep(object.name)

  World.getInstance().removePillar(r, c)
}

window.addEventListener('click', onMouseClick, false)
