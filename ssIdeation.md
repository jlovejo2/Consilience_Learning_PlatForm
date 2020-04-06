# Server-Side Ideation

### Deploy via a third party PaaS other than Heroku
- Familiarize ourselves with 
    - docker
    - alternative deployment methods
- Increase marketability

### use cookies to store JWTs 
- https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle
- Look into:
    - "The best way to store JWT is the memory, while having an HTTP ONLY cookie containing the refresh token"
    - "The cookie used by the backend is automatically embedded in the header when you make request. Maybe what is happening is that you have authenticated a user in the frontend and then when you reload the page it losses the user information so the user needs to login again. If that is the issue, you need means to identify the authenticated user as the real cookie used in the backend is always embedded in the header and you have no access to it. To solve that problem what i do is to create a fake cookie that identifies the user with non-sensitive information about the user that comes from the response on login or signup and save the fake cookie in the frontend cookie storage. This is because even if an attacker somehow gets the cookie from the cookie storage he cant access information from the backend as that is not the real cookie used by the backend. At the same time the fake cookie helps to keep the user logged in when you reload the page. I hope this is the issue you have. If it is try this approach it worked for me."