function moveToPositionOnGrid(mesh, r, c) {
  const mappedPos = getMappedPosition(r, c)
  mesh.position.x = mappedPos.r
  mesh.position.y = PILLAR_HEIGHT / 2
  mesh.position.z = mappedPos.c
}

function tweenToPositionOnGrid(mesh, r, c, delay = 200) {
  const mappedPos = getMappedPosition(r, c)

  new TWEEN.Tween(mesh.position).to({ x: mappedPos.r, z: mappedPos.c }, delay).start()
}

function tweenToRotation(mesh, rotation, delay = 200) {
  new TWEEN.Tween(mesh.rotation).to({ y: rotation }, delay).start()
}

function getMappedPosition(r, c) {
  const rr = r * PILLAR_DIM + PILLAR_DIM / 2
  const cc = -(c * PILLAR_DIM + PILLAR_DIM / 2)
  return { r: rr, c: cc }
}

function getPillarName(r, c) {
  return `${r}::${c}`
}

function getRCRep(r, c) {
  return getPillarName(r, c)
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
