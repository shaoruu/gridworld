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

  const { button, shiftKey } = evt

  camera.lookAt(scene.position)
  raycaster.setFromCamera(mouse, camera)

  switch (button) {
    case LEFT_CLICK: {
      if (shiftKey) {
        const monsterInc = raycaster.intersectObjects(Monsters.getMeshes(), true)

        if (monsterInc.length > 0) {
          const {
            object: {
              parent: { name }
            }
          } = monsterInc[0]
          const monsterInstance = Monsters.getInstanceByName(name)

          Monsters.removeInstance(name)
          tweenToPositionOnGrid(monsterInstance.mesh, 0, 0, 300).onComplete(() => {
            const obj = scene.getObjectByName(name)
            if (obj) scene.remove(obj)
          })

          return
        }
      }

      const intersections = raycaster.intersectObjects(World.getInstance().treeGroup.children, true)
      if (intersections.length === 0) return

      const {
        object: { name }
      } = intersections[0]
      const { r, c } = getRCFromRep(name)

      if (!isWall(r, c)) World.getInstance().removeTree(r, c)

      break
    }
    case RIGHT_CLICK: {
      const intersections = raycaster.intersectObject(platformMesh)
      if (intersections.length === 0) return

      const { point } = intersections[0]
      const { r, c } = getRCFromPoint(point)

      if (!isWall(r, c)) {
        if (shiftKey) {
          const newMonster = Monsters.addInstance()
          newMonster.init()
          newMonster.setCoords(r, c)
        } else World.getInstance().addTree(r, c)
      }
      break
    }
  }
}

window.addEventListener('mousedown', onMouseDown, false)

function onKeyDown(evt) {
  evt.preventDefault()

  // Z
  if (evt.keyCode === 122) {
    World.getInstance().grid = JSON.parse(JSON.stringify(DEFAULT_MAP))
    World.getInstance().init(true)
  } else if (evt.keyCode === 113) {
    //Q
    World.getInstance().addRandomTrees()
  } else if (evt.keyCode === 97) {
    //A
    World.getInstance().removeRandomTrees()
  }
}

window.addEventListener('keypress', onKeyDown, false)
