controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 2 2 . . . 
        . . 2 2 2 2 . . 
        . 2 . 2 2 . 2 . 
        . . . 2 2 . . . 
        . . . 2 2 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.fire, 100)
    music.smallCrash.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.clouds)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . f 1 1 f f 1 1 f . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . f 1 1 1 1 1 1 f . . . . . 
    . . . f f f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . 1 1 f 1 1 1 f 1 1 . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . 1 f 1 1 1 1 1 f 1 . . . . . 
    . . 1 f f f f f f f 1 . . . . . 
    . . 1 1 1 1 1 1 1 1 1 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
ship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . f f f f f f f f f f . . . . . 
    . f f f f f f f f f f . . . . . 
    . f f 1 f f f f 1 f f . . . . . 
    . f f f f f f f f f f . . . . . 
    . f f f f f f f f f f . . . . . 
    . f f f f f f f f f f . . . . . 
    . f 1 f f f f f f 1 f . . . . . 
    . f f 1 1 1 1 1 1 f f . . . . . 
    . f f f f f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(1)
effects.starField.startScreenEffect()
music.playMelody("B G - B F B E B ", 90)
game.onUpdateInterval(100, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
