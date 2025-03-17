# BOOTSTRAP CSS / ICONS REACT PROJECT TEMPLATE

## Introduction

Hello! This readme is a quick primer for what you are about to use in the above.

This is a template for react projects that comes with bootstrap and bootstrap svg icons preinstalled. As well as a reusable icon component to rapidly create and add icon components where ever you need across the project. 

I created this because I was tired of needing to do the additional setup for every project. While you can opt not to use the icons in the projects or apps you create (and in that case you probably don't need this template)
please be aware that the reusable icon component ONLY works with bootstrap icons. 

## Setup

To setup this as part of a react project you can fork the repo / use the template or clone it locally

Use fork repo / use as template or to clone:
```
git clone https://github.com/shaAnder/react-bootstrap-icons.git
```

Once the repo is cloned and you have access to it in your terminal / IDE just run the usual

```
npm install

npm start
```

## Usage

From here everything should be working as intended

To create a new icon you need to import the icon into your component:

```
import Icon from "./components/Icon";
```

Then include it with the props as needed

```
<Icon name="house" size={32} color="blue" />
```

Other than that that's it happy icon maxxing!

## To Note

- As this is strictly using bootstrap icons with fonts it requires you to know what icons you will use see [bootstrap-icons](https://icons.getbootstrap.com) for a list of all icons
- This may not currently be up to date as the icon files are constantly being updated as of 17/03/2025 this is up to date
- While you can also use npm to install the icons (npm i bootstrap-icons) this is an option for people who want to use vendor files and have a physical copy

