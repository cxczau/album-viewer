# album-viewer

## Installation
1. Run `yarn install` in `/client` and `/server` folders
2. Run `yarn start` in `/client` and `/server` folders (separate terminals)
3. Run `yarn start_dev` in `/server` folder to start a local copy of JSON Placeholder

## Description

### Task 1
Find out how https://jsonplaceholder.typicode.com/ REST API works and make a web page to display all photos in album id:1.

### Task 2
Create a page with a form to submit new user to https://jsonplaceholder.typicode.com/.

### Task 3
Write an unit test for task 2 to confirm the response from server when submit.

### Use React, Node, Styled-Component, Redux and any other tools/packages.

## Packages used
node 18.7.0
styled-components
material-ui
jest

## Progress Notes

- initial project setup
- add jest for unit tests
- fetch album 1's photos from API
- add material-ui and styled-components
- add JSON Placeholder as a package on /server
- use JSON Placeholder to create a server for data to be queried
- Albums Front-end carousel
- Albums API
- Users API
- Users form
- Pass response info to front end
- jest test for sanitizeUser
- jest test for createUser
- User creation success component on form
