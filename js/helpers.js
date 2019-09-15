function moveToPositionOnGrid(mesh, x, z) {
  mesh.position.x = x * pillarDim + pillarDim / 2
  mesh.position.y = pillarHeight / 2
  mesh.position.z = z * pillarDim + pillarDim / 2
}
