import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    private velocidade: number = 180

    constructor() {
        super({
            pos: vec(600, 600),
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red
        })
    }

    onInitialize(engine: Engine<any>): void {
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