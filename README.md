# E-learning web

E-learning frontend website build with [Next.js](https://nextjs.org/).

**Features**:
<ul>
	<li>- [x] Course Management</li>
	<li>- [x] Blog Management</li>
	<li>- [x] Quiz Management</li>
	<li>- [x] Category</li>
	<li>- [x] Tag</li>
	<li>- [x] Course Bookmark</li>
	<li>- [x] Course Review</li>
	<li>- [x] User Management</li>
	<li>- [x] AI powered content editor</li>
	<li>- [x] Dark mode support</li>
	<li>- [ ] Subscription</li>
</ul>

This project is a frontend part of [E-learning backend](https://github.com/phyohtetarkar/hope-elearning-backend/).

## Requirements

<ol>
	<li>Node.js 18.17 or later</li>
	<li>TinyMCE self-hosted</li>
</ol>

This project use [TinyMCE](https://www.tiny.cloud/) for some rich text editing. You need to download TinyMCE self-hosted source [here](https://www.tiny.cloud/get-tiny/self-hosted/) and then unzip and place inside **public** folder or you can host anywhere you wish to place. Read more about TinyMCE self-hosted [here](https://www.tiny.cloud/blog/get-started-with-tinymce-self-hosted/).

## Installation and setup

**This project use Firebase auth as authentication layer. So, you first need to setup firebase auth. Or you can use any other authentication providers like AWS Cognito, Auth0 etc., and setup accordingly.**

Required `.env.local` file properties.

```ini
NEXT_PUBLIC_APP_NAME=Brand
NEXT_PUBLIC_APP_DESC=Start a new career in the software developing industry.

# http://localhost:3000 or (http|https)://yourdomain.com
NEXT_PUBLIC_BASE_URL= 

# backend api url
NEXT_PUBLIC_API_URL= 

# backend api url local for server actions & server components e.g, http://localhost:3080/api
NEXT_PUBLIC_API_URL_LOCAL= 

# Self-hosted TinyMCE source url 
NEXT_PUBLIC_TINYMCE_SCRIPT_SOURCE=http://localhost:3000/tinymce/tinymce.min.js

# Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# OpenAI API Key
OPENAI_API_KEY=

# Gemini API Key
GOOGLE_API_KEY=

# Choose Default AI provider
DEFAULT_AI_PROVIDER= # GOOGLE | OPENAI
```

Installing dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```

## Support me

<a href="https://www.buymeacoffee.com/yzox2vc1i">
	<img src="images/bmc-button.png" width="200">
</a>
<br/>
<br/>

## Screenshots

<img src="images/landing.png">

<img src="images/course-detail-dark.png">

<img src="images/quiz-learn.png">

<img src="images/dashboard.png">

<img src="images/lesson-edit.png">

<img src="images/lesson-edit-dark.png">

<img src="images/post-edit.png">

<img src="images/math-equations.png">


