import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logovertical from "./images/logo-vertical.png";
import imagemgamificacao from "./images/imagem-gamificacao.png";
import imagemCases from "./images/cases.png";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import pngTilesPath from "./maps/Room_Builder_32x32.png?url";

import tsxParedesPath from "./maps/tileset_paredes.tsx?url";
import tsxGenericPath from "./maps/tileset_generic.tsx?url";
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url";
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url";

import playerSpritePath from "./sprites/player.png";
import npc_aSpritePath from "./sprites/npc_a.png";
import npc_bSpritePath from "./sprites/npc_b.png";
import npc_cSpritePath from "./sprites/npc_c.png";

import ritimada from "./sounds/ritmada_zelda.mp3";
import classic from "./sounds/zelda.mp3";

import tmxMapaPath from "./maps/showroom_map.tmx?url"

export const Resources = {
    Sword: new ImageSource(sword),
    Logo: new ImageSource(logo),
    PlayerSpriteSheet: new ImageSource(playerSpritePath, { filtering: ImageFiltering.Pixel }),
    NpcASpriteSheet: new ImageSource(npc_aSpritePath, { filtering: ImageFiltering.Pixel }),
    NpcBSpriteSheet: new ImageSource(npc_bSpritePath, { filtering: ImageFiltering.Pixel }),
    NpcCSpriteSheet: new ImageSource(npc_cSpritePath, { filtering: ImageFiltering.Pixel }),
    LogoVertical: new ImageSource(logovertical),
    RitimadaBGM: new Sound(ritimada),
    ClassicBGM: new Sound(classic),
    Gamificacao: new ImageSource(imagemgamificacao),
    Cases: new ImageSource(imagemCases),
    Mapa: new TiledResource(tmxMapaPath, {
        pathMap: [
            { path: "showroom_map.tmx", output: tmxMapaPath },
            { path: "Room_Builder_32x32.png", output: pngTilesPath },
            { path: "tileset_paredes.tsx", output: tsxParedesPath },
            { path: "tileset_generic.tsx", output: tsxGenericPath },
            { path: "tileset_estoque.tsx", output: tsxEstoquePath },
            { path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath }
        ]
    })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
    loader.addResource(res);
}
