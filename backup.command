while :
do
./mongoexport --db statistics --collection entries --out ~/Desktop/Backups/data.json
sleep 86400s
done