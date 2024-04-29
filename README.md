# Steps to run this project:

1. Clone repo
2. Run `docker-compose up` command in project directory


# API docs

1. post /register 
Register user. 

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

