import { createContext, useContext, useState } from 'react';

export const SliderSettings = createContext();

export const useSliderSettings = () => useContext(SliderSettings);

export const SliderSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    start: [0, 1000],
    min: 0,
    max: 1000,
    step: 1,
  });
  return (
    <SliderSettings.Provider value={{ settings, setSettings }}>
      {children}
    </SliderSettings.Provider>
  );
};
