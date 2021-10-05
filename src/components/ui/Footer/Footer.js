import { rhythm } from '@/utils/helpers';
import Box from '@/components/ui/Layout/Box/Box';
import media from '@/utils/media';
import { LINKS, SOCIAL_MEDIA, SOCIAL_MEDIA_LINKS } from '@/utils/constants/constants';
import React, { Component } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import styled, { withTheme } from 'styled-components/macro';
import Contact from './Contact/Contact';
import Icon from '@/components/ui/Icons/Icon';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.color_darkest};
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rhythm(3)};
  width: 100%;

  ${media.md`
    flex-direction: row;
    padding: ${rhythm(5)};
  `}
`;

const FooterList = styled.ul`
  display: flex;
  flex-direction: column;

  ${media.md`
    flex-direction: row;
  `}

  > * {
    text-align: center;
    padding-top: 0.25em;
    padding-bottom: 0.25em;


    ${media.md`
      flex-grow: 1;
      margin-right: ${rhythm(5)};
      text-align: right;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        margin-right: 0;
      }
    `}
  }
`;

const Link = styled.a`
  color: ${props => props.theme.footer.link_color || props.theme.color_white};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  padding: 0;
  text-align: left;

  &:hover,
  &:visited {
    color: ${props => props.theme.footer.hover_color || props.theme.color_white};
  }
`;

const HexaCopyright = styled.span`
  color: ${props => props.theme.color_white};
  display: none;
  font-size: 1.2rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  line-height: 1.5;
  opacity: 0.5;

  ${media.md`
    display: inline-block;
  `}
`;

const HexaCopyrightAlt = styled(HexaCopyright)`
  display: inline-block;
  text-align: center;

  ${media.md`
    display: none;
  `}
`;

const copyright = `@${new Date().getFullYear()} Hexa|Custom`;

const SocialMediaIconWrapper = styled.a`
  line-height: 1.5;
  padding-right: 0.5em;
  padding-left: 0.5em;

  ${media.md`
    padding-left: 1em;
    padding-right: 0;
  `}
`;

const SocialMediaWrapper = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;

  ${media.md`
    justify-content: flex-end;
  `}
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.5em;

  ${media.md`
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 0;
  `}
`;

export class Footer extends Component {

  /**
   * renderLink - Returns fully resolved link
   * @param {*} url - Url to go to (href)
   * @param {*} name - Name to display
   */
  renderLink(url, name) {
    return (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={url}>
        {name}
      </Link>
    );
  }

  /**
   * renderSocialMediaLink - Returns anchor with social media icon
   * @param {string} name - SOCIAL_MEDIA Constant name
   */
  renderSocialMediaLink(name) {
    if (!name) return null;

    return (
      <SocialMediaIconWrapper
        href={SOCIAL_MEDIA_LINKS[name]}
        target="_blank">
        <Icon name={name} size={27} />
      </SocialMediaIconWrapper>
    );
  }

  /**
   * footerLinks - Returns external links for footer to be rendered
   */
  footerLinks() {
    return (
      <>
        <div>
          {this.renderLink(LINKS.FIT_GUIDE, 'Distributor Resources')}
        </div>
        <div>
          {this.renderLink(LINKS.TERMS_AND_CONDITIONS, 'Terms & Conditions')}
        </div>
      </>
    );
  }

  socialLinks() {
    return (
      <>
        {this.renderSocialMediaLink(SOCIAL_MEDIA.TWITTER)}
        {this.renderSocialMediaLink(SOCIAL_MEDIA.INSTAGRAM)}
        {this.renderSocialMediaLink(SOCIAL_MEDIA.FACEBOOK)}
      </>
    );
  }

  render() {
    const { location, hideFooterPath } = this.props;
    const match = location && matchPath(location.pathname, {
      path: hideFooterPath,
    });

    return !match && (
      <FooterContainer>
        <FooterLinksWrapper>
          <FooterList>
            <Contact />
            {this.footerLinks()}
          </FooterList>
          <Box classes="top1">
            <HexaCopyright>{copyright}</HexaCopyright>
          </Box>
        </FooterLinksWrapper>
        <SocialMediaWrapper>
          {this.socialLinks()}
        </SocialMediaWrapper>
        <HexaCopyrightAlt>{copyright}</HexaCopyrightAlt>
      </FooterContainer>
    );
  }
}

export default withRouter(withTheme(Footer));
