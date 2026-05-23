### Scripts
#### Draw - `draw:{game_id}`
Scripts with "draw:" prefix can be executed directly on **host-machine** in case of compatible node environment.
They use the mockup responses provided by the `@v-ui/fake-api` package to draw a single page.
They are useful in design phases or for debugging a particular page.
The page to be started must be specified in the `src/tests/App.js`.

```yarn draw:dogs6```


#### Demo - `demo:{game_id}`
Scripts with "demo:" prefix can be started directly on **host-machine** in case of compatible node environment.
They use the mockup API responses provided by the `@v-ui/fake-api` package.

For instance, `yarn demo:horses6`:
- set environment variables for the game `horses6` and 
- starts the docker containers specified in `misc/docker-compose.demo.yml`
- starts the `dev:horses6` script to run the webpack-dev-server.

#### Dev - `dev:{game_id}`
Scripts with "dev:" prefix _should_ be started inside the docker container. They are shortcuts to start a webpack development server.

#### Dev SinglePage - `dev:draw:{game_id}`
Scripts starting with the "dev:draw:" prefix _should_ be started inside the docker container. They are shortcuts to start a webpack development server on a fake Application component embedding the mockup-filled Page component.
They are useful in design phases or for debugging a particular page.
The page to be started must be specified in the `src/tests/App.js`.