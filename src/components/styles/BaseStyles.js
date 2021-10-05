import React, { Component } from 'react';
import { Reset } from '@/components/styles/Reset';
import { Elements } from '@/components/styles/Elements';
import { Utils } from '@/components/styles/Utils';
import BoxStyles from '@/components/styles/BoxStyles';
import { StripeStyles } from '@/components/styles/StripeStyles';

class BaseStyles extends Component {
  render() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,600,700" rel="stylesheet"></link>
        <Reset />
        <Elements />
        <Utils />
        <BoxStyles />
        <StripeStyles />
      </div>
    );
  }
}

export default BaseStyles;
