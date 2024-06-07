import { Color, Engine, FadeInOut, Scene, Transition } from "excalibur";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(_engine: Engine<any>): void {
        
    }
}