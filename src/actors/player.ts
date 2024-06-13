import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    private velocidade: number = 180

    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {

        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                rows: 56,
                columns: 20,
                spriteHeight: 64,
                spriteWidth: 32,
            },
            spacing: {
                originOffset: {
                    y: 8
                }
            }

        })

        const duracaoFrameAnimation = 70

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

        this.graphics.use("left-idle")

        engine.input.keyboard.on("hold", (event) => {
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.vel.y = 0
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.y = 0
                    this.vel.x = this.velocidade
                    break;

                case Keys.ArrowUp:
                case Keys.W:
                    this.vel.x = 0
                    this.vel.y = -this.velocidade
                    break;

                case Keys.ArrowDown:
                case Keys.S:
                    this.vel.x = 0
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
        })
    }
}