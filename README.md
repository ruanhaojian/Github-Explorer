# github-explorer

### Install dependencies, and check to see it works [Live Demo](https://ruanhaojian.github.io/Github-Explorer-Demo/)

###Or scanning

<img src="https://ruanhaojian.github.io/Github-Explorer-Demo/qr_code.png" />

#Run npm

```bash
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```
If everything works, you should see the following:

<img src="http://i.imgur.com/zR7VRG6.png?2" />

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


#Tech stack:
* ReactJS for UI
* Redux for state data manage
* Webpack for bundle
* Babel for ES6 syntax
* ...and more, please check `package.json`

# about this project

Reference trungdq88's [`github-explorer`](https://github.com/trungdq88/github-explorer) project, using [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) scaffolding to create.

#TODOS

* Optimized code structure.
* Improve the performance of Redux in mobile terminal.