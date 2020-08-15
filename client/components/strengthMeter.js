import React from 'react';
import { Flex } from '@chakra-ui/core';
import StrengthLED from './strengthLED';

const StrengthMeter = ({ strength }) => {

  return (
    <Flex
      justify='space-around'
    >
      <StrengthLED
        color='#C53030'
        threshhold={1}
        strength={strength}
      />
      <StrengthLED
        color='#DD6B20'
        threshhold={2}
        strength={strength}
      />
      <StrengthLED
        color='#F6E05E'
        threshhold={3}
        strength={strength}
      />
      <StrengthLED
        color='#be0'
        threshhold={4}
        strength={strength}
      />
      <StrengthLED
        color='#48BB78'
        threshhold={5}
        strength={strength}
      />
    </Flex>
  );
}

export default StrengthMeter;