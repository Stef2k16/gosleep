package main

import (
	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
	"log"
	"os/exec"
	"runtime"
)

func startTimer() {
	// shutdown := getShutdownFunction()
	log.Println("I was called")
	//time.AfterFunc(1*time.Second, func() {shutdown()})
}

// getShutdownFunction returns the correct shutdown function for the used OS.
func getShutdownFunction() (shutdown func() (string, error)) {
	os := runtime.GOOS
	if os == "windows" {
		shutdown = shutdownWindows
	} else if os == "linux" {
		shutdown = shutdownLinux
	} else {
		log.Fatalf("OS %s not supported.\n", os)
	}
	return shutdown
}

// shutdownWindows initiates an immediate shutdown on windows systems.
func shutdownWindows() (string, error) {
	output, err := exec.Command("shutdown", "-s", "-t 0").CombinedOutput()
	return string(output), err
}

// shutdownLinux initiates an immediate shutdown on linux systems.
func shutdownLinux() (string, error) {
	output, err := exec.Command("shutdown", "-h now").CombinedOutput()
	return string(output), err
}

func main() {

	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "gosleep",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	app.Bind(startTimer)
	app.Run()
}
