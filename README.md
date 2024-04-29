# Steps to run this project:

1. Clone repo
2. Create .env file
2. Run `docker-compose up` command in project directory

# .env example 
HOST=127.0.0.1
USER=postgres
PASSWORD=postgres
DATABASE=postgres
DB_PORT=5433
JWT_ACCESS=ba70974041a7db0f73c066d1f746abae5f2505564503503e45465aa645a29403
REFRESH_JWT=051878230fd7116c7ed56a5134ca35946396fb0f3e7ddbee3319cb46498fbd6a
SCOPE=https://www.googleapis.com/auth/spreadsheets

# About 

i have created a web page parser with auth via jwt token. in this project i used some new for me modules like google-auth-library, google-spreadsheet and cheerio. it was interesting to work with googleAPI it's new for me same with cheerio. it's hard to explain how it's work because there nothing special. after login user get token that allow him use any endpoint and every time he makes a call to endpoint middleware check it's headers and check token for validity. if it has expired, it needs to be updated. also via token app understands who makes request to parser and store this data in db. parser works with cheerio lib. it use selector to get specific data and with fs and csv-writer we can write this files to disk. also this parsed page can be save to cloud google sheet via google-auth-library and google-spreadsheet. we use json auth file that googleAPI allow to download. also it includes simple error middleware that handle errors. app conteinerized so it's should be easy to start i guess.

# API docs

1. post /register 

{
    "userName": "str",
    "email": "str",
    "password": "str"
}

returns ok if success

2. post /login 

{
    "email": "str",
    "password": "str"
}

returns tokens if success;

3. post /refreshTokens

{
    "refreshToken": "your_token"
}

returns new pair, update refresh token

4. get /logout 

add current token to blacklist 

5. get /parse 
use credential JSON from googleAPI 

{
    "email": "emailexample.iam.gserviceaccount.com",
    "sheetsId": "sheetidexample",
    "privateKey": "privateKey"
}

6. get /parse-request

return all parse requests

