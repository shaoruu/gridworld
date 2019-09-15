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
/*                                   PILLARS                                  */
/* -------------------------------------------------------------------------- */
const pillarGeo = new THREE.BoxBufferGeometry(pillarDim, pillarHeight, pillarDim)
const pillarMat = new THREE.MeshLambertMaterial({ color: PILLAR_COLOR })

/* -------------------------------------------------------------------------- */
/*                                    GRIDS                                   */
/* -------------------------------------------------------------------------- */
const gridHelper = new THREE.GridHelper(dimension, divisions)
scene.add(gridHelper)
