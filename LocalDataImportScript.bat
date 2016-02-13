cd "C:\Program Files\MongoDB\Server\3.2\bin"

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\FPTrackingUpdated.csv

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\FPTracking2014.csv

.\mongoimport.exe -h localhost:3001 --db meteor --collection leads --type csv --headerline --upsert --file C:\Meteor\FP_Tracker\uploadData\fosterParent2_13_16.csv


###Local Import

cd "C:\Program Files\MongoDB\Server\3.2\bin"
.\mongodump.exe --host localhost:3001 --db meteor -o C:/Meteor/fp_tracker/uploadData


####Site Deletion
meteor deploy fp_tracker.meteor.com --delete



###Site Deployment
cd "C:\Meteor\FP_Tracker"
meteor deploy fp_tracker.meteor.com

####String collection
meteor mongo --url fp_tracker.meteor.com


####Site restoration
cd "C:\Program Files\MongoDB\Server\3.2\bin"
.\mongorestore.exe -u client-78dca818 -p 91f61b58-c95b-415a-227f-755fc57cc292 -h SG-mother1-6242.servers.mongodirector.com:27017 --db fp_tracker_meteor_com C:\Meteor\fp_tracker\uploadData\meteor
.\mongorestore.exe -h localhost --port 3001 -d meteor C:/Meteor/fp_tracker/fp_tracker_meteor_com

######Server Data Dump
mongodb://client-78dca818:91f61b58-c95b-415a-227f-755fc57cc292@SG-mother1-6242.servers.mongodirector.com:27017/fp_tracker_meteor_com
mongodb://client-7cdbc25c:f83d182c-a812-6f44-be18-f4e57b665d7e@SG-mother1-6243.servers.mongodirector.com:27017/fp_tracker_meteor_com


.\mongodump.exe -u client-d38dbe43 -h SG-mother1-6242.servers.mongodirector.com:27017 -d fp_tracker_meteor_com -p 18daf0c9-b355-01f8-185e-6003c769fce4 -o C:/Meteor/fp_tracker
