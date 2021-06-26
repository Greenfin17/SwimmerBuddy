# Swimmer Buddy
## Overview
- This site is designed for swimmers.
- The site allows the user to create, view, update and remove workouts.
- The user can organize their workouts into collections.
- The user can add workouts created by other swimmers to their own collections.

## Site Link
[![Netlify Status](https://api.netlify.com/api/v1/badges/5ce0d99c-0d19-43fa-8dd5-a943ed94daae/deploy-status)](https://app.netlify.com/sites/swimmer-buddy/deploys)

https://swimmer-buddy.netlify.app/

## User Story
 - When the user opens the home page, the user sees a menu with a workouts link and a login button.
 - The user can view public workouts by clicking the workouts Link. The user can search public workouts.
 - The user can sign in using Google.
 - The authenticated user can add their location and any club affiliation in their user profile.
 - The authenticated user can view workouts created by the user and workouts created by other users that are marked public.
 - The authenticated user can create, view, update and delete their own workouts.
 - The authenticated user can create, view, update and delete their own personal collections of workouts.
 - A workout can be added to more than one collection.
 - A workout added to a collection does not have to be a workout created by the user if the creator marked the workout public.

## MVP
- The authenticated user can create, read, update and delete workouts.

## STRETCH
- The authenticated user can mark their workouts public.
- The unauthenticated user can view and search public workouts.
- The authenticated user can create, read update and delete collections of workouts
- The authenticated user can search their own collections.
- The user can print a workout to bring to the pool.

 
## ERD
https://dbdiagram.io/d/60a5b120b29a09603d15abec

## Wireframes
https://www.figma.com/file/uziJlOLbyn5l9UUaELQA4t/Swimmer-Buddy?node-id=1%3A2

## Flow Chart
https://lucid.app/lucidchart/5d56ad97-811f-4e41-8585-388dedf594f0/edit?page=0_0#

## Personal Bio Site
[![Netlify Status](https://api.netlify.com/api/v1/badges/9e639f94-6157-4618-a5ed-dbb4c6d7dc1e/deploy-status)](https://app.netlify.com/sites/bio-site-john-maple/deploys)

https://bio-site-john-maple.netlify.app/

## Loom Video
https://www.loom.com/share/92d159faeaa4420cac18761b302ec346

## Deploy Instructions
- Clone repo
- npm install 
- create firebase database at firebase.google.com
- add small portion of data from src/data/sample_data to firebase - to create database url
- rename or copy .sample.env to .env
- copy environment variables from firebase to .env  ( not to sample.env !)
- add rules found in firebase_rules.txt to firebase
- select sign-in method at firebase under Authentication
- add any deployed domain to firebase under sign-in method
