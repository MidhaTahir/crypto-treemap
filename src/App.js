import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';
import { Header, Icon } from 'semantic-ui-react';
import { CoinsTokensProvider } from './context/coinsTokensContext';

function App() {
  return (
    <FiltersProvider>
      <CoinsTokensProvider>
        <Header as="h2" floated="left">
          <Icon name="money bill alternate outline" />
          <Header.Content>Coin Map</Header.Content>
        </Header>
        <Header as="h2" floated="right"></Header>
        <Filters />
        <TreeMapGraph />
      </CoinsTokensProvider>
    </FiltersProvider>
  );
}

export default App;
