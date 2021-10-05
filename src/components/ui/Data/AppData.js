import { Component } from 'react';
import { connect } from 'react-redux';
import { loadBaseStyles } from '@/store/actions/styles';
import { fetchColors } from '@/store/actions/colors';

class AppData extends Component {
  componentWillMount() {
    this.props.loadBaseStyles();
    this.props.fetchColors();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  loadBaseStyles: () => dispatch(loadBaseStyles()),
  fetchColors: () => dispatch(fetchColors()),
});

export default connect(null, mapDispatchToProps)(AppData);
