# Task 9
## 1.Task https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view
## 2.How to run the app
To install needed dependencies run:
> npm install

To start the app:
> npm run server 
## 3.Database snapshot
Database consists of collection "users". Each user has fields "email", "id" and a subcollection of images called "images", that belong to him. Each image has fields "id", "author", "authorId", "date" , "link". 

## 4.Application stack
Utilised for this project:
- sass
- typescript
- firebase
- vue-router
- vuex
- husky
- lint-staged
- uuid
## 5.Folder structure
assets - contains assets such as svg, images;
components - Vue components;
constants - contains constants;
database - contains firestore database setup and configuration;
helpers - helper functions for drawing in CanvasComponent;
router - Vue-router setup;
types - typescript interfaces;
views - views for each route;