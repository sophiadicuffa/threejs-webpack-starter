import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const NormalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects - body
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5,64,64)

// Materials - skin

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = NormalTexture;

material.color = new THREE.Color(0x292929)

// Mesh - combines materials and geomety
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff000, 2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity = 10

scene.add(pointLight2)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper)

const pointLight3 = new THREE.PointLight(0x8600ff, 2)
pointLight3.position.set(2.13,-3,-1.98)
pointLight3.intensity = 9

scene.add(pointLight3)

const light2 = gui.addFolder("Light Controls")
light2.add(pointLight3.position,'y').min(-3).max(3).step(.01)
light2.add(pointLight3.position,'x').min(-1).max(3).step(.01)
light2.add(pointLight3,'intensity').min(0).max(10).step(.01)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetY = 0
let targetX = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)

}

window.addEventListener('scroll', updateSphere)

function updateSphere(event){
    sphere.position.y = window.scrollY *.01
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX *.001
    targetY = mouseY *.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()