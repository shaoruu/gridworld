/* -------------------------------------------------------------------------- */
/*                               SCENE CREATION                               */
/* -------------------------------------------------------------------------- */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xcccccc)
scene.fog = new THREE.Fog(0xcccccc, 1, fogFar)

/* -------------------------------------------------------------------------- */
/*                              RENDERER CREATION                             */
/* -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

/* -------------------------------------------------------------------------- */
/*                               CAMERA CREATION                              */
/* -------------------------------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
  60,
  canvas.offsetWidth / canvas.offsetHeight,
  1,
  cameraFar
)
camera.position.set(400, 200, 0)

/* -------------------------------------------------------------------------- */
/*                               ORBIT CONTROLS                               */
/* -------------------------------------------------------------------------- */
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 100
controls.maxDistance = 1000
controls.maxPolarAngle = Math.PI / 2

/* -------------------------------------------------------------------------- */
/*                                   LIGHTS                                   */
/* -------------------------------------------------------------------------- */
const light1 = new THREE.DirectionalLight(0xffffff)
light1.position.set(1, 1, 1)
scene.add(light1)
const light2 = new THREE.DirectionalLight(0x002288)
light2.position.set(-1, -1, -1)
scene.add(light2)
const light3 = new THREE.AmbientLight(0x222222)
scene.add(light3)

function render() {
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render()
}

animate()
