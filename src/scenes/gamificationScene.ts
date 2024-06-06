import { Actor, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene{

    elementoTexto?: HTMLElement

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex('#403f4c')

        this.elementoTexto = document.createElement("div") as HTMLElement

        this.elementoTexto.style.opacity = "1"

        let container_gamer = document.querySelector(".container-game") as HTMLElement
        container_gamer.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("sobre-gamificacao")

        this.elementoTexto.innerHTML = `
        <h2>Oquê Gamificação ?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos.
        Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

        let actorImageGame = new Actor({
            pos: vec(300, engine.halfDrawHeight),
        })

        let imagemGamificacao = Resources .Gamificacao.toSprite()

        imagemGamificacao.scale = vec(0.7, 0.7)

        actorImageGame.graphics.add(imagemGamificacao)

        this.add(actorImageGame)
    }
}
