// world
const leaves = new THREE.ConeBufferGeometry(10, 20, 64)
const trunk = new THREE.CylinderBufferGeometry(3, 3, 10, 15)
const leavesMat = new THREE.MeshPhongMaterial({ color: 0x008800, flatShading: true })
const trunkMat = new THREE.MeshPhongMaterial({ color: 0xac7339, flatShading: true })
for (let i = 0; i < treeCount; i++) {
  const leavesMesh = new THREE.Mesh(leaves, leavesMat)
  const x = Math.random() * DIMENSION - DIMENSION / 2
  const z = Math.random() * DIMENSION - DIMENSION / 2

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
