cd /Applications/mongodb-osx-x86_64-3.4.10/bin
while :
do
./mongoexport --db statistics --collection entries --out ~/Desktop/Backups/data.json
sleep 86400s
done
