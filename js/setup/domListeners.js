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

// function onMouseClick(evt) {
//   evt.preventDefault()

//   camera.lookAt(scene.position)
//   raycaster.setFromCamera(mouse, camera)

//   const intersections = raycaster.intersectObjects(
//     World.getInstance().pillarGroup.children,
//     true
//   )
//   const { object } = intersections.length > 0 ? intersections[0] : {}

//   if (!object) return

//   const { r, c } = getRCFromRep(object.name)
//   console.log(r, c)

//   World.getInstance().removePillar(r, c)
// }

function onMouseClick(button) {
  camera.lookAt(scene.position)
  raycaster.setFromCamera(mouse, camera)

  const intersections = raycaster.intersectObject(platformMesh)
  if (intersections.length === 0) return

  const { point } = intersections[0]
  const { r, c } = getRCFromPoint(point)

  if (!isWall(r, c)) {
    switch (button) {
      case LEFT_CLICK:
        World.getInstance().removePillar(r, c)
        break
      case RIGHT_CLICK:
        World.getInstance().addPillar(r, c)
        break
    }
  }
}

window.addEventListener(
  'click',
  e => {
    e.preventDefault()
    onMouseClick(LEFT_CLICK)
  },
  false
)
window.addEventListener(
  'contextmenu',
  e => {
    e.preventDefault()
    onMouseClick(RIGHT_CLICK)
  },
  false
)
