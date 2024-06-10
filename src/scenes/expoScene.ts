import { Color, Engine, FadeInOut, Scene, Transition } from "excalibur";
import { Resources } from "../resources";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        let tiledMap = Resources.Mapa

        tiledMap.addToScene(this)
    }
}