RUN="docker run \
    -it \
    -v $(pwd):/root \
    -w /root \
    node:16-alpine \
    sh -c "

# $RUN "yarn -W add -D esm"
# $RUN "yarn -W remove mocha chai"
# $RUN "yarn workspace @v-viewer/core remove mocha chai"
# $RUN "yarn -W add -D mocha chai"
# $RUN "yarn -W add -D @babel/register"
$RUN "yarn test"