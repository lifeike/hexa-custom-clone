import React from 'react';
import styled from 'styled-components/macro';

import Typography from '@/components/ui/Typography/Typography';
import { PrimaryButton } from '@/components/ui/Buttons/Buttons';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  padding: 0 4rem;
`;

export default function ProductDesignDesktopHeader(props) {

  function handleFinishEditing() {
    props.saveOrder();
  }

  return (
    <Content>
      <div>
        <Typography variant="metaTitle">Wholesale Price</Typography>
        <Typography block variant="meta1">
          { props.price }
        </Typography>
      </div>
      <div>
        <PrimaryButton
          onClick={() => handleFinishEditing()}
          paddingSide="1.6"
        >
          Finish Editing
        </PrimaryButton>
      </div>
    </Content>
  );
}
