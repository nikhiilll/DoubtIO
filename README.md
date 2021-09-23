
# Doubt.IO

Doubt.IO is a platform for users to ask their doubts pertaining to any topic and get help from other users on the platform.
Currently the doubts asked on the platform are related to programming as the initial users are developers themselves.



![Logo](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/logo.png)

    
## Live Demo
The web application is hosted on:
https://doubtio.netlify.app/
  
## Features

- Login/Sign up using email and password. 
- Timeline with the recently asked doubts by the users of the platform.
- Users can ask their doubts by providing appropriate title, description, upload images and create tags for the questions.
- Users can upvote and comment on the doubt posts.
- Global search functionality to search for relevant previously asked doubts.
- Profile visit functionality to check any user's profile, doubts asked by the user and other information.
- Users can edit their own profile information like name, profile picture and description.
- Fully responsive across all devices
## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node.js, Express.js, MongoDB

**Other:** AWS S3, JsonWebToken, Multer, Bcrypt
## Screenshots

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio_login.png)


![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio_dashboard.png)


![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio_globalsearch.png)


![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio_askdoubt.png)


![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio-postview.png)


![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/doubtio/screenshots/doubtio_profileview.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/nikhiilll/DoubtIO.git
```

To start the server, follow the below commands
```bash
  cd server
  npm install
  npm run dev
```

To start the client, follow the below commands
```bash
  cd client
  npm install
  npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your server .env file

`MONGODB_URI`: MongoDB Atlas URI

`JWT_SECRET_KEY`: Generate your own secret key for signing and decoding the JSON Web Tokens.

Following environment variables are needed for storing/retrieving the profile and doubt-post images for the users from AWS S3 bucket.
`AWS_BUCKET_NAME`
`AWS_BUCKET_REGION`
`AWS_ACCESS_KEY`
`AWS_ACCESS_KEY`
The names are self-explanatory and can be easily found in the AWS console.


For the client, in the client/src/constants.js file, you would need to change the `API_ROOT` constant to your backend API host.
