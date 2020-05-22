Quick REST API Scale Tester
-----------
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/cowie/apiTester)

So first off - don't use this to **really** load-test Salesforce.com That's bad. Call your AE/Support team to do a proper load test. This is for scrub work. I'm a scrub, you should be too.


Usage
-----------
So this is pretty straightforward. Node app that simply does an auth to SFDC, and inputs a single row into 'specified object'. Console logging will pull out the execution speed of the insert call to get you a feeling for speed of insert. Where does this get fun?

Use Loader.io to bulk hit this app (you might wanna jack some dynos) to do multiple calls concurrently to simulate lots of hits at Salesforce. A test we did for awhile when putting this up was legit 500 clients pushing single records concurrently. I don't suggest that as an integration strategy, but you can try it for some numbers if you're a numbers guy/gal. 

1) Hit da button above, make da app

2) Click on the loader.io add-on, to get your loader key

3) Go to SFDC and get you a login + token

4) Punch in loader key + sfdc login deets into the settings area of your app, and restart da dynos

5) go to yourapp.herokuapp.com/restInserts/Account?name=ItWorks! - this should return you an ID/Timestamp, and in your org the record should be made.

Syntax: yourapp.herokuapp.com/restInserts/OBJECTAPINAME?field=value&field2=value2...&fieldn=valuen

6) Now go back to loader.io, and set up a new test, hitting that heroku app as often as you want to test throughput to the org.

7) Finish the test, go to PaperTrail from your Herokuapp, and search by 'time for insert' to get all insert numbers.