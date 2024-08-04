API REST of Picture of the year plataform

This project is a basic API REST. The database was created whit Mongo Atlas and the server whit EXPRESS. Is a simulation of a photo gallery that are competing for the photo of the year. . It has two models; Users and Pictures.

It is important to mention that the photos that participate in the contest will be stored in our cloudinary platform.

The Pictures model has a field related, the userId, which receives the IDs of the user that upload the picture.

## Technologies

- Node.js
- javaScript
- mongoDB
- Insomnia

## Dependencies

- Nodemon
- express
- dotenv
- mongoose
- bcrypt
- jsonwebtoken
- cloudinary
- multer
- multer-storage-cloudinary

## API URL

http://localhost:3000

To make requests you must add to the API's url, (http://localhost:3000), the following:

/api/v1/users to make request of users.

/api/v1/pictures to make request of pictures.

Then, depending on the request you are doing, add the enpoints described below

## ENDPOINTS

#### USER

get: '/' get all users

get: /:id get an user by ID

post: /register create an user

post: /login login an user

put: /:id Update an User

delete /:id Delete an User

Notes:

To update or Delete an User, you must be the User

#### Pictures

get: '/' get all pictures

get: /:id get a picture by ID

post: / upload a picture

put: /:id Update a picture

delete /:id Delete a picture

Notes:
To upload, update or delete a picture, you must be the user related to the picture

##### important

There is not front end, you have to make the request and upload photos in Multipart Form Data by INSOMNIA or the technology of your choice.
