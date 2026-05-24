#!/bin/ash
games='dogs6 dogs8 horses6 horses8 trotting8'

game_path_dogs6=packages/dogs6
game_path_dogs8=packages/dogs8-lazy
game_path_horses6=packages/horses6-lazy
game_path_horses8=undefined
game_path_trotting8=packages/trotting8-lazy

export V_VIEWER_INDEX_TEMPLATE=index.template.dist.js


rm -rf dist
mkdir dist
mkdir dist/v-viewer

enabled_games='';
n_enabled_games=0
num_succeeded=0

for game_id in $games; do
    # game_id=${games[$i]}
    echo $game_id
    #GAME_ID=${game_id^^}
    GAME_ID=`expr $game_id | tr a-z A-z`
    eval is_current_game_enabled="\$IS_ENABLED_$GAME_ID"
    #is_current_game_enabled=IS_ENABLED_$GAME_ID
    #is_current_game_enabled=${!is_current_game_enabled}
    echo $is_current_game_enabled
    if [ "$is_current_game_enabled" = true ]; then
        # enabled_games_idxs+=( "$i" )
        echo "entered"
        enabled_games=$enabled_games' '$game_id
        n_enabled_games=`expr $n_enabled_games + 1`
        echo Game $game_id enabled.
        ./scripts/game_${game_id}_dist.sh &
        # pids[${i}]=$!
        pids=$pids' '$!
    else
        echo "not entered"
        echo Game $game_id not enabled.
    fi
done


for pid in $pids; do
    wait $pid
    exitcode=$?
    if [ "$exitcode" -eq 0 ]; then
        #num_succeeded=$((num_succeeded+1))
        num_succeeded=`expr $num_succeeded + 1`
    else
        echo "pid: $pid  not succeded and returned code: $exitcode"
    fi
done

#n_enabled_games=${#enabled_games_idxs[@]}

echo "Num. enabled games: $n_enabled_games"
echo "Num. builds succeded: $num_succeeded"

if [ $num_succeeded -gt 0 -a $n_enabled_games -eq $num_succeeded ]; then
    V_VIEWER_API_URL=http://192.168.10.116:8083/api/v-viewer
    cp misc/redirect-index-template.html.txt dist/v-viewer/index.html
    sed -i -e "s,\${V_VIEWER_API_URL},$V_VIEWER_API_URL," dist/v-viewer/index.html

    for game_id in $enabled_games; do
        # game_id=${games[$i]}
        # game_path=${games_paths[$i]}
        eval game_path="\$game_path_$game_id"

        echo "game_id: $game_id"
        echo "game_path: $game_path"

        mv $game_path/dist dist/v-viewer/$game_id
    done
else 
    exit 1
fi

cp misc/home-index.html.txt dist/index.html
