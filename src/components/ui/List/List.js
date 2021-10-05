import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/ui/Typography/Typography';

const StyledList = styled.ul`
  line-height: 1.5;
  margin-left: 5rem;
  padding-top: 0.6rem;
`;

const ListItem = styled.li`
  list-style: initial;
`;

export const List = (props) => {
  return (
    <StyledList>
      <ListItems {...props} />
    </StyledList>
  );
};

const ListItems = (props) => {
  return props.listItems.map ((item, index) => {
    return (
      <ListItem key={`${index}`}>
        <Typography variant="body" fontSize="1.6rem">
          {item}
        </Typography>
      </ListItem>
    );
  });
};
