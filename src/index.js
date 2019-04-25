import App from 'components/App';

document.querySelector("body").innerHTML = App();

if (module.hot) {
  module.hot.accept('components/App', () => {
    const App = require('components/App/index.js').default;

    document.querySelector("body").innerHTML = App();
  });
}