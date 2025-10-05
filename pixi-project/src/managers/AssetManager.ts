import { Assets, Sprite } from "pixi.js";
import { ConstantsAssetManager } from "../constants/ConstantsAssetManager";

export class AssetManager {
  private assetsDict: { [key: string]: Sprite } = {};

  async init() {
    await this.loadAssets();
    return this;
  }

  getAssets() {
    return this.assetsDict;
  }

  private async loadAssets() {
    const promises = ConstantsAssetManager.PIECE_TYPES.map(
      async (assetName) => {
        // Load non-coloured assets
        let assetPath = `${ConstantsAssetManager.ASSET_LOAD_PATH}${assetName}.png`;
        let texture = await Assets.load(assetPath);
        this.assetsDict[assetName.toUpperCase()] = new Sprite(texture);

        // Load coloured assets
        assetPath = `${ConstantsAssetManager.ASSET_LOAD_PATH}${assetName}_coloured.png`;
        texture = await Assets.load(assetPath);
        this.assetsDict[`${assetName}_coloured`.toUpperCase()] = new Sprite(
          texture,
        );
      },
    );

    // Wait for all loads to complete
    await Promise.all(promises);
  }
}
