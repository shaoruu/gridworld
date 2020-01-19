function WorldProto() {
  this.grid = new Array(DIVISIONS)
  for (let i = 0; i < DIVISIONS; i++) this.grid[i] = new Array(DIVISIONS).fill(0)

  this.wallGroup = new THREE.Group()
  this.treeGroup = new THREE.Group()
}

WorldProto.prototype.init = function(gridworld) {
  this.gridworld = gridworld
  this.initModels()

  /* -------------------------------------------------------------------------- */
  /*                             INITIALIZE PILLARS                             */
  /* -------------------------------------------------------------------------- */
  noise.seed(Math.round(Math.random() * 10000))

  for (let r = -DIVISIONS / 2; r < DIVISIONS / 2; r++)
    for (let c = -DIVISIONS / 2; c < DIVISIONS / 2; c++) {
      if (isWall(r, c)) this.addWall(r, c)
    }

  for (let r = -DIVISIONS / 2 + 1; r < DIVISIONS / 2 - 1; r++) {
    for (let c = -DIVISIONS / 2 + 1; c < DIVISIONS / 2 - 1; c++) {
      const gridVal = this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2]
      if (gridVal === 0) this.removeTree(r, c)
      if (shouldPlant(r, c)) this.addTree(r, c)
    }
  }

  this.gridworld.scene.add(this.wallGroup)
  this.gridworld.scene.add(this.treeGroup)
}

WorldProto.prototype.initModels = function() {
  /* -------------------------------------------------------------------------- */
  /*                                  PLATFORM                                  */
  /* -------------------------------------------------------------------------- */
  // const gridHelper = new THREE.GridHelper(DIMENSION, DIVISIONS)
  // this.gridworld.scene.add(gridHelper)

  const platformGeo = new THREE.PlaneBufferGeometry(DIMENSION, DIMENSION)
  const platformMat = new THREE.MeshLambertMaterial({
    color: PLATFORM_COLOR,
    opacity: 0.5,
    transparent: true
  })
  this.platformMesh = new THREE.Mesh(platformGeo, platformMat)

  // this.platformMesh.position.y = TREE_HEIGHT / 4
  this.platformMesh.rotation.x = -Math.PI / 2
  this.fakePlatformMesh = this.platformMesh.clone()
  this.fakePlatformMesh.position.y = TREE_HEIGHT / 4
  this.fakePlatformMesh.material = this.fakePlatformMesh.material.clone()
  this.fakePlatformMesh.material.opacity = 0

  this.gridworld.scene.add(this.platformMesh)
  this.gridworld.scene.add(this.fakePlatformMesh)

  /* -------------------------------------------------------------------------- */
  /*                                    TREES                                   */
  /* -------------------------------------------------------------------------- */
  const geo = new THREE.Geometry()
  const level1 = new THREE.ConeGeometry(1.5, 2, 8)
  level1.faces.forEach(f => f.color.set(LEAVES_COLOR))
  level1.translate(0, 4, 0)
  geo.merge(level1)

  const level2 = new THREE.ConeGeometry(2, 2, 8)
  level2.faces.forEach(f => f.color.set(LEAVES_COLOR))
  level2.translate(0, 3, 0)
  geo.merge(level2)

  const level3 = new THREE.ConeGeometry(3, 2, 8)
  level3.faces.forEach(f => f.color.set(LEAVES_COLOR))
  level3.translate(0, 2, 0)
  geo.merge(level3)

  const trunk = new THREE.CylinderGeometry(0.5, 0.5, 2)
  trunk.faces.forEach(f => f.color.set(TRUNK_COLOR))
  trunk.translate(0, 0, 0)
  geo.merge(trunk)

  this.treeProtoMesh = new THREE.Mesh(
    new THREE.BufferGeometry().fromGeometry(geo),
    new THREE.MeshLambertMaterial({
      vertexColors: THREE.VertexColors
    })
  )
  this.treeProtoMesh.scale.set(TREE_SCALE, TREE_SCALE, TREE_SCALE)

  /* -------------------------------------------------------------------------- */
  /*                                    WALLS                                   */
  /* -------------------------------------------------------------------------- */
  const wallGeo = new THREE.BoxBufferGeometry(TREE_DIM, TREE_HEIGHT, TREE_DIM)
  const wallMat = new THREE.MeshLambertMaterial({ color: WALL_COLOR })
  this.wallProtoMesh = new THREE.Mesh(wallGeo, wallMat)
}

WorldProto.prototype.addRandomTrees = function() {
  for (let r = -DIVISIONS / 2 + 1; r < DIVISIONS / 2 - 1; r++) {
    for (let c = -DIVISIONS / 2 + 1; c < DIVISIONS / 2 - 1; c++) {
      if (Math.random() > 1 - this.gridworld.params.treePaintIntensity) this.addTree(r, c)
    }
  }
}

WorldProto.prototype.removeRandomTrees = function() {
  for (let r = -DIVISIONS / 2 + 1; r < DIVISIONS / 2 - 1; r++) {
    for (let c = -DIVISIONS / 2 + 1; c < DIVISIONS / 2 - 1; c++) {
      if (Math.random() > 1 - this.gridworld.params.treePaintIntensity) this.removeTree(r, c)
    }
  }
}

WorldProto.prototype.registerMonster = function(r, c) {
  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 0
  this.removeTree(r, c)
}

WorldProto.prototype.addTree = function(r, c) {
  const obj = this.getInGroup(r, c)
  if (obj) this.removeInGroup(obj)

  // const treeMesh = new THREE.Mesh(treeGeo, treeMat)
  const treeMesh = this.treeProtoMesh.clone()
  moveToPositionOnGrid(treeMesh, r, c)

  treeMesh.name = getTreeName(r, c)
  this.treeGroup.add(treeMesh)

  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 1
}

WorldProto.prototype.addWall = function(r, c) {
  const wallMesh = this.wallProtoMesh.clone()
  moveToPositionOnGrid(wallMesh, r, c)
  wallMesh.name = getTreeName(r, c)

  this.wallGroup.add(wallMesh)

  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 1
}

WorldProto.prototype.removeTree = function(r, c) {
  const obj = this.getInGroup(r, c)
  if (obj) this.treeGroup.remove(obj)
  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 0
}

WorldProto.prototype.getValAt = function(r, c) {
  return this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2]
}

WorldProto.prototype.update = function() {}

WorldProto.prototype.getInGroup = function(r, c) {
  const obj = this.treeGroup.getObjectByName(getTreeName(r, c))
  return obj
}

WorldProto.prototype.removeInGroup = function(obj) {
  this.treeGroup.remove(obj)
}

const World = (function() {
  let instance = null

  return {
    getInstance() {
      if (!instance) instance = new WorldProto()
      return instance
    }
  }
})()
