import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';
import { Header, Icon } from 'semantic-ui-react';
import { CoinsTokensProvider } from './context/coinsTokensContext';
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
          <Filters />
          <TreeMapGraph />
        </CoinsTokensProvider>
      </SliderSettingsProvider>
    </FiltersProvider>
  );
}

export default App;
