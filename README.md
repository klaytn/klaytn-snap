# @klaytn/klaytn-snap
## Setup

1) Rename .env.example to .env and configure the Feepayer address and private key

2) Run `yarn install` to install the dependencies

## Building
Run `yarn build` to build this snap or

Run `yarn build:clean` to remove old dist folder and re-build snap

## Start the application
Run Backend and Snap Frontend as shown below
1) Run Backend
Run `yarn backend` to start the backend on 3000 port

2) Run Frontend
Run `yarn serve` to start snap on 9000 port

Access `http://localhost:9000` to start testing Klaytn snap. You can change port number in `snap.config.js` as well
