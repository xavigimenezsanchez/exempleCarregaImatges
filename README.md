# Api de carrega d'imatges amb nodejs i express

Per construir aquest exemple he fet servir el paquet [multer](https://www.npmjs.com/package/multer).
Multer és un middleware per manegar multipart/form-data.
D'aquesta forma és molt fàcil de configurar on van els fitxers que es carreguen des d'un formulari, observa aquest exemple: 
```js
app.use("/api/imatges",multer( {dest : "./uploads/"})); 
```
Per tractar amb la informació del fitxer que s'ha enviat des d'un formulari, multer crea l'objecte files en el request que tè una aspecte com aixó:

```js
{ image: 
   { fieldname: 'image',
     originalname: 'Screenshot 2015-02-11 at 00.23.31.png',
     name: 'c4408b58d3891559ec00c98064ff226b.png',
     encoding: '7bit',
     mimetype: 'image/png',
     path: 'uploads/c4408b58d3891559ec00c98064ff226b.png',
     extension: 'png',
     size: 172196,
     truncated: false,
     buffer: null } }
```

Pots observar que també hi ha el paquet [bodyParser](https://www.npmjs.com/package/body-parser) per poder afegir una api json si la necessites.

Per fer el resize d'imatges és necessari que tinguis instal·lat GraphicsMagick o ImageMagick, 
si fas servir Ubuntu:
```sh
apt-get install imagemagick
apt-get install graphicsmagick
```

Ja que el [gulp-image-resize](https://www.npmjs.com/package/gulp-image-resize) necessita una de les dues applicacions.

Per fer servir gulp dintre de nodejs he fet servir un child Process, d'aquesta forma no fem un bloqueig del EventLoop amb un ús intens de la CPU al processar les imatges

Com extra, i cosa curiosa, he posat un exemple d'un framework css per fer web's amb aspecte de windows 8, mai hauria pensat que algú podira fer una cosa semblan, veure per creure!

[Metro-UI](http://metroui.org.ua/)# exempleCarregaImantges
