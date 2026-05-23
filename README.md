# V-Viewer

## V-Viewer Boilerplate

A viewer application is composed by a module in `packages`.
For instance, the dogs6 viewer is the `packages/dogs6` package.
Package names ending with the `-lazy` suffix represent games that extends other games to be functional.
Bash scripts `game_{game_id}_build.sh` in root `scripts` folder are responsible to building up things in order to have an output package into the `tmp` subdirectory.

### Project Folders

#### dist_template

- `partners`
  - `default`
      I files inseriti in questa directory vengono caricati - PER TUTTI I PARTNERS - sulla directory `<DEPLOY_PATH>/build` e `<DEPLOY_PATH>/dist` del server per distribuire libs e assets statici.
  - `<PARTNER_NAME>`
      I files inseriti in questa directory vengono caricati - per il partner definito nel package.json - sulla directory `<DEPLOY_PATH>/build` e `<DEPLOY_PATH>/dist` del server per distribuire libs e assets statici. (Sovrascrivono i default se vengono trovati files con lo stesso nome.)

#### public_local

I files inseriti su `public_local` vengono utilizzati per il local development (npm start).

- public/index.html
    `react-scripts` utilizza la location hard-coded `public/index.html` per il file index.html.
    Modificare con cautela per non compromettere il corretto funzionamento del comando `npm start`.

#### src/components

All'interno di `src/components` e/o sottocartelle sono presenti i componenti React.

#### src/options

All'interno di `src/options` sono presenti le opzioni di gioco.

- `game-options.js` è il file principale che si occupa della inizializzazione della timeline delle pagine (scenes).
- `webfontconfig.js` è il file per la customizzazione dei fonts
  - `custom.families`
  - `custom.urls`
    - deve fare riferimento al file css con i @font-face necessari `dist_template/partners/${partner}/lib/fonts.css`
- `pages.js` è il file che definisce le pagine per avere un id univoco
- `data.js` è il file che definisce un modulo di storage globale per il game. Tutti i dati del
  - la function `storeGameInitializationData` è l'handler per la richiesta di `extinit` che avviene all'apertura.
  - la function `storeEventData` è l'handler per la richiesta di `getgameinfo` che avviene una volta subito dopo quella di `extinit` e poi ogni volta che il countdown è 0 (quindi prima dell'inizio di un evento, gara o estrazione);
- `data-facade.js` fornisce le funzioni che restituiscono i dati strutturati per come sono richiesti dai props dei components di tipo Page.
- `lifecycle.js` definisce i comportamenti dell'app durante il suo ciclo di vita e il cambiamento delle pagine.

#### partners/<PARTNER_NAME>

Nelle cartelle `partners/<PARTNER_NAME>/*` si definiscono gli stili per partner diversi.
Questi files di stile non vanno importati negli altri componenti, verranno automaticamente importati dopo tutti gli altri, in modo da sovrascrivere eventuali regole già esistenti.

### Local Development

Per fare gli unit-tests dei componenti, inserirli nella funzione di render di `App` nel file `src/App.js` ed eseguire `npm start`.
Anche in questo caso gli stili relativi al partner vengono caricati automaticamente (viene creato un file dallo script di `prestart` che viene importato da index.js).

- `react-scripts` utilizza la location hard-coded `public/index.html` per il file index.html

### Query string Parameters

- audio
  - values: 0|1
  - default: 0
- full
  - values: 0|1
  - default: 0
- macaddress
  - values from db
  - default: undefined
- monitor
  - values from db
  - default: undefined

### Events

- `onresize`
    css animation are disabled for 500ms adding the class `notransition` to body.
- `onmessage` (if game is inside an iframe)
- if (data == 'full'|'embedded')
      css animation are disabled for 500ms adding the class `notransition` to body.
- if (data == 'mute'|'unmute')
      isMuted is changed.

### Getters

- data.global
  - isFullMode()
  - isAudioActived()
  - isMuted()
  - isFirstRunTime()
  - isHostReachable((reachable) => {})

testing paramenter:
<https://hwdcnl82yb.execute-api.eu-west-1.amazonaws.com/v-viewer/dogs6/?operator=sportradar&channel_id=3&monitor=2&init_code=viewer-net4media-horses6&audio=1&show_partner_logo=0&type_mode=retail>https://hwdcnl82yb.execute-api.eu-west-1.amazonaws.com/v-viewer/dogs6/?operator=sportradar&channel_id=3&monitor=2&init_code=viewer-net4media-horses6&audio=1&show_partner_logo=0&type_mode=retail
# stanleybet-v-viewer
Copia di k8s-v-viewer per stanleybet

# Avvio server localhost testing
Per fare le personalizzazioni avviare il server dati locale
1) cd dev
2) cd linux
3) ./game_dogs6_start.sh oppure in locale ./debug.sh
4) aprire browser link http://localhost:8090/?operator=pg&controller_id=84101&monitor=1&init_code=viewer-net4media-dogs6&audio=1&type_mode=web



# Avvio nuovo operatore 

1) Duplicare la cartella ./pakages/dogs6/src/partners/scommesseitalia/
2) Rinominarla con il nuovo nome del partner
3) Modificare i colori SOLO nel file _colors.scss
4) Modificare i Loghi del partner nel file base64b.scss
5) Aggiungere o modificare eventuali regole di css SOLO nel file main.scss

# per nuovo start con nuovo operatore modificare l'operatore nel segunete file ai righi 15 e 24
3) misc/docker-compose.start.yml
3) ./debug.sh
4) aprire browser link http://localhost:8090/?operator=pg&controller_id=84101&monitor=1&init_code=viewer-net4media-dogs6&audio=1&type_mode=web
# Pubblicazione in produzione
1) dal proprio pc controllare l'indirizzo api del viewer nei file Dockerfile e ./scripts/dist.sh
2) eseguire `docker build -t pwr-viewer:latest-v6 .` dare nuovo nome
3) eseguire `docker save -o pwr-viewer-v6.tar pwr-viewer:latest-v6` dare nuovo nome
4) copiare in produzione `scp pwr-viewer-v6.tar administrator@10.200.1.87:/home/administrator/planetretail/images/pwr-viewer-v6.tar`
# Operazioni da fare sul server di produzione
1) importare l'immagine nel docker `docker load -i nomefile.tar`
2) editare il docker-compose.yaml nella cartella ~/planetretail e sul servizio viewer inserire il nome dell'immagine importata al punto 6.
3) avvio con il comando`docker-compose up -d`
4) viewer url `http://10.200.1.87:8091/dogs6/?operator=pg&controller_id=84003&monitor=1&init_code=viewer-net4media-dogs6&audio=1&type_mode=web`
5)  verificare il valore delle variabili `oraInizioGiorno` e `oraFineGiorno` nel file data-facades.js
