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

meteor deploy fp_tracker.meteor.com --delete

cd "C:\Meteor\FP_Tracker"
meteor deploy fp_tracker.meteor.com

meteor mongo --url fp_tracker.meteor.com

.\mongorestore.exe -u client-b71044c9 -p 669443eb-1332-2509-8cc5-f5384ab76245 -h SG-mother1-6243.servers.mongodirector.com:27017 --db fp_tracker_meteor_com C:\Meteor\fp_tracker\meteor
