const CAMERA_FAR = 2000
const FOG_FAR = 1800

const DIMENSION = 500
const DIVISIONS = 16

const TREE_DIM = DIMENSION / DIVISIONS
const TREE_HEIGHT = 10

const MONSTER_COUNT = 5
const MONSTER_RADIUS = 10
const MONSTER_DECISION_INTERVAL = 200
const MONSTER_CRAZY_THRESHOLD = 0.7

const TREE_SCALE = 4.95

const PERLIN_SCALE = 5
const SIMPLEX_SCALE = 4
const NOISE_RANGE = 0.08

/* -------------------------------------------------------------------------- */
/*                                   COLORS                                   */
/* -------------------------------------------------------------------------- */
const BACKGROUND_DAY_COLOR = '#dddddd'
const BACKGROUND_NIGHT_COLOR = '#000000'
const PLATFORM_COLOR = 0x9aceff
const MONSTER_DAY_COLOR = 0xf9c729
const MONSTER_NIGHT_COLOR = 0x0d1846
const MONSTER_HELL_COLOR = 0xc72c41
// const MONSTER_DAY_COLOR = 0xbbe1fa
// const MONSTER_NIGHT_COLOR = 0x1b262c
const MONSTER_RAY_COLOR = 0xffba92
const MONSTER_RAY_ARROW_COLOR = 0xc6f1d6
const TREE_COLOR = 0x1fab89
const TREE_HELL_COLOR = 0xee4540
const WALL_COLOR = 0x434982
const LEAVES_COLOR = 0x1fab89
const TRUNK_COLOR = 0xac7339

const MOVE_UP = 0
const MOVE_RIGHT = 1
const MOVE_DOWN = 2
const MOVE_LEFT = 3

const LEFT_CLICK = 0
const RIGHT_CLICK = 2

// const treeCount = 500

const DEFAULT_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
