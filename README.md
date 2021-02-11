# gosleep <img width="25" height="25" alt="gosleep screenshot" src="https://github.com/Stef2k16/gosleep/blob/master/frontend/public/logo192.png">
[![Go Report Card](https://goreportcard.com/badge/github.com/Stef2k16/gosleep)](https://goreportcard.com/report/github.com/Stef2k16/gosleep)

Gosleep is a simple sleep timer desktop application implemented with [Wails](https://wails.app/) 
and [React](https://reactjs.org/). 

<img width="187" height="275" alt="gosleep screenshot" src="https://github.com/Stef2k16/gosleep/blob/master/frontend/public/example.png">

## Build
You need to install [Wails](https://wails.app/) and it's dependencies first. Then simply run
`wails build` to create an executable.

## Development
To start the development server for the Wails backend, run `wails serve`.
 The backend needs to be manually restarted after each change to the Go code.
 
Run the frontend with `npm run start`.
