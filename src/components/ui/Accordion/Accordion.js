import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { debounce } from 'throttle-debounce';
import { rhythm } from '@/utils/helpers';
import media from '@/utils/media';

import Typography from '@/components/ui/Typography/Typography';
import Icon from '@/components/ui/Icons/Icon';

const Header = styled.button`
  background-color: ${props => props.theme.color_white};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${rhythm(2)};
  position: relative;
  width: 100%;

  ${media.md`
    padding: ${rhythm(3)};
  `}
`;

const ContentWrapper = styled.div`
  background-color: ${props => props.theme.color_white};
  max-height: 0;
  overflow: hidden;
  position: relative;
  transition: max-height .3s ${props => props.theme.ease_out_quad};

  ${props => props.isOpen ? `max-height: ${props.maxHeight/8}rem;` : null};
`;

const Content = styled.div`
  padding: 0 ${rhythm(2)} ${rhythm(2)};

  ${media.md`
    padding: 0 ${rhythm(3)} ${rhythm(3)};
  `}
`;

const ChevronIcon = styled(Icon)`
  transform: rotateZ(-90deg);
  transition: transform .3s ${props => props.theme.ease_out_quad};

  ${props => props.isOpen ? 'transform: rotateZ(90deg)' : null};
`;

export class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'isOpen': props.openByDefault || false,
      'maxHeight': 0,
    };

    this.calculateContentHeight = debounce(50, this.calculateContentHeight.bind(this));
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.calculateContentHeight);
    this.calculateContentHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateContentHeight);
  }

  calculateContentHeight() {
    if (this.contentRef && this.contentRef.current){
      this.setState({ maxHeight: this.contentRef.current.scrollHeight });
    }
  }

  handleAccordionClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children } = this.props;
    // exposing isOpen to all the children
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        isOpen: this.state.isOpen,
        ...this.state,
      })
    );

    return (
      <div>
        <Header onClick={() => this.handleAccordionClick()}>
          <Typography variant="h3">{this.props.title}</Typography>
          <ChevronIcon
            size={24}
            name="chevron"
            isOpen={this.state.isOpen}
          />
        </Header>
        <ContentWrapper
          isOpen={this.state.isOpen}
          maxHeight={this.state.maxHeight}
          ref={this.contentRef}
        >
          <Content>
            {childrenWithProps}
          </Content>
        </ContentWrapper>
      </div>
    );
  }
}

export default Accordion;
