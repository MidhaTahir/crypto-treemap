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

  return (
    <>
      <Label>Volume Range(Market Cap Range)</Label>
      <Slider value={filters.volume} color="black" settings={settings} />
    </>
  );
};

export default CustomSlider;
