cd "C:\Program Files\MongoDB\Server\3.2\bin"

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\FPTrackingUpdated.csv


cd "C:\Meteor\FP_Tracker"

meteor deploy fp_tracker.meteor.com



meteor mongo --url fptracker.meteor.com

Which will return something like :

mongodb://client:PASSWORD@sky.member1.mongolayer.com:27017/YOURSITE_meteor_com
Which you can give to a program like mongodump

mongodump -u client -h sky.member1.mongolayer.com:27017 -d YOURSITE_meteor_com\
          -p PASSWORD



cd "C:\Program Files\MongoDB\Server\3.2\bin"
.\mongodump.exe --host localhost:3001 --db meteorBackupData -o C:/Meteor/fp_tracker

meteor deploy fptracker.meteor.com --delete

cd "C:\Meteor\FP_Tracker"
meteor deploy fptracker.meteor.com

meteor mongo --url fp_tracker.meteor.com

.\mongorestore.exe -u client-aaa025c6 -p 2a5507a1-aed4-333d-9de4-92040fde649b -h production-db-e1.meteor.io:27017 --db fp_tracker_meteor_com C:\Meteor\fp_tracker\meteor
