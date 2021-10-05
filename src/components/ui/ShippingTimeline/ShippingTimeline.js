import React from 'react';

import Box from '@/components/ui/Layout/Box/Box';
import StandardModal from '@/components/ui/Modal/StandardModal';
import Toggler from '@/components/ui/Toggler';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';

const ShippingTimeline = (props) => (
  <Toggler>
    {([toggled, onToggle]) => (
      <>
        <button onClick={() => onToggle(true)}>
          <Typography block variant="link">Shipping Timeline</Typography>
        </button>
        <StandardModal
          toggle={toggled}
          onAfterClose={() => onToggle(false)}
        >
          <Container>
            <Box classes="flats7 sides5Md">
              <Typography variant="h1">
              Shipping Timeline
              </Typography>
              <Box classes="top1 top2Md">
                <Typography variant="body">
                The following shipping timelines are from order submission to the Hexa factory to delivery.
                </Typography>
              </Box>
              <Box classes="top3 top4Md">
                <Typography variant="h3">Under 100 units:</Typography>
                <Typography variant="body">14 – 21 Days</Typography>
                <Box classes="top3 top4Md">
                  <Typography variant="h3">100 – 200 Units:</Typography>
                  <Typography variant="body">45 Days</Typography>
                </Box>
                <Box classes="top3 top4Md">
                  <Typography variant="h3">200 – 600 Units:</Typography>
                  <Typography variant="body">60 Days</Typography>
                </Box>
                <Box classes="top3 top4Md">
                  <Typography variant="h3">Over 600 Units:</Typography>
                  <Typography variant="body">90 Days</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </StandardModal>
      </>
    )}
  </Toggler>
);

export default ShippingTimeline;
