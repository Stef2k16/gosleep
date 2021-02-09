package main

import (
	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
	"gosleep/backend"
	"log"
)

func main() {
	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  300,
		Height: 450,
		Title:  "gosleep",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	app.Bind(backend.StartTimer)
	app.Bind(backend.StopTimer)
	log.Fatal(app.Run())
}
