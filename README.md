# Dealer Tokes Client
Thomas Wallace

LInk to Live APP - https://dealer-tokes-client.tomwallacejr.vercel.app
 Server Repo - https://github.com/TomWallaceJr/DealerTokes-Server
 Client Repo - https://github.com/TomWallaceJr/DealerTokes
Heroku -  https://pacific-retreat-10215.herokuapp.com/api

# Summary of App
This App built specifically for Poker Dealers, will allow users to track the days tehy work, how much they make in 'tokes' (casino talk for tips) as well as how much they make per hour and per down (number of tables dealt).

After registering and logging in, the user will be directed to the Dashboard route where they will see an interactive calendar. When the user selects a day, a component is rendered that will ask the user for the information on said workday. Once entered, the information is stored in a psql database on the server side.

The user may view their statement page which will calculate how much in tokes they've earned overall, how much they make per hour, and how much they make per down.



# API DOCUMENTATION
# Example req/res requests

POST /api/user <br />
*creates a new user and puts them in DB*<br />
REQ BODY: {<br />
    "username": "JohnnyBoy",<br />
    "password": "Password123!",<br />
    "name": "John Smith<br />
}<br />
<br />
Response:<br />
[<br />
    "username": "JohnnyBoy",<br />
    "name": "John Smith",<br />
]<br />
<br />
GET /api/workday/2  <br />
*returns all users workdays* <br />
<br />
Response:<br />

{<br />
    "id": 1,<br />
        "hours": "5",<br />
        "downs": "5",<br />
        "tokes": "120",<br />
        "notes": "YEEHAW",<br />
        "date": "2021-02-01T00:00:00.000Z",<br />
        "user_id": 2<br />
},<br />
{<br />
        "id": 3,<br />
        "hours": "8",<br />
        "downs": "13",<br />
        "tokes": "342",<br />
        "notes": "Busy",<br />
        "date": "2021-01-31T00:00:00.000Z",<br />
        "user_id": 2<br />
    },<br />
    etc .... will return all users workdays<br />
]<br />
<br />
DELETE /api/workday/2<br />
*will delete ALL USERS WORKDAYS*<br />
<br />
DELETE /api/workday/2/date/2020-2-2<br />
*Will Delete current users workday from that specific date*<br />
<br />
POST /api/workday<br />
*Enters a new workday into DB*<br />
REQ BODY: {<br />
        "hours": "4",<br />
        "downs": "5",<br />
        "tokes": "58",<br />
        "notes": "Slow",<br />
        "date": "2021-01-19",<br />
        "user_id": 2<br />
}<br />
<br />
Response:<br />
{<br />
    "id": 14,<br />
    "hours": "5",<br />
    "downs": "4",<br />
    "tokes": "58",<br />
    "notes": "Slow",<br />
    "date": "2021-02-04T00:00:00.000Z",<br />
    "user_id": 2<br />
}<br />

<br />
DEMO LOGIN
USERNAME - twallace
PASSWORD - Password123!

<img src="src/images/screenshot1.png">
<img src="src/images/screenshot2.png">
<img src="src/images/screenshot3.png">
<img src="src/images/screenshot4.png">