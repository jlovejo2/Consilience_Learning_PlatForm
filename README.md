# ProjectThree
MERN
heroku repo created
username and password for mLab also created
connection with remote database established via robo3T

- https://socket.io/
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/bcrypt
- http://www.npmjs.com/package/morgan
    -  HTTP request logger middleware for node
- https://www.npmjs.com/package/helmet (tentative)


## Security Considerations

### Authentication vs Authorization
- Authentication
    - Who are you?
    - Login with email and password

- Authorization
    - What are you allowed to do?
    - Check user rights

### JSON Web Tokens (JWTs)
- Access Token Standard
- Structured and Stateless
- Used for authorization and secure info exchange
- Base64 encoded
- Pronounced "JOT"
- Cryptographically signed
    - If tampering occurs authorized status immediately revoked; signature invalid if modified in any way
- Always encoded, can be encrypted
- Open standard (RFC 7519) defining a compact and self-contained method for securely transmitting info between parties as a JSON object

### Anatomy of a JWT - Three Parts
- Header
    - Describes the token
    - Specifies type of token and hash algorithm used to create token's content
- Body
    - Payload
    - Contains user information known as "claims"
    - Information that JWT claiming to be true about user
    - Commonly includes name and timestamp reflecting JWT issue time
    - Token expiration time 
- Signature (cryptographically signed in this app)
    - Verifies integrity of token 
    - Ensures content is uncompromised (hasn't been tampered with)

### Base64 Encoded
- JWT is compact
- Header, Body, and Signature are each Base64 encoded
    - Then separated by dots
    - https://en.wikipedia.org/wiki/Base64
    - https://www.base64encode.net/
    - Base64 Index table (values 0-63)
    - values 0-25 -> uppercase A-Z
    - values 26-51 -> lowercase a-z
    - values 52-61 -> numbers 0-9
    - value 62 -> _
    - value 63 -> -
    
#### JWT Example (Header.Body.Signature)
- Encoded (ASCII--American Standard Code for Information Interchange) 
    - Header:
        - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    - Payload (Body): 
        - eyJfaWQiOiI1ZThhMzFmZDRiMmQ0NTE2NjQ2YTFkYzUiLCJ0eXBlIjoidGVhY2hlciIsImZpcnN0TmFtZSI6Ikt5bGllIiwibGFzdE5hbWUiOiJNb25zdGVyIiwiZW1haWwiOiJLeWxlQGdtYWlsLmNvbSIsIklEIjoia21vbnN0ZXdvbWUxIiwiY3JlYXRlRGF0ZSI6IjIwMjAtMDQtMDVUMTk6MzE6MDkuMjk3WiIsIl9fdiI6MCwiaWF0IjoxNTg2MTczMDU4LCJleHAiOjIxOTA5NzMwNTh9.
    - Signature:
        - 9m0_s_N7T6WE9JfN9gZbQ_k8sEmPvIXszQlLvVk7WUU

### Cookies vs Local Storage -- JWTs on Client Side
- Local storage vulnerable to cross-site-scripting (XSS) attacks
    - Attacker can inject malicious javascript into app
    - Larger attack surface area
    - Can impact all application users on successful attack
- Cookies vulnerable to cross-site request forgery (CSRF)
    - Attacker can perform actions via an authenticated user
    - Similar to how viruses use capsids to infiltrate immune system undetected
- This React app has a dedicated server so JWTs are stored in an HttpOnly Cookie w/ secure flag enabled 
    - protects from cross-site scripting (XSS)
    - secure flag ensures cookie only sent over https
    - such cookies cannot be accessed by JavaScript
    - Hence, why they're generated on a server
    - Can make CSRF protection stateless by including a xsrfToken JWT claim

### Password Hashing
- Bcryptjs was used for password hashing
    - Implemented when a new user is created
    - 10 rounds of salting
    - Unhashed password is never stored in the database
    - all objects performing a response to json have hashed passwords deliberately deleted from collection replicas made via ({ ...xyz._doc })

### Generating environmental secrets
- open terminal in vscode
    - type: node 
    - hit: enter
- this opens up node terminal
    - type: require('crypto').randomBytes(64).toString('hex')
    - hit: enter
- this returns a 122 character string in hexadecimal
    - 1 Byte = 8 bits;
    - 512 random bits (64 Bytes) used in crypto secret generation
    - example: 
        - 'ed3797711bd78a72186fae8b8200bca2e9e14bce3eba46a5797b3bb34f6e23ccac398ffc82fc4bf57d4afab2ffb1aa4a3357aede9f27bbb69d1150dd35'


Decimal | 8-bit Binary | Hexadecimal
------- | ------------ | -----------
0       | 0000 0000    | 00
1       | 0000 0001    | 01
2       | 0000 0010    | 02
3       | 0000 0011    | 03
4       | 0000 0100    | 04
5       | 0000 0101    | 05
6       | 0000 0110    | 06
7       | 0000 0111    | 07
8       | 0000 1000    | 08
9       | 0000 1001    | 09
10      | 0000 1010    | 0A
11      | 0000 1011    | 0B
12      | 0000 1100    | 0C
13      | 0000 1101    | 0D
14      | 0000 1110    | 0E
15      | 0000 1111    | 0F
16      | 0001 0000    | 10
17      | 0001 0001    | 11 
18      | 0001 0010    | 12
19      | 0001 0011    | 13 
20      | 0001 0100    | 14
21      | 0001 0101    | 15 
22      | 0001 0110    | 16
23      | 0001 0111    | 17
24      | 0001 1000    | 18
25      | 0001 1001    | 19
26      | 0001 1010    | 1A
27      | 0001 1011    | 1B
28      | 0001 1100    | 1C
29      | 0001 1101    | 1D
30      | 0001 1110    | 1E
31      | 0001 1111    | 1F
32      | 0010 0000    | 20
33      | 0010 0001    | 21
34      | 0010 0010    | 22
35      | 0010 0011    | 23
36      | 0010 0100    | 24
37      | 0010 0101    | 25
38      | 0010 0110    | 26
39      | 0010 0111    | 27
40      | 0010 1000    | 28
41      | 0010 1001    | 29
42      | 0010 1010    | 2A
43      | 0010 1011    | 2B
44      | 0010 1100    | 2C
45      | 0010 1101    | 2D
46      | 0010 1110    | 2E
47      | 0010 1111    | 2F
48      | 0011 0000    | 30
49      | 0011 0001    | 31
50      | 0011 0010    | 32
51      | 0011 0011    | 33
52      | 0011 0100    | 34
53      | 0011 0101    | 35
54      | 0011 0110    | 36
55      | 0011 0111    | 37
56      | 0011 1000    | 38
57      | 0011 1001    | 39
58      | 0011 1010    | 3A
59      | 0011 1011    | 3B
60      | 0011 1100    | 3C
61      | 0011 1101    | 3D
62      | 0011 1110    | 3E
63      | 0011 1111    | 3F
64      | 0100 0000    | 40


- https://introcs.cs.princeton.edu/java/61data/


- Note: can delete node_modules from terminal via rm -rf node_modules/