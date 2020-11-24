<h1 align="center">
    <a href="https://p0m0timer.herokuapp.com/">Pomotimer</a>
</h1>

<h4 align="center">Minimalist Pomodoro timer with customizable session/break times and colors.</h4>

# What Is the Pomodoro Technique

The [*Pomodoro Technique*](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a method to manage work time through work and break intervals. It was developed by *Francesco Cirillo* in the 1980s. Traditionally, the timer goes through four sessions of work (25 minutes), three short breaks (5 minutes), and one long break (15 minutes). One pomodoro equals one complete work session. After a work session a short break starts, and after four pomodoros are complete, a long break starts. After that, the timer restarts fresh to the beginning with no pomodoros complete, restarting the cycle. Its purpose is to build discipline by
enforcing sessions of work with no distractions and breaks to relax before continuing with work.

## How to Use

![Pomodoro Guide](docs/pomodoro-guide.png)

### Time Options

1. Session - Work time. One finished session equals one complete pomodoro.
2. Break - Short break before continuing with another session.
3. Respite - Long break after four sessions (pomodoros) are complete.

### Controls

1. Play/Pause - Play or pause the timer.
2. Stop - Reset the currently selected time (this will not reset any pomodoros).
3. Reset - Reset the timer, including all pomodoros.

### Time Length

Change time length in the settings.

### Step-by-Step Guide

1. Begin your work session. Focus 100% on the task, try not to get distracted.
2. You finished your work session. One pomodoro complete. Relax on your short break.
3. Short break over. Repeat steps 1-2 until you are on your fourth work session.
4. You are now on your last pomodoro before the long break. Work hard and push through.
5. Last pomodoro complete, it's time for the long break. If studying, go over what you learned in your head. Take a walk or sit down, whatever helps you.
6. Repeat the process at step 1 until you are done with working.

### Keyboard Shortcuts

* Controls
  * SPACE - Play/Pause
  * S - Stop (current time reset)
  * R - Reset (current time & pomodoros reset)
* Time Options
  * P - Session
  * B - Break
  * L - Respite

## Setting up for Development

### Packages

Install all the required packages:

```javascript
npm install
```

### Server

Basic Express.js server that serves up static files. Run the server with nodemon:

```javascript
npm run server
```

### Scripts

In this folder are several bash scripts for git to speed up committing, pushing, merging, etc. You might find them useful.
****
### Client

This is where all the application development files reside. All these files are streamed to the dist folder with gulp.js. The files here are concatenated and minified; they do include map files. Start up automatic building:

```javascript
npx gulp watch
```

Any HTML, CSS, or JavaScript file modified in client will now automatically run the default gulp task. Check out all the tasks in the [Gulp Tasks](#gulp-tasks) section below.

### Ready to Deploy

Before adding and committing with git, generate the correct files for a production build:

```javascript
npx gulp production
```

It is similar to `npx gulp` except it wraps JavaScript files in a self-executing function. This is to prevent polluting the global namespace and save space in the browser.

## Gulp Tasks

```markdown
Run tasks with "npx gulp", e.g. "npx gulp build"
```

* Development
  * concat - Concatenate all scripts and stylesheets.
  * copy - Copy all needed files.
  * build - concat + copy
  * cleanAll - Remove all files from dist, excluding .git and CNAME.
  * cleanVendor - Remove all files from vendor.
  * default - cleanAll + build
  * watch - Watch all HTML, CSS, and JavaScript files for changes. On change, runs default.
* Production
  * concatProduction - Same as development, except with scripts and vendor scripts wrapped in a self-executing function.
  * buildProduction - concatProduction + copy
  * production - cleanAll + buildProduction

## Features

* Customizable Times - From one minute up to one hundred hours.
* Pre-built Color Themes - Choose from a variety of hand-picked themes.
* Custom Themes - Make a theme with any colors you want!
* Keyboard Shortcuts - For faster use.
* Preferences - Customize the timer in the settings menu.
* Notifications - Get alerted when a time session finishes.
* Local Storage - All preferences are saved locally.

## Tech

* [Express](https://expressjs.com/) - Simple web server to serve static files.
* [Gulp](https://gulpjs.com/) - Streaming build system. Automates concatenating and minifying files.
* [Spectrum](https://bgrins.github.io/spectrum/) - Color picker used to make custom themes.

The majority of the application is made in vanilla HTML, CSS, and JavaScript.

## License

[MIT](LICENSE)
