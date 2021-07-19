import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import 'semantic-ui-css/semantic.min.css';
import { Label } from 'semantic-ui-react';
import { useFilters } from '../context/filtersContext';
import { useSliderSettings } from '../context/sliderSettingsContext';

const CustomSlider = () => {
  const { state: filters, actions } = useFilters();
  const { settings: sliderSettings } = useSliderSettings();

  const settings = {
    ...sliderSettings,
    onChange: value => {
      console.log(value);
      actions.setVolume(value[1] - value[0]);
    },
  };

  return (
    <>
      <Label style={{ width: '300px' }}>
        {filters.blockSize === 'market cap'
          ? 'Market Cap Range'
          : 'Volume Size Range'}
        :{filters.volume}
        {/* value={filters.volume} */}
        <Slider multiple color="black" settings={settings} />
      </Label>
    </>
  );
};

export default CustomSlider;
