cd "C:\Program Files\MongoDB\Server\3.0\bin"

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --file C:\Meteor\FP_Tracker\FPTracking.csv


cd "C:\Meteor\FP_Tracker"

meteor deploy fp_tracker.meteor.com



meteor mongo --url fptracker.meteor.com

Which will return something like :

mongodb://client:PASSWORD@sky.member1.mongolayer.com:27017/YOURSITE_meteor_com
Which you can give to a program like mongodump

mongodump -u client -h sky.member1.mongolayer.com:27017 -d YOURSITE_meteor_com\
          -p PASSWORD



cd "C:\Program Files\MongoDB\Server\3.0\bin"
.\mongodump.exe --host localhost:3001 --db meteor -o C:/Meteor/fp_tracker

meteor deploy fptracker.meteor.com --delete

cd "C:\Meteor\FP_Tracker"
meteor deploy fptracker.meteor.com

meteor mongo --url fptracker.meteor.com

.\mongorestore.exe -u client-692c864c -p befd8091-146f-8738-028d-1a9f7d834000 -h ds029635-a0.jhd88.fleet.mongolab.com:29635 --db fptracker_meteor_com C:\Meteor\fp_tracker\Meteor
