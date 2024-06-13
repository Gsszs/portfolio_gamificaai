import { ImageFiltering, ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logovertical from "./images/logo-vertical.png";
import imagemgamificacao from "./images/imagem-gamificacao.png";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import pngTilesPath from "./maps/Room_Builder_32x32.png?url";

import tsxParedesPath from "./maps/tileset_paredes.tsx?url";
import tsxGenericPath from "./maps/tileset_generic.tsx?url";
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url";
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url";

import playerSpritePath from "./sprites/player.png";

import tmxMapaPath from "./maps/showroom_map.tmx?url"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, { filtering: ImageFiltering.Pixel }),
  LogoVertical: new ImageSource(logovertical),
  Gamificacao: new ImageSource(imagemgamificacao),
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
