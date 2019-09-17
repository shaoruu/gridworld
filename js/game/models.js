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

const monsterArrGeo = new THREE.ConeBufferGeometry(
  MONSTER_RADIUS / 4,
  MONSTER_RADIUS / 2,
  32
)
const monsterArrMat = new THREE.MeshLambertMaterial({ color: MONSTER_RAY_ARROW_COLOR })
const monsterArrMesh = new THREE.Mesh(monsterArrGeo, monsterArrMat)

monsterArrMesh.position.set(0, 0, MONSTER_RADIUS)
monsterArrMesh.rotation.set(Math.PI / 2, 0, 0)

const monsterMesh = new THREE.Group()

monsterMesh.add(monster)
monsterMesh.add(monsterArrMesh)
monsterMesh.position.y = MONSTER_RADIUS

/* -------------------------------------------------------------------------- */
/*                                   PILLARS                                  */
/* -------------------------------------------------------------------------- */
const pillarGeo = new THREE.BoxBufferGeometry(PILLAR_DIM, PILLAR_HEIGHT, PILLAR_DIM)
const pillarMat = new THREE.MeshLambertMaterial({ color: PILLAR_COLOR })

const wallMat = new THREE.MeshLambertMaterial({ color: WALL_COLOR })

pillarGeo.computeFaceNormals()

/* -------------------------------------------------------------------------- */
/*                                    GRIDS                                   */
/* -------------------------------------------------------------------------- */
const gridHelper = new THREE.GridHelper(DIMENSION, DIVISIONS)
scene.add(gridHelper)

const platformGeo = new THREE.PlaneBufferGeometry(DIMENSION, DIMENSION)
const platformMat = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true })
const platformMesh = new THREE.Mesh(platformGeo, platformMat)

platformMesh.position.y = PILLAR_HEIGHT / 4
platformMesh.rotation.x = -Math.PI / 2

scene.add(platformMesh)
