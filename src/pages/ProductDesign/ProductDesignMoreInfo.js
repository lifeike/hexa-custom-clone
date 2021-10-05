import Box from '@/components/ui/Layout/Box/Box';
import React from 'react';

import StandardModal from '@/components/ui/Modal/StandardModal';
import Toggler from '@/components/ui/Toggler';
import Typography from '@/components/ui/Typography/Typography';
import Container from '@/components/ui/Layout/Container';
import Icon from '@/components/ui/Icons/Icon';

const ProductDesignMoreInfo = (props) => {
  function renderModalContent() {
    switch (props.helpType) {
    case 'I002':
      return <DownInfo/>;
    case 'I003':
      return <HoodInfo/>;

    default:
      return null;
    }
  }

  const helpInfo = renderModalContent();

  if (!helpInfo) return null;

  return (
    <Toggler>
      {([toggled, onToggle]) => (
        <div>
          <button onClick={() => onToggle(true)}>
            <Icon size={20} name="question"></Icon>
          </button>
          <StandardModal
            toggle={toggled}
            onAfterClose={() => onToggle(false)}
          >
            <Box classes="top7 bottom15 sides5Md">
              <Container>
                {helpInfo}
              </Container>
            </Box>
          </StandardModal>
        </div>
      )}
    </Toggler>
  );
};

export default ProductDesignMoreInfo;

function DownInfo() {
  return (
    <div>
      <Typography variant="h1">
        How to Pick Your Down
      </Typography>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Duck or Goose?
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            The biggest difference between goose and duck is fill power, the measure of how puffy a given amount of down is. Since geese are bigger then ducks, they have larger plumes for a warmer, higher quality down.
          </Typography>
        </Box>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Tell me about duck down.
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            Duck down is more readily available, which makes it less expensive than goose down. However, since duck down plumules are smaller than geese plumes, it’s more difficult to get high fill power duck down. We use 700 fill power duck down to create quality insulation at a good price.
          </Typography>
        </Box>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Tell me about goose down.
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            Goose down is less available so is more expensive to come by but boasts a higher percantage of large plumules. WHen you’re looking for a higher fill power (roughly 750 and up) you need a high percentage of large plumules, so high end down products are often made from goose down as it creates lighter, warmer pieces. We use 800 fill power goose down.
          </Typography>
        </Box>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          What's fill power?
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            FIll power is the ability of down to loft and regain its original volume after being compressed. The higher the fill power, the greater the ability of down to provide warmth. Whether it’s 700 dick down or 800 goose down, our down maintains its fill power over time, providing warmth for many years.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

function HoodInfo() {
  return (
    <div>
      <Typography variant="h1">
        Want a hood with that?
      </Typography>
      <Box classes="top1 top2Md">
        <Typography variant="body">
          We all love a good hoodie, but sometimes the moment calls for a collar. Here are some things to think about as you’re designing.
        </Typography>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Is a jacket warmer with a hood?
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            We don’t use temperature ratings on our jackets, but a lot of heat escapes through your head so, generally speaking, wearing a hood is much warmer.
          </Typography>
        </Box>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Will the hood fit over a helmet?
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            It depends on your helmet. Our hoods are designed to fit either over your helmet or under depending on its size. We recommend trying it both ways to find what works best for you.
          </Typography>
        </Box>
      </Box>
      <Box classes="top3 top5Md">
        <Typography variant="h3">
          Can I adjust the hood?
        </Typography>
        <Box classes="top1">
          <Typography variant="body">
            Yes. Adjust the crown size by pulling on the cord at the back of the hood. This can be done with the hood up or down, and can turn the hood into a neck warmer too.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
