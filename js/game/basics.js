/* -------------------------------------------------------------------------- */
/*                               SCENE CREATION                               */
/* -------------------------------------------------------------------------- */
const scene = new THREE.Scene()
scene.background = new THREE.Color(BACKGROUND_COLOR)
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 1, FOG_FAR)

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
  CAMERA_FAR
)
camera.position.set(500, 300, 0)

/* -------------------------------------------------------------------------- */
/*                               ORBIT CONTROLS                               */
/* -------------------------------------------------------------------------- */
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.enablePan = false
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 100
controls.maxDistance = 1000
// controls.minAzimuthAngle = 0
// controls.maxAzimuthAngle = 0
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

/* -------------------------------------------------------------------------- */
/*                                STATS DAT GUI                               */
/* -------------------------------------------------------------------------- */
const stats = new Stats()
document.body.appendChild(stats.dom)

const params = {
  crazyThreshold: 0.8
}

const gui = new dat.GUI({
  height: 5 * 32 - 1
})

gui.add(params, 'crazyThreshold', 0, 1)

/* -------------------------------------------------------------------------- */
/*                                FONT LOADING                                */
/* -------------------------------------------------------------------------- */
// const fontLoader = new THREE.FontLoader()
// fontLoader.load('../../assets/fonts/helvetiker_regular.typeface.json', function(font) {
//   console.log(font)
//   const titleGeo = new THREE.TextBufferGeometry('Gridworld', {
//     font,
//     size: 30,
//     height: 10
//     // curveSegments: 12,
//     // bevelEnabled: true,
//     // bevelThickness: 10,
//     // bevelSize: 8,
//     // bevelOffset: 0,
//     // bevelSegments: 5
//   })
//   titleGeo.center()
//   const titleMat = new THREE.MeshLambertMaterial({
//     color: TITLE_COLOR
//   })
//   const titleMesh = new THREE.Mesh(titleGeo, titleMat)

//   titleMesh.rotation.y = Math.PI / 2
//   titleMesh.position.y = 100
//   titleMesh.position.x = -DIMENSION / 2

//   scene.add(titleMesh)
// })
