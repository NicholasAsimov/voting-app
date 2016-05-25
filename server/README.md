# server-auth-boilerplate
Token-based authentication server boilerplate using Express, Mongoose and Passport

## Getting Started

### Environment variables
In the root directory create __.env__ file with the following content:
```
MONGODB_URI=mongodb://username:password@host:port/database
SECRET_KEY=mySecretString
```
*__MONGODB_URI__: MongoDB connection string*  
*__SECRET_KEY__: random string of characters for token encoding/decoding*
