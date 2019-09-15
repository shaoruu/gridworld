function moveToPositionOnGrid(mesh, r, c) {
  const mappedPos = getMappedPosition(r, c)
  mesh.position.x = mappedPos.r
  mesh.position.y = pillarHeight / 2
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
  const rr = r * pillarDim + pillarDim / 2
  const cc = -(c * pillarDim + pillarDim / 2)
  return { r: rr, c: cc }
}

function getPillarName(r, c) {
  return `${r}::${c}`
}
