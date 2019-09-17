function MonsterProto(index) {
  this.r = 0
  this.c = 0

  this.cache = {}

  this.name = `monster-${index}`
  this.mesh = monsterMesh.clone()
  this.mesh.name = this.name
}

MonsterProto.prototype.init = function() {
  scene.add(this.mesh)
}

MonsterProto.prototype.sense = function() {
  const surroundings = []

  /**
   * [
   *  0, 1, 2,
   *  3, x, 4,
   *  5, 6, 7
   * ]
   */

  for (let c = this.c + 1; c >= this.c - 1; c--) {
    for (let r = this.r - 1; r <= this.r + 1; r++) {
      if (r === this.r && c === this.c) continue
      surroundings.push(World.getInstance().getValAt(r, c))
    }
  }

  return {
    top: !surroundings[1] && !surroundings[0],
    right: !surroundings[4] && !surroundings[2],
    bottom: !surroundings[6] && !surroundings[7],
    left: !surroundings[3] && !surroundings[5],
    data: surroundings
  }
}

MonsterProto.prototype.decide = function(sensed) {
  const crazyFactor = Math.random()

  let decision = null

  const rationallyDecide = (isLatter = false) => {
    if (sensed.top && !sensed.right) decision = MOVE_UP
    else if (sensed.right && !sensed.bottom) decision = MOVE_RIGHT
    else if (sensed.bottom && !sensed.left) decision = MOVE_DOWN
    else if (isLatter || (sensed.left && !sensed.top)) decision = MOVE_LEFT
  }

  const irrationallyDecide = (isLatter = false) => {
    // DEFAULT FALLBACK
    if (!sensed.data[1]) decision = MOVE_UP
    else if (!sensed.data[4]) decision = MOVE_RIGHT
    else if (!sensed.data[6]) decision = MOVE_DOWN
    else if (isLatter || !sensed.data[3]) decision = MOVE_LEFT
  }

  if (crazyFactor < params.crazyThreshold) {
    rationallyDecide()
    if (!decision) irrationallyDecide(true)
  } else {
    irrationallyDecide()
    if (!decision) rationallyDecide(true)
  }

  return decision
}

MonsterProto.prototype.act = function(decision) {
  let rotation

  switch (decision) {
    case MOVE_UP:
      if (this.c + 1 !== DIVISIONS / 2 - 1) this.c++
      rotation = Math.PI
      break
    case MOVE_RIGHT:
      if (this.r + 1 !== DIVISIONS / 2 - 1) this.r++
      rotation = Math.PI / 2
      break
    case MOVE_DOWN:
      if (this.c - 1 !== -DIVISIONS / 2 - 1) this.c--
      rotation = 0
      break
    case MOVE_LEFT:
      if (this.r - 1 !== -DIVISIONS / 2 - 1) this.r--
      rotation = -Math.PI / 2
      break
  }

  tweenToPositionOnGrid(this.mesh, this.r, this.c)
  tweenToRotation(this.mesh, rotation)

  if (!isWall(this.r, this.c)) {
    World.getInstance().removePillar(this.r, this.c)
  }
}

MonsterProto.prototype.update = function() {
  this.act(this.decide(this.sense()))
}

MonsterProto.prototype.setCoords = function(r, c) {
  this.r = r
  this.c = c

  tweenToPositionOnGrid(this.mesh, r, c)
  World.getInstance().registerMonster(r, c)
}

const Monsters = (function() {
  let instances = new Map()

  return {
    getInstances() {
      return instances
    },
    getInstanceByName(name) {
      return instances.get(name)
    },
    getMeshes() {
      const meshes = []
      instances.forEach(monster => meshes.push(monster.mesh))
      return meshes
    },
    addInstance() {
      const newInstance = new MonsterProto(instances.size)

      instances.set(newInstance.mesh.name, newInstance)

      return newInstance
    },
    removeInstance(name) {
      instances.delete(name)
    },
    init(count) {
      for (let i = 0; i < count; i++) this.addInstance().init()
    },
    randomize() {
      instances.forEach(m => {
        const r = Math.floor(Math.random() * (DIVISIONS - 2) - DIVISIONS / 2 + 1)
        const c = Math.floor(Math.random() * (DIVISIONS - 2) - DIVISIONS / 2 + 1)

        m.setCoords(r, c)
      })
    },
    update() {
      instances.forEach(m => m.update())
    }
  }
})()
