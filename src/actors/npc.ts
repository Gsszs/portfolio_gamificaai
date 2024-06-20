import { Actor, Animation, CollisionType, Color, Engine, ImageSource, SpriteSheet, Vector } from "excalibur"
import { Resources } from "../resources"

function recConfigs (NpcSpriteSheet: ImageSource) {
    return SpriteSheet.fromImageSource({
        image: NpcSpriteSheet,
        grid: {
            rows: 20,
            columns: 56,
            spriteHeight: 64,
            spriteWidth: 32,
        },
        spacing: {
            originOffset: {
                y: 12
            }
        }

    })
}

export class Npc extends Actor {
    constructor(posicao: Vector, cor: Color, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            color: cor,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine: Engine<any>): void {
        const spriteNpcA = recConfigs(Resources.NpcASpriteSheet)
        const spriteNpcB = recConfigs(Resources.NpcBSpriteSheet)
        const spriteNpcC = recConfigs(Resources.NpcCSpriteSheet)

        let spriteDefinido

        if (this.name == "npc_a") {
            spriteDefinido = spriteNpcA
        } else if (this.name == "npc_b") {
            spriteDefinido = spriteNpcB
        } else if (this.name == "npc_c") {
            spriteDefinido = spriteNpcC
        } else {
            console.log("Nome do NPC não previsto: ", this.name)
        }

        if (spriteDefinido) {
            const downIdle = new Animation({
                frames: [
                    { graphic: spriteDefinido.getSprite(18, 1) },
                    { graphic: spriteDefinido.getSprite(19, 1) },
                    { graphic: spriteDefinido.getSprite(20, 1) },
                    { graphic: spriteDefinido.getSprite(21, 1) },
                    { graphic: spriteDefinido.getSprite(22, 1) },
                    { graphic: spriteDefinido.getSprite(23, 1) },
                ],
                frameDuration: 70
            })
            this.graphics.add(downIdle)
        }
    }
}