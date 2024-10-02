# E-learning web

This project is a frontend part of [E-learning backend](https://github.com/phyohtetarkar/hope-elearning-backend/). This project implements micro-frontend architecture built with [Turborepo](https://turbo.build/). 

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

## Requirements

<ol>
	<li>Node.js 18.17 or later</li>
	<li>E-learning backend APIs</li>
	<li>TinyMCE self-hosted</li>
</ol>

This project use [TinyMCE](https://www.tiny.cloud/) for some rich text editing. You need to download TinyMCE self-hosted source [here](https://www.tiny.cloud/get-tiny/self-hosted/) and then unzip and place inside **public** folder or you can host anywhere you wish to place. Read more about TinyMCE self-hosted [here](https://www.tiny.cloud/blog/get-started-with-tinymce-self-hosted/).

Required `.env` file properties are inclued inside each apps as `.env.example` file.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `elearning-web`: E-learning consumer app using [Next.js](https://nextjs.org/)
- `elearning-admin`: E-learning admin app using [Next.js](https://nextjs.org/)
- `@elearning/ui`: UI and other central components shared by both `elearning-web` and `elearning-admin` applications
- `@elearning/lib`: a utility library shared by both `elearning-web` and `elearning-admin` applications
- `@elearning/global-store`: redux global store shared by both `elearning-web` and `elearning-admin` applications
- `@elearning/block-editor`: customized tiptap based AI-powered block editor
- `@elearning/assets`: fonts and images assets 
- `@elearning/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@elearning/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@elearning/tailwind-config`: tailwindcss configuration including base css

### Directory structure

```bash
.
├── apps                   
│   ├── admin     
│   └── web  
├── packages                   
│   ├── assets     
│   ├── block-editor     
│   ├── config-eslint     
│   ├── config-tailwind     
│   ├── config-typescript     
│   ├── global-store     
│   ├── lib    
│   └── ui       
└── ...
```

### Multi-Zones

[Multi-Zones](https://nextjs.org/docs/app/building-your-application/deploying/multi-zones) is a way of having independent Next.js applications that all render on a common domain. This is a method for building separation of concerns in large teams. It works well if a single domain has separate groupings of pages where a user doesn't navigate between the groups very often.

In this project, ./apps/web is our main app, and ./apps/admin is a separate app that handles all routes for /admin/**.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd elearning-frontend
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd elearning-frontend
pnpm i
pnpm dev
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