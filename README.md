<h1 align="center">Pomodoro</h1>

<h4 align="center">Minimalist Pomodoro timer with customizable session/break times and colors.</h4>

## What is the Pomodoro Technique

The [*Pomodoro Technique*](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a method to manage time through work and break intervals. Traditionally, the timer goes through four intervals of work (25 minutes) and breaks (5 minutes) with the last break being longer, usually around 15 minutes. One pomodoro equals one complete session. After four pomodoros are complete the long break starts, and then the timer restarts to the beginning with no pomodoros complete. Its purpose is to build discipline by enforcing sessions of work with no distractions and breaks to let the mind relax for a short amount of time before continuing with work.

## How to use

![Pomodoro Guide](docs/pomodoro-guide.png)

### Time Options (TO)

    Click to select
  
1. Session
2. Break
3. Long Break

### Controls (C)

1. Play - Start or resume the timer
2. Pause - Pause the timer
3. Stop - Reset the currently selected time (this will not reset any pomodoros)
4. Reset - Reset the timer to its original values (this will reset all pomodoros)
    * Session - 25
    * Break - 5
    * Long Break - 15

### Change Time Length

Change time length through the arrows next to session and break, or through the settings.

### Keyboard Shortcuts

* Controls
  * SPACE - Play/Pause
  * ALT + S - Stop
  * ALT + R - Reset
* Time Options
  * ALT + P - Session
  * ALT + B - Break
  * ALT + L - Long Break
* Change Time Length
  * ALT + ↑ - Increase time
  * ALT + ↓ - Decrease time

## Features

* Customizable Times - From one minute up to one hundred hours.
* Pre-built Color Themes - Choose from a variety of hand-picked themes.
* Custom Themes - Make a theme with any colors you want!
* Keyboard Shortcuts - For faster use.
* Preferences - Customize the timer in the settings menu.
* Notifications - Get alerted when a time session finishes.

## Tech

* [Express](https://expressjs.com/) - Simple web server to serve static files.
* [Gulp](https://gulpjs.com/) - Streaming build system. Automates concatenating and minifying files.
* [Spectrum](https://bgrins.github.io/spectrum/) - Color picker used to make a custom theme.
* [jQuery](https://jquery.com/) - Serves up spectrum.
* [Push](https://pushjs.org/) - Notifications for when sessions or breaks finish.

The majority of the core application is made in vanilla HTML, CSS, and JavaScript.

## License

[MIT](LICENSE)
