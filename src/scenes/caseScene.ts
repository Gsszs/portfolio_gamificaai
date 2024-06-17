import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any

    private textoDaCena: string = ""
    private textoDoCase: string = ""

    elementoTexto?: HTMLElement

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 50,
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.elementoTexto = document.createElement("div") as HTMLElement

        this.elementoTexto.style.opacity = "1"

        let container_gamer = document.querySelector(".container-game") as HTMLElement
        container_gamer.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("sobre-gamifica")

        let actorLogoVertical = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight),
        })

        let imagemLogoVertical = Resources .LogoVertical.toSprite()

        imagemLogoVertical.scale = vec(0.6, 0.6)

        actorLogoVertical.graphics.add(imagemLogoVertical)

        this.add(actorLogoVertical)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter || event.key == Keys.NumpadEnter) {
                engine.goToScene("exposicao")
            }
        })
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        this.objetoInteracao = context.data
        this.elementoTexto!.style.opacity = "1"

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a"){
            this.textoDaCena = "Está é a mesa A"
            this.textoDoCase = "Texto do A"
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b"){
            this.textoDaCena = "Está é a mesa B"
            this.textoDoCase = "Texto do B"
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c"){
            this.textoDaCena = "Está é a mesa C"
            this.textoDoCase = "Texto do C"
        }

        this.elementoTexto!.innerHTML = `<h2>${this.textoDaCena}</h2>
        <p>${this.textoDaCena}</p>`
    }

    onDeactivate(_context: SceneActivationContext<undefined>): void {
        this.elementoTexto!.style.opacity = "0"
    }
}