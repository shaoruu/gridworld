/* -------------------------------------------------------------------------- */
/*                                  MONSTERS                                  */
/* -------------------------------------------------------------------------- */
const monsterGeo = new THREE.IcosahedronBufferGeometry(MONSTER_RADIUS)
const monsterMaterial = new THREE.MeshLambertMaterial({ color: MONSTER_COLOR })
const monster = new THREE.Mesh(monsterGeo, monsterMaterial)

const monsterShaderTime = { value: 0 }
monsterMaterial.onBeforeCompile = shader => {
  shader.uniforms.time = monsterShaderTime
  shader.vertexShader =
    `
         uniform float time;
         ` + shader.vertexShader
  const token = '#include <begin_vertex>'
  const customTransform = `
        vec3 transformed = vec3(position);
        transformed.x = position.x 
             + cos(position.y*10.0 + time*10.0) * 5.0;
    `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}

const monsterArrGeo = new THREE.ConeBufferGeometry(MONSTER_RADIUS / 4, MONSTER_RADIUS / 2, 32)
const monsterArrMat = new THREE.MeshLambertMaterial({ color: MONSTER_RAY_ARROW_COLOR })
const monsterArrMesh = new THREE.Mesh(monsterArrGeo, monsterArrMat)

monsterArrMesh.position.set(0, 0, MONSTER_RADIUS)
monsterArrMesh.rotation.set(Math.PI / 2, 0, 0)

const monsterMesh = new THREE.Group()

monsterMesh.add(monster)
monsterMesh.add(monsterArrMesh)
monsterMesh.position.y = MONSTER_RADIUS

/* -------------------------------------------------------------------------- */
/*                                   TREES                                  */
/* -------------------------------------------------------------------------- */
const treeGeo = new THREE.BoxBufferGeometry(TREE_DIM, TREE_HEIGHT, TREE_DIM)
const treeMat = new THREE.MeshLambertMaterial({ color: TREE_COLOR })

const wallMat = new THREE.MeshLambertMaterial({ color: WALL_COLOR })

treeGeo.computeFaceNormals()

/* -------------------------------------------------------------------------- */
/*                                    GRIDS                                   */
/* -------------------------------------------------------------------------- */
const gridHelper = new THREE.GridHelper(DIMENSION, DIVISIONS)
scene.add(gridHelper)

const platformGeo = new THREE.PlaneBufferGeometry(DIMENSION, DIMENSION)
const platformMat = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true })
const platformMesh = new THREE.Mesh(platformGeo, platformMat)

platformMesh.position.y = TREE_HEIGHT / 4
platformMesh.rotation.x = -Math.PI / 2

scene.add(platformMesh)

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

const treeProtoMesh = new THREE.Mesh(
  new THREE.BufferGeometry().fromGeometry(geo),
  new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors
  })
)
treeProtoMesh.scale.set(TREE_SCALE, TREE_SCALE, TREE_SCALE)
