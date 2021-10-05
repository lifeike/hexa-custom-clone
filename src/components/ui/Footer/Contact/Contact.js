import { FooterButton } from '@/components/ui/Buttons/Buttons';
import Box from '@/components/ui/Layout/Box/Box';
import React from 'react';

import StandardModal from '@/components/ui/Modal/StandardModal';
import Toggler from '@/components/ui/Toggler';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';

const Contact = () => (
  <Toggler>
    {([toggled, onToggle]) => (
      <div>
        <FooterButton onClick={() => onToggle(true)}>Contact</FooterButton>
        <StandardModal
          toggle={toggled}
          onAfterClose={() => onToggle(false)}
        >
          <Container>
            <Box classes="flats7 sides5Md">
              <Typography variant="h1">
              Contact
              </Typography>
              <Box classes="top4">
                <Typography variant="h3">
                Need Help? Drop us an email.
                </Typography>
              </Box>
              <Box classes="top2">
                <a href="mailto:support@hexacustom.com">
                  <Typography variant="body" decor="underline">
                    support@hexacustom.com
                  </Typography>
                </a>
              </Box>
              <Box classes="top1">
                <Typography variant="body">
                  We look forward to helping you with your inquiry. We respond to email messages in the order that they are received, and will respond to your email as quickly as possible.
                </Typography>
              </Box>
            </Box>
          </Container>
        </StandardModal>
      </div>
    )}
  </Toggler>
);

export default Contact;
