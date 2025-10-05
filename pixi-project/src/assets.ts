import { Assets } from 'pixi.js';

Assets.addBundle('gameAssets', [
    { alias: 'Bishop', src: 'assets/pieces/bishop.png'},
    { alias: 'Rook', src: 'assets/pieces/rook.png'},
    { alias: 'Queen', src: 'assets/pieces/queen.png'},
    { alias: 'Knight', src: 'assets/pieces/knight.png'},
    { alias: 'Stag', src: 'assets/pieces/stag.png'},
    { alias: 'Trident', src: 'assets/pieces/trident.png'},
]);

export const chessPieceAssets = await Assets.loadBundle('chessPieces');
