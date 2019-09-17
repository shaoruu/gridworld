function moveToPositionOnGrid(mesh, r, c) {
  const mappedPos = getMappedPosition(r, c)
  mesh.position.x = mappedPos.r
  mesh.position.y = TREE_HEIGHT / 2
  mesh.position.z = mappedPos.c
}

function tweenToPositionOnGrid(mesh, r, c, delay = 200) {
  const mappedPos = getMappedPosition(r, c)

  return new TWEEN.Tween(mesh.position).to({ x: mappedPos.r, z: mappedPos.c }, delay).start()
}

function tweenToRotation(mesh, rotation, delay = 200) {
  new TWEEN.Tween(mesh.rotation).to({ y: rotation }, delay).start()
}

function getMappedPosition(r, c) {
  const rr = r * TREE_DIM + TREE_DIM / 2
  const cc = -(c * TREE_DIM + TREE_DIM / 2)
  return { r: rr, c: cc }
}

function getTreeName(r, c) {
  return `${r}::${c}`
}

function getRCRep(r, c) {
  return getTreeName(r, c)
}

function getPerlin(r, c) {
  return (noise.perlin2(r / PERLIN_SCALE, c / PERLIN_SCALE) + 1) / 2
}

function getSimplex(r, c) {
  return (noise.simplex2(r / SIMPLEX_SCALE, c / SIMPLEX_SCALE) + 1) / 2
}

function getMousePosition(dom, x, y) {
  var rect = dom.getBoundingClientRect()
  return [(x - rect.left) / rect.width, (y - rect.top) / rect.height]
}

function getRCFromRep(rep) {
  const rc = rep.split('::').map(ele => parseInt(ele))
  return { r: rc[0], c: rc[1] }
}

function getRCFromPoint({ x, z }) {
  const r = Math.floor(x / TREE_DIM)
  const c = Math.floor(-z / TREE_DIM)
  return { r, c }
}

function shouldPlant(r, c) {
  const value = getSimplex(r, c)
  return value >= 0.5 - NOISE_RANGE / 2 && value <= 0.5 + NOISE_RANGE / 2
}

function isWall(r, c) {
  return (
    r === DIVISIONS / 2 - 1 ||
    r === -DIVISIONS / 2 ||
    c === DIVISIONS / 2 - 1 ||
    c === -DIVISIONS / 2
  )
}
