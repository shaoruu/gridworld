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

function onMouseDown(evt) {
  evt.preventDefault()

  const { button } = evt

  camera.lookAt(scene.position)
  raycaster.setFromCamera(mouse, camera)

  let row, column

  switch (button) {
    case LEFT_CLICK: {
      const intersections = raycaster.intersectObjects(
        World.getInstance().pillarGroup.children,
        true
      )
      if (intersections.length === 0) return

      const {
        object: { name }
      } = intersections[0]
      const { r, c } = getRCFromRep(name)

      if (!isWall(r, c)) World.getInstance().removePillar(r, c)

      break
    }
    case RIGHT_CLICK: {
      const intersections = raycaster.intersectObject(platformMesh)
      if (intersections.length === 0) return

      const { point } = intersections[0]
      const { r, c } = getRCFromPoint(point)

      if (!isWall(r, c)) World.getInstance().addPillar(r, c)
      break
    }
  }
}

window.addEventListener('mousedown', onMouseDown, false)
