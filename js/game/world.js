function WorldProto() {
  this.grid = new Array(DIVISIONS)
  for (let i = 0; i < DIVISIONS; i++) this.grid[i] = new Array(DIVISIONS).fill(0)

  this.wallGroup = new THREE.Group()
  this.treeGroup = new THREE.Group()
}

WorldProto.prototype.init = function(isDefault = false) {
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
      if (isDefault ? gridVal === 1 : shouldPlant(r, c)) this.addTree(r, c)
    }
  }

  scene.add(this.wallGroup)
  scene.add(this.treeGroup)
}

WorldProto.prototype.addRandomTrees = function() {
  for (let r = -DIVISIONS / 2 + 1; r < DIVISIONS / 2 - 1; r++) {
    for (let c = -DIVISIONS / 2 + 1; c < DIVISIONS / 2 - 1; c++) {
      if (Math.random() > 1 - params.treePaintIntensity) this.addTree(r, c)
    }
  }
}

WorldProto.prototype.removeRandomTrees = function() {
  for (let r = -DIVISIONS / 2 + 1; r < DIVISIONS / 2 - 1; r++) {
    for (let c = -DIVISIONS / 2 + 1; c < DIVISIONS / 2 - 1; c++) {
      if (Math.random() > 1 - params.treePaintIntensity) this.removeTree(r, c)
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
  const treeMesh = treeProtoMesh.clone()
  moveToPositionOnGrid(treeMesh, r, c)

  treeMesh.name = getTreeName(r, c)
  this.treeGroup.add(treeMesh)

  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 1
}

WorldProto.prototype.addWall = function(r, c) {
  const wallMesh = new THREE.Mesh(treeGeo, wallMat)
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
