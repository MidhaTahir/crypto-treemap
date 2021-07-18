import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';
import { Header, Icon } from 'semantic-ui-react';
import { CoinsTokensProvider } from './context/coinsTokensContext';
import CustomSlider from './components/CustomSlider';
import { SliderSettingsProvider } from './context/sliderSettingsContext';

function App() {
  return (
    <FiltersProvider>
      <SliderSettingsProvider>
        <CoinsTokensProvider>
          <Header as="h2">
            <Icon name="dollar sign" />
            <Header.Content>Coin Map</Header.Content>
          </Header>
          <Header as="h2" floated="right"></Header>
          <Filters />
          <CustomSlider />
          <TreeMapGraph />
        </CoinsTokensProvider>
      </SliderSettingsProvider>
    </FiltersProvider>
  );
}

export default App;
