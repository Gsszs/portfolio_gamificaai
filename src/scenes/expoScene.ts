import { Actor, Animation, CollisionType, Color, Engine, FadeInOut, Scene, SpriteSheet, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        let musicaFundo = Resources.ClassicBGM

        musicaFundo.loop = true
        musicaFundo.play()

        let tiledMap = Resources.Mapa

        let offsetX = 138
        let offsetY = 100

        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),
        })

        this.camera.zoom = 2

        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        jogador.z = 1

        this.add(jogador)

        const duracaoFrameAnimation = 70

        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "NpcA"
        )

        const NpcASpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcASpriteSheet,
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

        const downIdle_npcA = new Animation ({
            frames: [
                { graphic: NpcASpriteSheet.getSprite(18, 1) },
                { graphic: NpcASpriteSheet.getSprite(19, 1) },
                { graphic: NpcASpriteSheet.getSprite(20, 1) },
                { graphic: NpcASpriteSheet.getSprite(21, 1) },
                { graphic: NpcASpriteSheet.getSprite(22, 1) },
                { graphic: NpcASpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        
        npcA.graphics.add(downIdle_npcA)

        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            Color.Blue,
            "NpcB"
        )

        const NpcBSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcBSpriteSheet,
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

        const downIdle_npcB = new Animation ({
            frames: [
                { graphic: NpcBSpriteSheet.getSprite(18, 1) },
                { graphic: NpcBSpriteSheet.getSprite(19, 1) },
                { graphic: NpcBSpriteSheet.getSprite(20, 1) },
                { graphic: NpcBSpriteSheet.getSprite(21, 1) },
                { graphic: NpcBSpriteSheet.getSprite(22, 1) },
                { graphic: NpcBSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        
        npcB.graphics.add(downIdle_npcB)

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            Color.Blue,
            "NpcC"
        )

        const NpcCSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcCSpriteSheet,
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

        const downIdle_npcC = new Animation ({
            frames: [
                { graphic: NpcCSpriteSheet.getSprite(18, 1) },
                { graphic: NpcCSpriteSheet.getSprite(19, 1) },
                { graphic: NpcCSpriteSheet.getSprite(20, 1) },
                { graphic: NpcCSpriteSheet.getSprite(21, 1) },
                { graphic: NpcCSpriteSheet.getSprite(22, 1) },
                { graphic: NpcCSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimation
        })
        
        npcC.graphics.add(downIdle_npcC)

        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        this.camera.strategy.lockToActor(jogador)

        let camadaObjetosColisores = tiledMap.getObjectLayers("objetoColisores")[0]

        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor ({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),

                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed
            })

            this.add(objetoAtual)
        })
    }
}