import { Component } from "react";
import ReactGA from "react-ga";
import { withRouter } from 'react-router-dom';

class GAListener extends Component {

  componentDidMount() {
    try {
      this.sendPageView(this.props.history.location);
      this.props.history.listen(this.sendPageView);
    }
    // eslint-disable-next-line no-empty
    catch{}
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GAListener);
