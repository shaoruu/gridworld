const scene = new THREE.Scene()
scene.background = new THREE.Color(0xcccccc)
scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false)

const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 1, 1000)
camera.position.set(400, 200, 0)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 100
controls.maxDistance = 500
controls.maxPolarAngle = Math.PI / 2

// world
const leaves = new THREE.ConeBufferGeometry(10, 20, 64)
const trunk = new THREE.CylinderBufferGeometry(3, 3, 10, 15)
const leavesMat = new THREE.MeshPhongMaterial({ color: 0x008800, flatShading: true })
const trunkMat = new THREE.MeshPhongMaterial({ color: 0xac7339, flatShading: true })
for (let i = 0; i < treeCount; i++) {
  const leavesMesh = new THREE.Mesh(leaves, leavesMat)
  const x = Math.random() * dimension - dimension / 2
  const z = Math.random() * dimension - dimension / 2

  leavesMesh.position.x = x
  leavesMesh.position.y = 20
  leavesMesh.position.z = z
  leavesMesh.updateMatrix()
  leavesMesh.matrixAutoUpdate = false

  const trunkMesh = new THREE.Mesh(trunk, trunkMat)

  trunkMesh.position.x = x
  trunkMesh.position.y = 5
  trunkMesh.position.z = z
  trunkMesh.updateMatrix()
  trunkMesh.matrixAutoUpdate = false

  scene.add(leavesMesh)
  scene.add(trunkMesh)
}

// lights
const light1 = new THREE.DirectionalLight(0xffffff)
light1.position.set(1, 1, 1)
scene.add(light1)
const light2 = new THREE.DirectionalLight(0x002288)
light2.position.set(-1, -1, -1)
scene.add(light2)
const light3 = new THREE.AmbientLight(0x222222)
scene.add(light3)

var divisions = 50

var gridHelper = new THREE.GridHelper(dimension, divisions)
scene.add(gridHelper)

function render() {
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render()
}

animate()
