import sharp from "sharp";
import path from "node:path";

const source = path.resolve("public/icone-app-borges-franco.png");
const root = path.resolve("android/app/src/main/res");
const densities = {
  mdpi: [48, 108],
  hdpi: [72, 162],
  xhdpi: [96, 216],
  xxhdpi: [144, 324],
  xxxhdpi: [192, 432],
};

for (const [density, [legacy, adaptive]] of Object.entries(densities)) {
  const dir = path.join(root, `mipmap-${density}`);
  await sharp(source).resize(legacy, legacy, { fit: "cover" }).png().toFile(path.join(dir, "ic_launcher.png"));
  await sharp(source).resize(legacy, legacy, { fit: "cover" }).png().toFile(path.join(dir, "ic_launcher_round.png"));
  await sharp(source).resize(adaptive, adaptive, { fit: "contain", background: "#050807" }).png().toFile(path.join(dir, "ic_launcher_foreground.png"));
}

console.log("Ícones Android gerados com o brasão Borges Franco.");
