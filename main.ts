namespace SpriteKind {
    export const map = SpriteKind.create()
    export const rocketengine = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles0, function (sprite, location) {
    apple.setVelocity(0, -1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    apple.ay = -25 * Math.sin(angle)
    apple.ax = 25 * Math.cos(angle)
    fireball.setFlag(SpriteFlag.Invisible, false)
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    angle += -15 * (3.14 / 180)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    apple.ay = 20
    fireball.setFlag(SpriteFlag.Invisible, true)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    angle += 15 * (3.14 / 180)
})
let apple: Sprite = null
let angle = 0
let fireball: Sprite = null
fireball = sprites.create(img`
    . . . . . . 3 3 . . . . . . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . 3 3 . . 3 1 3 . . 3 3 . . . 
    . . 3 1 3 . 3 1 3 2 3 1 3 . . . 
    . . . 3 1 3 3 1 3 2 1 3 . . . . 
    3 3 3 3 2 1 3 1 1 1 3 . . . . . 
    3 1 1 1 1 1 1 1 1 2 3 3 3 3 3 3 
    . 3 3 3 2 3 1 1 1 1 1 1 1 1 1 3 
    . . . . . 2 1 1 1 3 3 2 3 3 3 . 
    . . . . 3 1 3 1 3 1 2 . . . . . 
    . . . 3 1 3 2 1 3 3 1 3 . . . . 
    . . 3 1 3 . 2 1 3 . 3 1 3 . . . 
    . . 3 3 . . 3 1 3 . . 3 3 . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . . . . . 3 3 . . . . . . . . 
    `, SpriteKind.Projectile)
fireball.setFlag(SpriteFlag.AutoDestroy, true)
angle = 0
tiles.setCurrentTilemap(tilemap`level1`)
effects.starField.startScreenEffect()
apple = sprites.create(img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `, SpriteKind.Player)
let engine = sprites.create(img`
    7 3 
    3 7 
    `, SpriteKind.rocketengine)
scene.cameraFollowSprite(apple)
scaling.scaleByPercent(apple, -25, ScaleDirection.Uniformly, ScaleAnchor.Middle)
apple.ay = 20
let myminimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
let minimap2 = sprites.create(minimap.getImage(myminimap), SpriteKind.map)
game.onUpdate(function () {
    minimap2.destroy()
    myminimap = minimap.minimap(MinimapScale.Half, 2, 0)
    minimap.includeSprite(myminimap, apple)
    minimap2 = sprites.create(minimap.getImage(myminimap), SpriteKind.map)
    minimap2.setPosition(apple.x - 50, apple.x - 30)
    engine.setPosition(apple.x - -8 * Math.cos(angle), apple.y - (-8 + Math.sin(angle)))
    fireball.setPosition(apple.x - -8 * Math.cos(angle), apple.y - (-8 + Math.sin(angle)))
})
