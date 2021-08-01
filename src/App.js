import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';
import { Header } from 'semantic-ui-react';
import { CoinsTokensProvider } from './context/coinsTokensContext';
import { SliderSettingsProvider } from './context/sliderSettingsContext';
import { CategoriesProvider } from './context/categoriesContext';
import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <CategoriesProvider>
      <FiltersProvider>
        <SliderSettingsProvider>
          <CoinsTokensProvider>
            <div
              style={{
                backgroundColor: '#dbdbdb',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <Header as="h2">
                <Logo />
                <Header.Content>Coin Map</Header.Content>
              </Header>
            </div>
            <Filters />
            <TreeMapGraph />
          </CoinsTokensProvider>
        </SliderSettingsProvider>
      </FiltersProvider>
    </CategoriesProvider>
  );
}

export default App;
