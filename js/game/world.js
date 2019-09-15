function WorldProto() {
  this.grid = new Array(divisions)
  for (let i = 0; i < divisions; i++) this.grid[i] = new Array(divisions).fill(0)
}

WorldProto.prototype.init = function() {
  /* -------------------------------------------------------------------------- */
  /*                             INITIALIZE PILLARS                             */
  /* -------------------------------------------------------------------------- */
  noise.seed(Math.round(Math.random() * 10000))

  for (let r = 0; r < divisions; r++)
    for (let c = 0; c < divisions; c++)
      this.grid[r][c] = Number(r === divisions - 1 || r === 0 || c == divisions - 1 || c === 0)

  for (let r = 1; r < divisions - 1; r++) {
    for (let c = 1; c < divisions - 1; c++) {
      const value = (noise.perlin2(r / 5, c / 5) + 1) / 2
      if (value >= 0.48 && value <= 0.52) this.grid[r][c] = 1
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               DRAWING PILLARS                              */
  /* -------------------------------------------------------------------------- */
  this.pillarGroup = new THREE.Group()
  for (let r = -divisions / 2; r < divisions / 2; r++) {
    for (let c = -divisions / 2; c < divisions / 2; c++) {
      const value = this.grid[r + divisions / 2][c + divisions / 2]
      if (value === 0) continue

      this.addPillar(r, c)
    }
  }
  scene.add(this.pillarGroup)
}

WorldProto.prototype.registerMonster = function(r, c) {
  this.grid[r + divisions / 2][c + divisions / 2] = 0
  this.removePillar(r, c)
}

WorldProto.prototype.addPillar = function(r, c) {
  const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat)
  moveToPositionOnGrid(pillarMesh, r, c)

  pillarMesh.name = getPillarName(r, c)
  this.pillarGroup.add(pillarMesh)
}

WorldProto.prototype.removePillar = function(r, c) {
  const obj = this.pillarGroup.getObjectByName(getPillarName(r, c))
  if (obj) this.pillarGroup.remove(obj)
  console.log(r, c)
}

WorldProto.prototype.getValAt = function(r, c) {
  return this.grid[r + divisions / 2][c + divisions / 2]
}

WorldProto.prototype.update = function() {}

const World = (function() {
  let instance = null

  return {
    getInstance() {
      if (!instance) instance = new WorldProto()
      return instance
    }
  }
})()
