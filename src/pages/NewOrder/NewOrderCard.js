import React from 'react';
import styled from 'styled-components/macro';
import media from '@/utils/media';
import { rhythm } from '@/utils/helpers';
import Box from '@/components/ui/Layout/Box/Box';
import Typography from '../../components/ui/Typography/Typography';
import {ProductDescriptions} from '../../utils/constants/lookups';

const CardWrapper = styled.div`
  max-width: 696px;
  
  & + & {
    padding-top: ${rhythm(.5)};
  }

  ${media.md`
    flex: 1;
    flex-basis: 50%;
    padding-top: 0;
    padding: ${rhythm(2)} ${rhythm(2)};

    & + & {
      padding: ${rhythm(2)} ${rhythm(2)};
    }
  `}
`;

const Img = styled.img`
  height: 15rem;
  width: auto;

  ${media.md`
    align-self: center;
    height: auto;
    width: 70%;
  `}
`;

const BasePrice = styled.span`
  padding-right: ${rhythm(.5)};

  ${media.md`
    padding-right: ${rhythm(1)};
  `}
`;

const Card = styled.button`
  background-color: ${props => props.theme.color_white};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: ${rhythm(3)} ${rhythm(2)};
  text-align: left;
  width: 100%;

  &:focus {
    outline: auto
  }

  ${media.md`
    flex-direction: column;
    height: 100%;
    padding: ${rhythm(3)};
  `}
`;

const CardContent = styled.div`
  flex-grow: 1;
  padding-left: ${rhythm(3)};

  ${media.md`
    padding-left: 0;
    padding-top: ${rhythm(4)};
  `}
`;

const Text = styled.div`
  font-size: 1.3rem;
  font-weight: ${props => props.bold ? props.theme.font_weight_bold : props.theme.font_weight_regular};
  margin-bottom: 10px;
  
  ${media.md`
    font-size: 1.6rem;
  `}
`;

const Name = styled.div`margin-bottom: 14px;`;

const toProductName = name => name.toLowerCase().includes('wind breaker') ? 'Windbreaker' : name;

const NewOrderCard = props => {

  if(props.isNegativeSpace) {
    return <CardWrapper/>;
  }

  const info = ProductDescriptions[props.product.style_no];
  const header = info.header;
  const details = info.details;


  return (
    <CardWrapper>
      <Card
        onClick={(e) => {
          if(e.target.target !== '_blank') {
            props.handleNewOrder(e, props.product);
          }
        }}
        role="button" tabIndex="0">
        <Img src={props.product.img_path} alt={props.product.name} />
        <CardContent>
          <Typography variant="h2">
            <Name>{toProductName(props.product.name)}</Name>
          </Typography>

          <Box classes="top1Md">
            <Text bold>{header}</Text>
            {details.map(det => <Text key={`${header}_${det}`}>{`•   ${det}`}</Text>)}
          </Box>

          <Typography variant="h2" color="color_grey_dark_1" style={{marginTop: '20px'}}>
            <BasePrice>
              ${props.product.price}
            </BasePrice>
            <Typography variant="metaTitle">
              base price
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default NewOrderCard;
