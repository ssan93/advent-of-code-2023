printf -v day "%02d" $1
mkdir -p ./src/solutions
mkdir -p ./src/solutions/aoc-$day
curl --cookie "session=53616c7465645f5fee982ebcc6918af73407dfa67d3b3e688ad2e341a22ad9aa7631fb5ffbe33d1bcc97b6ffbd2f2a70c05e04dedb983f9e41d7b622d0f41091" https://adventofcode.com/2023/day/$1/input --output ./src/solutions/aoc-$day/data.txt