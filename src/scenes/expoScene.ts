import { Actor, Animation, CollisionType, Color, Engine, FadeInOut, ImageSource, Scene, SpriteSheet, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

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

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(_engine: Engine<any>): void {
        let musicaFundo = Resources.ClassicBGM

        musicaFundo.loop = true
        musicaFundo.play()
        musicaFundo.volume = 0.3

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

        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY), // posição
            Color.Blue, // cor do bloco de colisão
            "npc_a" // nome
        )
        
        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY), // posição
            Color.Blue, // cor do bloco de colisão
            "npc_b" // nome
        )

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY), // posição
            Color.Blue, // cor do bloco de colisão
            "npc_c" // nome
        )

        npcA.z = 1
        npcB.z = 1
        npcC.z = 1

        // const NpcASpriteSheet = recConfigs(Resources.NpcASpriteSheet)
        // const NpcBSpriteSheet = recConfigs(Resources.NpcBSpriteSheet)
        // const NpcCSpriteSheet = recConfigs(Resources.NpcCSpriteSheet)

        // npcA.graphics.add(recAnimation(NpcASpriteSheet))
        // npcB.graphics.add(recAnimation(NpcBSpriteSheet))
        // npcC.graphics.add(recAnimation(NpcCSpriteSheet))
        
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)


        this.camera.strategy.lockToActor(jogador)

        let camadaObjetosColisores = tiledMap.getObjectLayers("objetoColisores")[0]

        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor({
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