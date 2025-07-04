# VueJS BFF Test Repo

This is a test repository that explores using the BFF pattern in a mono repo set up.
There are three different BFF options provided as part of this:

- NestJS
- ExpressJS
- NitroJS

## Pre-Requisites

This repo utilises [pnpm](https://pnpm.io/) for managing the monorepo and dependencies. Please ensure that this is installed and you're using the latest version of NodeJS.

I would recommend using [nvm](https://github.com/nvm-sh/nvm) and running:

```sh
nvm install node
nvm use node
nvm alias default node
```

## Setup

1. Clone the repo and open the repo in a terminal
2. Install the dependencies:
  ```sh
  pnpm install
  ```
3. Build the schema, util and type pacakges:
  ```sh
  pnpm run build
  ```
4. Run the preferred services:
  ```sh
  pnpm run dev:nest # Run with NestJS BFF
  # OR
  pnpm run dev:nitro # Run with NitroJS BFF
  # OR
  pnpm run dev:express # Run with ExpressJS BFF
  ```
5. Open the [app](http://localhost:5173) in your browser and poke around.
