import React, { useState, useEffect } from 'react';
import { Slider } from 'react-semantic-ui-range';
import 'semantic-ui-css/semantic.min.css';
import { Label } from 'semantic-ui-react';
import { useFilters } from '../context/filtersContext';
import { useSliderSettings } from '../context/sliderSettingsContext';

const CustomSlider = () => {
  const { state: filters, actions } = useFilters();
  const { settings: sliderSettings } = useSliderSettings();
  const [showSlider, setShowSlider] = useState(false);
  const settings = {
    ...sliderSettings,
    step: (sliderSettings.max - sliderSettings.min) / 100,
    onChange: value => {
      actions.setVolume(value);
    },
  };

  useEffect(() => {
    setShowSlider(false);
    setTimeout(() => {
      setShowSlider(true);
    }, 100);
  }, [filters.blockSize, sliderSettings]);

  const [min, max] = filters.volume;

  return (
    <>
      <Label style={{ width: '300px' }}>
        {filters.blockSize === 'market cap'
          ? 'Market Cap Range'
          : 'Volume Size Range'}
        :{parseFloat(min).toFixed(2)}B - {parseFloat(max).toFixed(2)}B
        {showSlider ? (
          <Slider
            multiple
            color="black"
            settings={settings}
            value={filters.volume}
          />
        ) : null}
      </Label>
    </>
  );
};

export default CustomSlider;
