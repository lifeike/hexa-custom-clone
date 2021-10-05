import React, { Component } from 'react';
import styled from 'styled-components/macro';

import Icon from '@/components/ui/Icons/Icon';
import Toggler from '@/components/ui/Toggler';
import Typography from '@/components/ui/Typography/Typography';
import Tooltip from '@/components/ui/Tooltip/Tooltip';

const StyledToggler = styled(Toggler)`
  display: inline-block;
`;

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Button = styled.button`
  font-family: ${props => props.theme.font_family};
`;


export class OrderDetailItemOptions extends Component {
  constructor() {
    super();

    this.button = React.createRef();
  }

  render() {

    const { handleDelete, toolTipLabel, rightAligned } = this.props;

    return (
      <StyledToggler>
        {([toggled, onToggle]) => (
          <TooltipWrapper>
            <button
              onClick={() => onToggle(!toggled)}
              ref={this.button}
            >
              <Icon size={24} name="kebab" />
            </button>
            {toggled &&
              <Tooltip
                handleClose={() => onToggle(false)}
                buttonRef={this.button}
                rightAligned={rightAligned}
              >
                <Button onClick={() => handleDelete()}>
                  <Typography variant="meta1">{toolTipLabel || 'Delete Size'}</Typography>
                </Button>
              </Tooltip>
            }
          </TooltipWrapper>
        )}
      </StyledToggler>
    );
  }
}

export default OrderDetailItemOptions;
