import * as THREE from 'three'
import { OrbitControls } from 'js/OrbitControls.js'
import { GLTFLoader } from 'js/GLTFLoader.js'

window.changeCheshen = function changeCheshen(cIndex) {
  var colors = [0xffff00, 0xff0000, 0xffffff]

  window.$smart_cheshen.material.color = new THREE.Color(colors[cIndex])
}

var scene, camera, renderer
window.onload = init
function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    90,
    document.body.clientWidth / document.body.clientHeight,
    0.1,
    100
  )
  camera.position.set(0, 0, 4)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(document.body.clientWidth, document.body.clientHeight)
  renderer.setClearColor(0xbfe3dd, 1)
  new OrbitControls(camera, renderer.domElement)

  loadTexture(loadModel)

  // var geometry = new THREE.BoxGeometry(1, 1, 1)
  // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  // var cube = new THREE.Mesh(geometry, material)

  // scene.add(cube)

  document.getElementById('container').appendChild(renderer.domElement)
  addLight()
  loop()
}
function loadModel(allTexture) {
  new GLTFLoader().load(
    'images/model.gltf',
    (gltf) => {
      scene.add(gltf.scene)
      setupInfoPoint()
      for (const child of gltf.scene.children[0].children) {
        if (
          child.name == 'smart_lungu0' ||
          child.name == 'smart_lungu1' ||
          child.name == 'smart_lungu2' ||
          child.name == 'smart_lungu3'
        ) {
          child.material = new THREE.MeshStandardMaterial()
          child.material.map = allTexture['lungu_col'].texture
          child.material.normalMap = allTexture['lungu_nor'].texture
          child.material.aoMap = allTexture['lungu_occ'].texture
        } else if (
          child.name == 'smart_chelun0' ||
          child.name == 'smart_chelun1' ||
          child.name == 'smart_chelun2' ||
          child.name == 'smart_chelun3'
        ) {
          child.material = new THREE.MeshStandardMaterial()
          child.material.map = allTexture['luntai_col'].texture
          child.material.normalMap = allTexture['luntai_nor'].texture
        } else if (child.name == 'smart_cheshen') {
          window.$smart_cheshen = child
          child.material = new THREE.MeshStandardMaterial()

          child.material.color = new THREE.Color(0x70631b)
          child.material.metalness = 0.44
          child.material.roughness = 0

          child.material.normalMap = allTexture['cheshen_nor'].texture
          child.material.aoMap = allTexture['cheshen_occ'].texture

          child.material.envMap = allTexture['skymap2'].texture
          child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
          child.material.envMapIntensity = 1
        } else if (child.name == 'smart_chejia') {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0x252929)
          child.material.metalness = 0.44
          child.material.roughness = 0.4
          child.material.normalMap = allTexture['chejia_nor'].texture
          child.material.aoMap = allTexture['chejia_occ'].texture
        } else if (child.name === 'smart_boli') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0x333333)
          child.material.transparent = true
          child.material.opacity = 0.2

          // child.material.envMap = allTexture['skymap2'].texture
          child.material.envMap = allTexture['skymap2'].texture
          child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
          child.material.envMapIntensity = 1
        } else if (child.name == 'smart_tianchuang') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0x000000)
          child.material.transparent = true
          child.material.opacity = 0.5

          child.material.envMap = allTexture['skymap2'].texture
          child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
          child.material.envMapIntensity = 1
        } else if (child.name == 'smart_shachepan') {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0xf2f2f2)
          child.material.emissive = new THREE.Color(0x000000)
          child.material.metalness = 0.5
          child.material.roughness = 0.62
          child.material.map = allTexture['shache_col'].texture
          child.material.normalMap = allTexture['shache_nor'].texture
          child.material.aoMap = allTexture['shache_occ'].texture
        } else if (
          child.name == 'smart_neishi' ||
          child.name == 'smart_neishi2'
        ) {
          //
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0x333333)
          child.material.emissive = new THREE.Color(0x000000)
          child.material.normalMap = allTexture['neishi_nor'].texture
          child.material.aoMap = allTexture['neishi_occ'].texture
        } else if (child.name == 'smart_neibao') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0x2e2e2e)
          child.material.map = allTexture['mennei_col'].texture
        } else if (child.name == 'smart_linjian') {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0x2e2e2e)
          child.material.metalness = 0.5
          child.material.roughness = 0.62
          child.material.map = allTexture['linjian_col'].texture
          child.material.normalMap = allTexture['linjian_nor'].texture
          child.material.aoMap = allTexture['linjian_occ'].texture
        } else if (child.name == 'smart_daochejing') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0xffffff)
        } else if (child.name == 'smart_bolinei') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0x333333)
        } else if (
          child.name == 'smart_chedeng' ||
          child.name == 'smart_shachedeng' ||
          child.name == 'smart_wudeng'
        ) {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0xffffff)
          child.material.emissive = new THREE.Color(0x333333)
          child.material.metalness = 1.0
          child.material.roughness = 0.4

          child.material.normalMap = allTexture['deng_nor'].texture
        } else if (child.name == 'smart_chedengzhao') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0xffffff)
          child.material.emissive = new THREE.Color(0x000000)
          child.material.transparent = true
          child.material.opacity = 0.3

          child.material.normalMap = allTexture['chedengzhao_nor'].texture

          child.material.envMap = allTexture['skymap2'].texture
          child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
          child.material.envMapIntensity = 1
        } else if (child.name == 'smart_shachedengzhao') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0xca0816)
          child.material.transparent = true
          child.material.opacity = 0.4

          child.material.normalMap = allTexture['chedengzhao_nor'].texture
        } else if (child.name == 'smart_shangeshang') {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0xf0f0f)
          child.material.emissive = new THREE.Color(0x000000)
          child.material.metalness = 1
          child.material.roughness = 0
        } else if (child.name == 'smart_shangexia') {
          child.material = new THREE.MeshPhongMaterial()
          child.material.color = new THREE.Color(0)
          child.material.metalness = 1
          child.material.roughness = 0
        } else if (
          child.name == 'smart_LOGO' ||
          child.name == 'smart_paiqiguan'
        ) {
          child.material = new THREE.MeshStandardMaterial()
          child.material.color = new THREE.Color(0x6c6c6c)
          child.material.emissive = new THREE.Color(0x444444)
          child.material.metalness = 1
          child.material.roughness = 0.32
        }
      }
    },
    function (xhr) {
      const p = ((xhr.loaded / xhr.total) * 100).toFixed(0)
      console.log(p + '% loaded')
      const process = document.querySelector('#process')
      process.innerHTML = p + '% loaded'
    },
    function (error) {
      console.log('An error happened', error)
    }
  )
}
// todo

