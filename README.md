# github-user-repos (task number 2)

## Introduction

The aim of the presented application is to list public repositories of github users, sorted by their popularity.

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Important notes](#important-notes)
* [App development directions](#app-development-directions)

## Technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and tested with [JEST](https://jestjs.io/)\
Project is created with:
* npm version: 7.7.5
* Node.js version: 14.16.0

## Setup

* clone the repository
* install all necessary libraries by navigate to project folder and type in terminal `npm install`
* run the app by type `npm start`
* open [http://localhost:3000](http://localhost:3000) to view it in the browser

### `npm test`

Launches the test runner in the interactive watch mode.\
Unit tests are testing component rendering and a series of website behaviors after entering and sending various data from the form.

## Important notes

Github's api allows you to make 60 requests per hour. With a large number of repositories, it is not possible to execute requests continuously.\
You can increase this number of requests up to 5,000 per hour in your project through authorization.

We authorize using a token generated from [https://github.com/settings/tokens/](https://github.com/settings/tokens/)\
At last we put it in the `token` variable with the 'token ' prefix in `src/pages/home (line 15)`

![image](https://user-images.githubusercontent.com/57035563/115972359-22836280-a54e-11eb-95f1-fc2e7ad97a70.png)

## App development directions

Several functionalities can be implemented in the future:

* sort data both ways
* view detailed information about the repository
* more complex - dynamic repository search
