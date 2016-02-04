cd "C:\Program Files\MongoDB\Server\3.2\bin"

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\FPTrackingUpdated.csv

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\FPTracking2014.csv



cd "C:\Program Files\MongoDB\Server\3.2\bin"
.\mongodump.exe --host localhost:3001 --db meteor -o C:/Meteor/fp_tracker

meteor deploy fp_tracker.meteor.com --delete

cd "C:\Meteor\FP_Tracker"
meteor deploy fp_tracker.meteor.com

meteor mongo --url fp_tracker.meteor.com

.\mongorestore.exe -u client-8182170e -p b107da18-98c3-6c54-5a73-447e0c8413e5 -h SG-mother1-6243.servers.mongodirector.com:27017 --db fp_tracker_meteor_com C:\Meteor\fp_tracker\meteor
.\mongorestore.exe -h localhost --port 3001 -d meteor C:/Meteor/fp_tracker/fp_tracker_meteor_com

######Dump

mongodb://client-7cdbc25c:f83d182c-a812-6f44-be18-f4e57b665d7e@SG-mother1-6243.servers.mongodirector.com:27017/fp_tracker_meteor_com
mongodb://client-8182170e:b107da18-98c3-6c54-5a73-447e0c8413e5@SG-mother1-6243.servers.mongodirector.com:27017/fp_tracker_meteor_com

.\mongodump.exe -u client-7f22a7c2 -h SG-mother1-6243.servers.mongodirector.com:27017 -d fp_tracker_meteor_com -p 256eb1e0-818e-e307-a855-8bbf89764128 -o C:/Meteor/fp_tracker
