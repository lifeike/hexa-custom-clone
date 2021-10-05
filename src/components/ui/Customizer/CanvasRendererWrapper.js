import React, { PureComponent } from 'react';
import CanvasRenderer from './CanvasRenderer';

export class CanvasRendererWrapper extends PureComponent {
  render() {
    if ( this.props.visible ) {
      return <CanvasRenderer {...this.props}></CanvasRenderer>;
    }
    else {
      return null;
    }
  }
}
