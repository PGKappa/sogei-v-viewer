### How to start dogs6 demo

```
./linux/game_dogs6_demo.sh
```

### How to start horses6 demo

```
./linux/game_horses6_demo.sh
```



#### Grafical Layout Version v2
Add the query param `gui_layout_version=v2`
    - {URL}/?operator={operatorCode}&gui_layout_version=v2

##### Toggle the partner logo
Adding the query param `show_partner_logo=1` the partner logo appears.
-

##### Url
- Dogs6
http://{IP}:8090/?channel_id=1&hide_event_time=0&full=1&gui_layout_version=v2&audio=1&show_partner_logo=1
- Horses6
http://{IP}:8090/?channel_id=3&hide_event_time=0&full=1&gui_layout_version=v2&audio=1&show_partner_logo=1

##### Change language
change the path of init response in file `packages/fake-api/horses6.js`.

##### Change video
The video is set in the second event info response mockup: `previous.video.src`.
The `previous.video.duration` and the `previous.video.metadata` must be changed too according the new video media to be shown.

#### Choose a game
Edit the script specified in the `services:v-viewer:command` in the `misc/docker-compose.dev.yml`, replacing it with one of the below:
- Greyhounds 6 Runners - dogs6: `yarn dev:dogs6`
- Horses 6 Runners - horses6: `yarn dev:horses6`

#### Choose a theme
Edit the environment variable `V_VIEWER_DOGS6_PARTNER` in the `services:v-viewer:environment`in the `misc/docker-compose.dev.yml`, replacing it with one of the below:
- PGVirtual Standard Blue -> `pg/v2.0-blue`



#### Start
```
yarn start
```

The above command starts a docker-compose script to run an image containing the v-viewer.
