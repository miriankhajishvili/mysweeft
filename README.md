
Installation
$ npm install


# watch mode
$ ng s
$ npm run json-server


To activate back server, please run command npm run json-server


About Projeact : 

1. You will see a list of users with two buttons: go to profile and delete user
2. You will also see a navigation bar with two buttons: to go to the main page and to create a new user
3. After going to the profile, you will go to a specific user who has a list of friends, which in turn has its own two buttons: view profile and delete user
4. Also, after opening the user's profile, you can add the user as a friend or remove him from the list. Friends are added from the list that already exists on the db.json server
5. Of course, this all works with a scrolling method that gradually pulls users and friends out of the page
6.When creating a new user, you must fill in the fields, otherwise validation will not allow you to create a new user without passing it.
7.When deleting users, you will see a deletion confirmation button, asking you to specify whether you really want to delete the user or friend.


