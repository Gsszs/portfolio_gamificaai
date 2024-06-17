import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active,
        })
    }

    onInitialize(engine: Engine<any>): void {

        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                rows: 20,
                columns: 56,
                spriteHeight: 64,
                spriteWidth: 32,
            },
            spacing: {
                originOffset: {
                    y: 0
                }
            }

        })

        const duracaoFrameAnimation = 70

        const rightIdle = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 1) },
                { graphic: playerSpriteSheet.getSprite(1, 1) },
                { graphic: playerSpriteSheet.getSprite(2, 1) },
                { graphic: playerSpriteSheet.getSprite(3, 1) },
                { graphic: playerSpriteSheet.getSprite(4, 1) },
                { graphic: playerSpriteSheet.getSprite(5, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("right-idle", rightIdle)

        const upIdle = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 1) },
                { graphic: playerSpriteSheet.getSprite(7, 1) },
                { graphic: playerSpriteSheet.getSprite(8, 1) },
                { graphic: playerSpriteSheet.getSprite(9, 1) },
                { graphic: playerSpriteSheet.getSprite(10, 1) },
                { graphic: playerSpriteSheet.getSprite(11, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("up-idle", upIdle)

        const lefIdle = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 1) },
                { graphic: playerSpriteSheet.getSprite(13, 1) },
                { graphic: playerSpriteSheet.getSprite(14, 1) },
                { graphic: playerSpriteSheet.getSprite(15, 1) },
                { graphic: playerSpriteSheet.getSprite(16, 1) },
                { graphic: playerSpriteSheet.getSprite(17, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("left-idle", lefIdle)

        const downIdle = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 1) },
                { graphic: playerSpriteSheet.getSprite(19, 1) },
                { graphic: playerSpriteSheet.getSprite(20, 1) },
                { graphic: playerSpriteSheet.getSprite(21, 1) },
                { graphic: playerSpriteSheet.getSprite(22, 1) },
                { graphic: playerSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("down-idle", downIdle)

        const rightWalk = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 2) },
                { graphic: playerSpriteSheet.getSprite(1, 2) },
                { graphic: playerSpriteSheet.getSprite(2, 2) },
                { graphic: playerSpriteSheet.getSprite(3, 2) },
                { graphic: playerSpriteSheet.getSprite(4, 2) },
                { graphic: playerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("right-walk", rightWalk)

        const upWalk = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 2) },
                { graphic: playerSpriteSheet.getSprite(7, 2) },
                { graphic: playerSpriteSheet.getSprite(8, 2) },
                { graphic: playerSpriteSheet.getSprite(9, 2) },
                { graphic: playerSpriteSheet.getSprite(10, 2) },
                { graphic: playerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("up-walk", upWalk)

        const leftWalk = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 2) },
                { graphic: playerSpriteSheet.getSprite(13, 2) },
                { graphic: playerSpriteSheet.getSprite(14, 2) },
                { graphic: playerSpriteSheet.getSprite(15, 2) },
                { graphic: playerSpriteSheet.getSprite(16, 2) },
                { graphic: playerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("left-walk", leftWalk)

        const downWalk = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 2) },
                { graphic: playerSpriteSheet.getSprite(19, 2) },
                { graphic: playerSpriteSheet.getSprite(20, 2) },
                { graphic: playerSpriteSheet.getSprite(21, 2) },
                { graphic: playerSpriteSheet.getSprite(22, 2) },
                { graphic: playerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        this.graphics.add("down-walk", downWalk)

        this.graphics.use("down-idle")

        engine.input.keyboard.on("hold", (event) => {
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.graphics.use("left-walk")
                    this.ultimaDirecao = "left"
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    this.graphics.use("right-walk")
                    this.ultimaDirecao = "right"
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    this.graphics.use("up-walk")
                    this.ultimaDirecao = "up"
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    this.graphics.use("down-walk")
                    this.ultimaDirecao = "down"
                    this.vel.y = this.velocidade
                    break; 

                default:
                    break;
            }
        })

        engine.input.keyboard.on("release", (event) => {
            if (event.key == Keys.A || event.key == Keys.D || event.key == Keys.Right || event.key == Keys.Left) {
                this.vel.x = 0
            }
            if (event.key == Keys.W || event.key == Keys.S || event.key == Keys.Down || event.key == Keys.Up) {
                this.vel.y = 0
            }

            if (this.vel.x == 0 || this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
            }
        })

        engine.input.keyboard.on("press", (event) => {
            if(event.key == Keys.F && this.temObjetoProximo) {
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    console.log("Essa é a mesa A")
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                    console.log("Essa é a mesa B")
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                    console.log("Essa é a mesa C")
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor.owner.name
                        }
                    })
                }
            }
        })
    }

    onPreCollisionResolve(_self: Collider, other: Collider, _side: Side, _contact: CollisionContact): void {
        this.temObjetoProximo = true

        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            this.temObjetoProximo = false

            console.log("Está longe")
        }
    }
}