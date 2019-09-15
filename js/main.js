const pillarGeo = new THREE.BoxBufferGeometry(pillarDim, pillarHeight, pillarDim)
const pillarMat = new THREE.MeshLambertMaterial({ color: 0x112233 })

for (let r = -divisions / 2; r < divisions / 2; r++) {
  for (let c = -divisions / 2; c < divisions / 2; c++) {
    const value = defaultMap[r + divisions / 2][c + divisions / 2]
    if (value === 0) continue

    const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat)
    moveToPositionOnGrid(pillarMesh, r, c)

    scene.add(pillarMesh)
  }
}

const gridHelper = new THREE.GridHelper(dimension, divisions)
scene.add(gridHelper)
