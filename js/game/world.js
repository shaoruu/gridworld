function WorldProto() {
  this.grid = new Array(DIVISIONS)
  for (let i = 0; i < DIVISIONS; i++) this.grid[i] = new Array(DIVISIONS).fill(0)

  this.wallGroup = new THREE.Group()
  this.pillarGroup = new THREE.Group()
}

WorldProto.prototype.init = function() {
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
      const value = getSimplex(r, c)
      if (value >= 0.5 - NOISE_RANGE / 2 && value <= 0.5 + NOISE_RANGE / 2) this.addPillar(r, c)
    }
  }

  scene.add(this.wallGroup)
  scene.add(this.pillarGroup)
}

WorldProto.prototype.registerMonster = function(r, c) {
  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 0
  this.removePillar(r, c)
}

WorldProto.prototype.addPillar = function(r, c) {
  const obj = this.getInGroup(r, c)
  if (obj) return

  // const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat)
  const pillarMesh = treeMesh.clone()
  moveToPositionOnGrid(pillarMesh, r, c)

  pillarMesh.name = getPillarName(r, c)
  this.pillarGroup.add(pillarMesh)

  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 1
}

WorldProto.prototype.addWall = function(r, c) {
  const wallMesh = new THREE.Mesh(pillarGeo, wallMat)
  moveToPositionOnGrid(wallMesh, r, c)
  wallMesh.name = getPillarName(r, c)

  this.wallGroup.add(wallMesh)

  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 1
}

WorldProto.prototype.removePillar = function(r, c) {
  const obj = this.getInGroup(r, c)
  if (obj) this.pillarGroup.remove(obj)
  this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2] = 0
}

WorldProto.prototype.getValAt = function(r, c) {
  return this.grid[r + DIVISIONS / 2][c + DIVISIONS / 2]
}

WorldProto.prototype.update = function() {}

WorldProto.prototype.getInGroup = function(r, c) {
  const obj = this.pillarGroup.getObjectByName(getPillarName(r, c))
  return obj
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
