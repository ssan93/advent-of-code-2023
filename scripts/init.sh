printf -v day "%02d" $1
sh ./scripts/fetch-data.sh $1
sh ./scripts/create-files.sh $1
day=$day npm run watch