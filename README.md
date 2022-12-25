# Kindergarten Timetracker

![Github code size](https://img.shields.io/github/languages/code-size/flojud/KITZE?style=flat-square)
![Github line of code](https://img.shields.io/tokei/lines/github/flojud/kitze?style=flat-square)
![Github license](https://img.shields.io/github/license/flojud/kitze?style=flat-square)
![Github stars](https://img.shields.io/github/stars/flojud/kitze?style=social) \
![React](https://img.shields.io/github/package-json/dependency-version/flojud/kitze/react?style=flat-square)
![Firebase](https://img.shields.io/github/package-json/dependency-version/flojud/kitze/firebase?style=flat-square)
![Material UI](https://img.shields.io/github/package-json/dependency-version/flojud/kitze/@mui/material?style=flat-square)

I developed this small app for my wife to support her in tracking working hours as a kindergarten teacher.\
Essentially, it differs from other time tacking apps in that a distinction is made between working time on the child and preparation and follow-up time.


https://user-images.githubusercontent.com/26573776/209466536-26eb550e-1f2f-4881-a927-301394a3fe23.mp4


## Prerequisites

Before you begin, ensure you have met the following requirements:

Node/npm and have Google Firebase account with your project ready.

## Installing Kindergarten Timetracker

To install Kindergarten Timetracker, follow these steps:

### 1. Dependencies

Install all npm dependencies and the Firebase Tools.

```
npm i
npm install -g firebase-tools
```

### 2. Firebase init

Setup or update the [Firebase CLI](https://firebase.google.com/docs/cli?authuser=0#setup_update_cli) and list your project as a little smoketest.

```
# firebase login
# firebase projects:list
✔ Preparing the list of your Firebase projects
┌──────────────────────────┬────────────────────────────────────┬────────────────┬──────────────────────┐
│ Project Display Name     │ Project ID                         │ Project Number │ Resource Location ID │
├──────────────────────────┼────────────────────────────────────┼────────────────┼──────────────────────┤
│ Kindergarten Timetracker │ kindergarten-timetracker (current) │ 1000000000000  │ europe-west          │
└──────────────────────────┴────────────────────────────────────┴────────────────┴──────────────────────┘

1 project(s) total.
```

Initialize a new Firebase project (or take my existing configuration).

```
firebase init
firebase init hosting
```

### 3. Developement

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```
# npm run start
Compiled successfully!

You can now view kitze in the browser.

  Local:            http://localhost:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.

```

### 4. Build

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
# npm run build
> kitze@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  246.73 kB  build/static/js/main.9b57c0e2.js
  39.31 kB   build/static/js/194.0902d8de.chunk.js
  8.73 kB    build/static/js/245.4efc520d.chunk.js
  8.21 kB    build/static/js/280.73e4964f.chunk.js
  7.3 kB     build/static/js/525.c5047340.chunk.js
  6.87 kB    build/static/js/778.2b9e367f.chunk.js
  6.56 kB    build/static/js/803.54b035ea.chunk.js
  6.36 kB    build/static/js/517.c7fb1ec9.chunk.js
  6.24 kB    build/static/js/587.e9f22641.chunk.js
  6.07 kB    build/static/js/779.a7bab996.chunk.js
  5.41 kB    build/static/js/765.1472c30c.chunk.js
  5.12 kB    build/static/js/642.11fef118.chunk.js
  5.07 kB    build/static/js/117.96505d7b.chunk.js
  4.76 kB    build/static/js/12.854ad0e2.chunk.js
  4.19 kB    build/static/js/192.d3653136.chunk.js
  2.52 kB    build/static/js/818.c83665f3.chunk.js
  2.21 kB    build/static/js/953.fd067303.chunk.js
  1.62 kB    build/static/js/467.1f5cdfba.chunk.js
  797 B      build/static/js/42.494ad087.chunk.js
  675 B      build/static/js/238.71235350.chunk.js
  487 B      build/static/js/789.f7ae6263.chunk.js
  103 B      build/static/css/main.b55f5366.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment
```

### 5. Deploy

To deploy the Firebase project, run the following command from your project directory:

```
# firebase deploy -m "Version 1.0.0 Deployment."

=== Deploying to 'kindergarten-timetracker'...

i  deploying hosting
i  hosting[kindergarten-timetracker]: beginning deploy...
i  hosting[kindergarten-timetracker]: found 63 files in build/
✔  hosting[kindergarten-timetracker]: file upload complete
i  hosting[kindergarten-timetracker]: finalizing version...
✔  hosting[kindergarten-timetracker]: version finalized
i  hosting[kindergarten-timetracker]: releasing new version...
✔  hosting[kindergarten-timetracker]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/kindergarten-timetracker/overview
Hosting URL: https://kindergarten-timetracker.web.app
```

### 6. Stop hosting

Stops serving Firebase Hosting traffic for the active Firebase project.

Your project's Hosting URL will display a "Site Not Found" message after running this command.

```
firebase hosting:disable
```

## Contributing to Kindergarten Timetracker

<!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->

To contribute to Kindergarten Timetracker, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b development`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin flojud/KITZE`
5. Create the pull request.

## Contact

If you want to contact me you can reach me at kindergarten.timetracker@gmail.com.

## License

This project uses the following license: [ MIT license](LICENSE).
