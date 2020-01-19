class GridWorld {
  constructor() {
    this.init()
    this.decisionLoop()
    this.animate()
  }

  init = () => {
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(BACKGROUND_DAY_COLOR)
    this.scene.fog = new THREE.Fog(BACKGROUND_DAY_COLOR, 1, FOG_FAR)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      1,
      CAMERA_FAR
    )
    this.camera.position.set(500, 300, 0)

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.enablePan = false
    this.controls.dampingFactor = 0.05
    this.controls.screenSpacePanning = false
    this.controls.minDistance = 100
    this.controls.maxDistance = 1000
    // controls.minAzimuthAngle = 0
    // controls.maxAzimuthAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2

    this.light1 = new THREE.DirectionalLight(0xffffff)
    this.light1.position.set(1, 1, 1)
    this.scene.add(this.light1)
    this.light3 = new THREE.AmbientLight(0x222222)
    this.scene.add(this.light3)
    this.light4 = new THREE.AmbientLight(0xffe484, 0.2)
    this.scene.add(this.light4)

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.params = {
      crazyThreshold: 0.8,
      decisionInterval: 200,
      treePaintIntensity: 0.25
    }

    this.gui = new dat.GUI({
      height: 5 * 32 - 1
    })

    this.gui.add(this.params, 'crazyThreshold', 0, 1)
    this.gui.add(this.params, 'decisionInterval', 100, 500)
    this.gui.add(this.params, 'treePaintIntensity', 0, 1)

    this.monsterShaderTime = { value: 0 }

    World.getInstance().init(this)
    Monsters.init(this, MONSTER_COUNT)
    Monsters.randomize()

    this.initListeners()
    this.setupNight()
  }

  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = () => {
    this.stats.begin()

    if (this.controls.enabled) this.controls.update()
    TWEEN.update()
    this.monsterShaderTime.value = performance.now() / 1000
    this.render()

    this.stats.end()

    requestAnimationFrame(this.animate)
  }

  decisionLoop = () => {
    Monsters.update()
    window.setTimeout(this.decisionLoop, this.params.decisionInterval)
  }

  initListeners = () => {
    const scope = this

    function onWindowResize() {
      scope.camera.aspect = window.innerWidth / window.innerHeight
      scope.camera.updateProjectionMatrix()
      scope.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize, false)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(0, 0)

    function onMouseMove(event) {
      event.preventDefault()

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    document.addEventListener('mousemove', onMouseMove, false)

    function onMouseDown(evt) {
      evt.preventDefault()

      const { button, shiftKey } = evt

      scope.camera.lookAt(scope.scene.position)
      raycaster.setFromCamera(mouse, scope.camera)

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
                const obj = scope.scene.getObjectByName(name)
                if (obj) scope.scene.remove(obj)
              })

              return
            }
          }

          const intersections = raycaster.intersectObjects(
            World.getInstance().treeGroup.children,
            true
          )
          if (intersections.length === 0) return

          const {
            object: { name }
          } = intersections[0]
          const { r, c } = getRCFromRep(name)

          if (!isWall(r, c)) World.getInstance().removeTree(r, c)

          break
        }
        case RIGHT_CLICK: {
          const intersections = raycaster.intersectObject(World.getInstance().fakePlatformMesh)
          if (intersections.length === 0) return

          const { point } = intersections[0]
          const { r, c } = getRCFromPoint(point)

          if (!isWall(r, c)) {
            if (shiftKey) {
              const newMonster = Monsters.addInstance()
              newMonster.init(scope)
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

      if (evt.keyCode === 113) {
        //Q
        World.getInstance().addRandomTrees()
      } else if (evt.keyCode === 97) {
        //A
        World.getInstance().removeRandomTrees()
      } else if (evt.keyCode === 110) {
        // N
        scope.setupNight()
      } else if (evt.keyCode === 100) {
        scope.setupDay()
      }
    }

    window.addEventListener('keypress', onKeyDown, false)

    toggle.addEventListener(
      'change',
      () => {
        if (toggle.checked) this.setupNight()
        else this.setupDay()
      },
      false
    )
  }

  setupNight = () => {
    if (this.lastTimeNight && performance.now() - this.lastTimeNight < 500) return

    canvas.style.backgroundColor = BACKGROUND_NIGHT_COLOR
    canvas.style.backgroundImage =
      'url(http://www.wallpaperback.net/wp-content/uploads/2018/06/Wallpaper%20night%20sky,%20night%20city,%20earth,%20sky,%20stars,%20clouds,%20light,%20height,%20moon,%20Space%203507713515.jpg)'
    // canvas.style.background = 'repeat top center'
    this.scene.fog.near = 0.1
    this.scene.fog.far = 0
    description.style.color = 'grey'
    toggle.checked = true

    this.lastTimeNight = performance.now()
  }

  setupDay = () => {
    if (this.lastTimeDay && performance.now() - this.lastTimeDay < 500) return

    canvas.style.backgroundColor = BACKGROUND_DAY_COLOR
    canvas.style.backgroundImage =
      'url(https://www.shell.com/energy-and-innovation/the-energy-future/scenarios/shell-scenario-sky/_jcr_content/pagePromo/image.img.960.jpeg/1548184031017/clear-blue-sky.jpeg)'
    this.scene.fog.near = 1
    this.scene.fog.far = FOG_FAR
    description.style.color = 'black'
    toggle.checked = false

    this.lastTimeDay = performance.now()
  }
}