function setupInfoPoint() {
  const pointTexture = new THREE.TextureLoader().load('images/point.png')

  const group = new THREE.Group()
  const materialC = new THREE.SpriteMaterial({
    map: pointTexture,
    color: 0xffffff,
    fog: false,
  })

  var poiPosArray = [
    { x: -1.47, y: 0.87, z: -0.36, frame: 1 },
    { x: -1.46, y: 0.49, z: -0.69, frame: 2 },
    { x: 1.5, y: 0.7, z: 0, frame: 8 },
    { x: 0.33, y: 1.79, z: 0, frame: 3 },

    { x: 0.73, y: 1.38, z: -0.8, frame: 5 },
    { x: -0.1, y: 1.17, z: 0.88, frame: 6 },
    { x: -1.16, y: 0.16, z: 0.89, frame: 7 },
  ]
  const poiObjects = []

  poiPosArray.forEach(({ x, y, z }, a) => {
    y = y - 0.5
    const sprite = new THREE.Sprite(materialC)
    sprite.scale.set(0.15, 0.15, 1)
    sprite.position.set(x, y, z)
    sprite.idstr = 'popup_' + poiPosArray[a].frame
    group.add(sprite)
    poiObjects.push(sprite)
  })
  scene.add(group)

  document.body.addEventListener('click', (event) => {
    event.preventDefault()
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(poiObjects)
    console.log(12313, intersects)
    if (intersects.length > 0) {
      const popIndex = parseInt(intersects[0].object.idstr.substr(6, 1))
      console.log(popIndex)
    }
  })
}

function loadTexture(cb) {
  var result = {}
  var textures = [
    'skymap2',
    'skymap',
    'shache_occ',
    'shache_nor',
    'shache_col',
    'neishi_occ',
    'neishi_nor',
    'mennei_col',
    'luntai_nor',
    'luntai_col',
    'lungu_occ',
    'lungu_nor',
    'lungu_col',
    'linjian_occ',
    'linjian_nor',
    'linjian_col',
    'floor',
    'deng_occ',
    'deng_nor',
    'deng_col',
    'cheshen_occ',
    'cheshen_nor',
    'chejia_occ',
    'chejia_nor',
    'chedengzhao_nor',
  ]
  var index = 0
  textures.forEach((imageName) => {
    new THREE.TextureLoader().load(
      `images/textures/${imageName}.jpg`,
      function (value) {
        result[imageName] = { texture: value }
        index++
        if (index >= textures.length) {
          console.log(index, 9e9, textures.length)
          cb && cb(result)
        }
      }
    )
  })
}

function loop() {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
}

function addLight() {
  var ambientLight = new THREE.AmbientLight(0xd5d5d5)
  ambientLight.intensity = 1.2
  scene.add(ambientLight)

  var bottomRightDirLight = new THREE.DirectionalLight()
  bottomRightDirLight.position.x = 5
  bottomRightDirLight.position.y = 3
  bottomRightDirLight.position.z = -5
  bottomRightDirLight.intensity = 0.8

  // var helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
  // scene.add( helper );
  scene.add(bottomRightDirLight)

  var frontDirLight = new THREE.DirectionalLight(0xffffff)

  frontDirLight.position.x = -5
  frontDirLight.position.y = 3
  frontDirLight.position.z = 5
  frontDirLight.intensity = 0.8
  //directionalLight.castShadow=true;

  // var helper=new THREE.DirectionalLightHelper(frontDirLight,1);
  // scene.add( helper );
  scene.add(frontDirLight)
  // ?????????????????????45???????????????
}
