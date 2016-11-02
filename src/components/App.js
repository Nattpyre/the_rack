import React, { PropTypes } from 'react';
import { persistStore } from 'redux-persist';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const ContextType = {
  history: PropTypes.object.isRequired,
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

class App extends React.Component {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  componentWillMount() {
    persistStore(this.props.context.store);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: navigator.userAgent })}>
        {React.Children.only(this.props.children)}
      </MuiThemeProvider>
    );
  }

}

export default App;
