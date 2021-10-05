import React, { Component } from 'react';
import styled from 'styled-components/macro';
import media from '@/utils/media';

import Toggler from '@/components/ui/Toggler';
import StandardModal from '@/components/ui/Modal/StandardModal';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import { ModalCancelButton, ModalConfirmButton, HorizontalButtonContainer } from '@/components/ui/Buttons/Buttons';

import OrderDetailItemOptions from '../../OrderDetail/OrderDetailItemOptions';
import { HideTablet } from '../../Utils';
import { decodeFilename } from '@/utils/helpers';

const LogoOptionContainer = styled.div`
  display: flex;
  height: 9.3rem;
  justify-content: space-between;
  padding-right: 0.8rem;
  text-align: left;
`;

const LogoTitle = styled.div`
  color: ${props => props.theme.color_darkest};
  font-size: 1.6rem;
  line-height: 1.13;
  max-width: 25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoSubtitle = styled.div`
  color: ${props => props.theme.color_grey_dark};
  font-size: 1.1rem;
  line-height: 1.27;
  padding-top: 0.4rem;
`;

const LogoImg = styled.img`
  max-height: 5.8rem;
  max-width: 26rem;
  padding-top: 1.6rem;
`;

const ButtonText = styled.span`
  font-size: 1.6rem;

  ${media.md`
    width: 9.5rem;
  `}
`;

const CancelButtonText = styled.span`
  font-size: 1.4rem;
  letter-spacing: .1rem;
`;

const B = styled.span`
  font-weight: ${props => props.theme.font_weight_bold};
`;

export class LogoOption extends Component {
  handleDelete(logo) {
    return this.props.handleDelete(logo);
  }

  getLogoTypeString(type) {
    if (type === 2) {
      return 'Order Logo';
    }

    if (type === 3) {
      return 'Company Logo';
    }
  }

  renderCompanyLogoDeleteContent() {
    return (
      <Box>
        This will delete this logo for <B>everyone</B> in your company.
        This will also delete and remove this logo <B>everywhere</B> it is used in this order.
        This action cannot be undone.
      </Box>
    );
  }

  renderOrderLogoDeleteContent() {
    return (
      <Box>
        This will delete and remove this logo <B>everywhere</B> it is used in this order.
        This action cannot be undone.
      </Box>
    );
  }

  renderDeleteModalContent(logo) {
    return logo.type === 3
      ? this.renderCompanyLogoDeleteContent()
      : this.renderOrderLogoDeleteContent();
  }

  render() {
    const { logo } = this.props;
    const logoTypeString = this.getLogoTypeString(logo.type);

    return (
      <>
        <LogoOptionContainer>
          <div>
            <LogoTitle>{decodeFilename(logo.name)}</LogoTitle>
            <LogoSubtitle>{logoTypeString}</LogoSubtitle>
            <LogoImg crossOrigin="anonymous" alt={`${logo.name} Logo`} src={logo.url}></LogoImg>
          </div>
          <div onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
            <HideTablet>
              <Toggler>
                {([toggled, onToggle]) => (
                  <div>
                    <OrderDetailItemOptions
                      rightAligned={true}
                      toolTipLabel="Delete"
                      handleDelete={() => onToggle(true)} />
                    <StandardModal
                      toggle={toggled}
                      hideClose={true}
                      onAfterClose={() => onToggle(false)} >
                      <Container>
                        <Box classes="top5 bottom2 bottom4Md">
                          <Typography variant="h1">{`Delete ${logoTypeString}?`}</Typography>
                          <Box classes="top2">
                            <Typography variant="body">
                              {this.renderDeleteModalContent(logo)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box classes="top1 bottom2 bottom4Md">
                          <HorizontalButtonContainer>
                            <ModalCancelButton onClick={ () => onToggle(false) }>
                              <CancelButtonText>
                                CANCEL
                              </CancelButtonText>
                            </ModalCancelButton>
                            <ModalConfirmButton onClick={ () => { this.handleDelete(logo); onToggle(false); } }>
                              <ButtonText>
                                {`Delete ${logoTypeString}`}
                              </ButtonText>
                            </ModalConfirmButton>
                          </HorizontalButtonContainer>
                        </Box>
                      </Container>
                    </StandardModal>
                  </div>
                )}
              </Toggler>
            </HideTablet>
          </div>
        </LogoOptionContainer>
      </>
    );
  }
}
