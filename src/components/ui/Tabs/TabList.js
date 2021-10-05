import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';

import Tab from './Tab';
import Container from '@/components/ui/Layout/Container';

const TabListUl = styled.ul`
  background-color: ${props => props.theme.color_white};
  padding-bottom: 1.6rem;
`;

const ContentContainer = styled.ul`
  ${media.md`
    margin: 0 auto;
    max-width: 144rem;
    padding: 0 ${rhythm(5)};
  `}
`;

class TabList extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    tabCallback: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab,
    };
  }

  onClickTabItem = tab => {
    const { tabCallback } = this.props;

    this.setState({ activeTab: tab });

    if (tabCallback && typeof tabCallback === 'function') {
      tabCallback(tab);
    }
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      },
    } = this;

    return (
      <div>
        <TabListUl role="tablist">
          <Container>
            {children.map((child, idx) => {
              const { label } = child.props;

              return (
                <Tab
                  activeTab={activeTab}
                  key={idx}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
          </Container>
        </TabListUl>
        <div>
          <ContentContainer>
            {children.map((child, idx) => {
              if (child.props.label !== activeTab) {
                return undefined;
              }

              return (<div key={idx}>{child.props.children}</div>);
            })}
          </ContentContainer>
        </div>
      </div>
    );
  }
}

export default TabList;
