# Project Name: Catter

## Description

A Tinder-style cat adoption app.  

Users first fill out a lifestyle form about them.   

The app generates a personalized ranking of cats that best match the user’s profile.  

Users can swipe right to "like" a cat and swipe left to skip. 

## Main Features
### Lifestyle Form + Recommendations
   - User fills out a lifestyle form.
   - AI ranks cats based on the user’s preferences.  

### Swiper (Main Page)  
   - Swipe right to "like" a cat, left to skip.  

### Chat Tab  
   - Message directly with shelters or cat owners.  

### Guide Tab  
   - Receive personalized guides based on your profile.  
   - Ask your own questions and get answers.  

### Profile Tab  
   - Upload your own cat.

## Requirements
[https://nodejs.org/en/download](https://nodejs.org/en/download) to install Node.JS
- This will provide all the necessary dependencies

## Setting Up the Project

```bash
git clone https://github.com/nakvong/catter.git
cd catter
cd catter-160
npm install
npm run dev
```

## Configuring AI models

This project uses reagent for LLM calls. Please setup an account on rea.gent and create a noggin, which is a way to manage your budget tokens and organize your API calls into tasks, with your desired LLM model. 

Replace the API keys in the project codebase with your API keys.
