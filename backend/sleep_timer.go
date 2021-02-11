package backend

import (
	"log"
	"os/exec"
	"runtime"
	"time"
)

var timer *time.Timer

// StartTimer shuts down the system after the given timespan in milliseconds is elapsed.
// If the shutdown command fails, this is currently not communicated to the frontend.
func StartTimer(milliseconds string) bool {
	duration, err := time.ParseDuration(milliseconds)
	if err != nil {
		log.Println(err)
		return false
	}
	shutdown := getShutdownFunction()
	timer = time.AfterFunc(duration, func() {
		_, err := shutdown()
		if err != nil {
			log.Println(err)
		}
	})
	return true
}

// StopTimer stops the current timer in case a timer was started. If no timer was started, stopping is not required
// and thus always returns true.
func StopTimer() bool {
	if !(timer == nil) {
		return timer.Stop()
	}
	return true
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
	output, err := exec.Command("shutdown", "/s").CombinedOutput()
	return string(output), err
}

// shutdownLinux initiates an immediate shutdown on linux systems.
func shutdownLinux() (string, error) {
	output, err := exec.Command("shutdown", "-h", "now").CombinedOutput()
	return string(output), err
}
