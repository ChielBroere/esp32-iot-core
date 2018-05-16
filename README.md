# esp32-iot-core

## Initial setup, build tools and dependencies

### 1. Clone this repo

Clone or download this repo and open the `ict-lab/firebase-functions` directory.

### 2. Install the Firebase CLI and enable Functions on your Firebase CLI

You need to have installed the Firebase CLI. If you haven't run:

```bash
npm install -g firebase-tools
```

> Doesn't work? You may need to [change npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Login into your firebase account:

```bash
firebase login
```

Set the project settings to connect with firebase:

```bash
firebase use --add
```

> Set the project to the current Firebase project, see [firebase console](https://console.firebase.google.com).

## Deploy the app to prod

First you need to install the `npm` dependencies of the functions:

```bash
cd functions && npm install; cd ..
```

This installs locally:
 - The Firebase SDK and the Firebase Functions SDK.
 - The [moment](https://www.npmjs.com/package/moment) npm package to format time.
 - The [cors](https://www.npmjs.com/package/cors) npm package to allow Cross Origin AJAX requests on the endpoint.

Deploy to Firebase using the following command:

```bash
firebase deploy
```

This deploys and activates the date Function.

> The first time you call `firebase deploy` on a new project with Functions will take longer than usual.

## Test functions local

To test your functions in the emulator, use:

```bash
firebase serve --only functions
```

>Note: The function is not (yet) deployed with `firebase serve`, this is going to build and deploy on your local machine.

This will produce local endpoints you can test with curl or Postman.

## Authors

* **Chiel Broere** - *Initial work* - [ChielBroere](https://github.com/ChielBroere)

See also the list of [contributors](https://github.com/ChielBroere/esp32-iot-core) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details