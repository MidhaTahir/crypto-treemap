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
      actions.setVolume(value);
    },
  };

  const [min, max] = filters.volume;

  return (
    <>
      <Label style={{ width: '300px' }}>
        {filters.blockSize === 'market cap'
          ? 'Market Cap Range'
          : 'Volume Size Range'}
        :{parseInt(min / 1000)}K - {parseInt(max / 1000)}K
        <Slider
          multiple
          color="black"
          settings={settings}
          value={filters.volume}
        />
      </Label>
    </>
  );
};

export default CustomSlider;
