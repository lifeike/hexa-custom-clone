import React, { Component } from 'react';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import PropTypes from 'prop-types';
import ColorPropTypes from '@/components/ui/PropTypes/ColorPropTypes';
import { rhythm } from '@/utils/helpers';

const Span = styled.span`
  text-decoration: ${props => props.decor};
`;

const H1 = styled.h1`
  color: ${props => props.theme[props.color] || props.theme.color_dark};
  font-size: 2.4rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.4;

  ${media.md`
    font-size: 2.8rem;
  `}

  ${media.lg`
    font-size: 3.2rem;
  `}
`;

const H2 = styled.h2`
  color: ${props => props.theme[props.color] || props.theme.color_dark};
  ${props => props.inline ? `display: inline-block;`: null}
  font-size: 2rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.2;

  ${media.md`
    font-size: 2.2rem;
    line-height: 1.09;
  `}

  ${media.lg`
    font-size: 2.5rem;
    line-height: 0.96;
  `}
`;

const H3 = styled.h3`
  color: ${props => props.theme[props.color] || props.theme.color_dark};
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.5;

  ${media.md`
    font-size: 1.8rem;
    line-height: 1.33;
  `}

  ${media.lg`
    font-size: 2rem;
    line-height: 1.2;
  `}
`;

const MetaTitle = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_grey_dark};
  font-size: 1.2rem;
  font-weight: ${props => props.weight || props.theme.font_weight_semi_bold};
  line-height: 1.67;
  ${props => props.block ? `display: block;`: null}

  ${media.md`
    line-height: 2;
  `}

  ${media.lg`
    font-size: 1.4rem;
    line-height: 1.71;
  `}
`;

const Meta1 = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_darkest};
  font-size: 1.4rem;
  font-weight: ${props => props.weight || props.theme.font_weight_semi_bold};
  line-height: 1.71;
  ${props => props.block ? `display: block;`: null}

  ${media.lg`
    font-size: 1.6rem;
    line-height: 1.5;
  `}
`;

const Meta2 = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_grey_dark};
  font-size: 1.1rem;
  font-weight: ${props => props.weight || props.theme.font_weight_regular};
  line-height: 1.45;
  ${props => props.block ? `display: block;`: null}

  ${media.md`
    font-size: 1.2rem;
    line-height: 1.67;
  `}

  ${media.lg`
    font-size: 1.4rem;
    line-height: 1.43;
  `}
`;

const Meta3 = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_darkest};
  font-size: 1rem;
  font-weight: ${props => props.weight || props.theme.font_weight_bold};
  letter-spacing: .03rem;
  line-height: 1.6;
  text-transform: uppercase;
  ${props => props.block ? `display: block;`: null}

  ${media.md`
    font-size: 1.2rem;
    letter-spacing: .04rem;
    line-height: 1.33;
  `}
`;

const Link = styled.span`
  color: ${props => props.theme[props.color] || props.theme.color_darkest};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_regular};
  line-height: 1.45;
  text-decoration: underline;
  ${props => props.block ? `display: block;`: null}
`;

const Body = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_dark};
  font-size: 1.6rem;
  font-weight: ${props => props.theme.font_weight_regular};
  line-height: 1.25;
  ${props => props.block ? `display: block;`: null}

  p {
    margin-bottom: ${rhythm(3)};
  }

  ${media.md`
    line-height: 1.78;

    p {
      margin-bottom: ${rhythm(5)};
    }
  `}

  ${media.lg`
    font-size:  ${props => props.fontSize || '1.9rem'};;
    line-height: 1.5;
  `}
`;

const Custom = styled(Span)`
  color: ${props => props.theme[props.color] || props.theme.color_grey_dark};
  font-size: 1.1rem;
  font-weight: ${props => props.theme.font_weight_regular};
  line-height: 1.27;
  ${props => props.block ? `display: block;`: null}

  p {
    margin-bottom: ${rhythm(3)};
  }

  ${media.md`
    font-size: 1.4rem;
    line-height: 2.29;

    p {
      margin-bottom: ${rhythm(5)};
    }
  `}

  ${media.lg`
    font-size: 1.6rem;
    line-height: 2;
  `}
`;

class Typography extends Component {

  static propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf([
      'h1',
      'h2',
      'h3',
      'metaTitle',
      'meta1',
      'meta2',
      'meta3',
      'link',
      'body',
      'custom',
    ]),
    color: ColorPropTypes,
  };

  RenderType(props) {
    switch(this.props.variant) {
    case 'h1':
      return <H1 {...props} />;
    case 'h2':
      return <H2 {...props} />;
    case 'h3':
      return <H3 {...props} />;
    case 'metaTitle':
      return <MetaTitle {...props} />;
    case 'meta1':
      return <Meta1 {...props} />;
    case 'meta2':
      return <Meta2 {...props} />;
    case 'meta3':
      return <Meta3 {...props} />;
    case 'link':
      return <Link {...props} />;
    case 'body':
      return <Body {...props} />;
    case 'custom':
      return <Custom {...props} />;
    default:
      break;
    }
  }

  render() {
    return (
      this.RenderType(this.props)
    );
  }
}

export default Typography;
