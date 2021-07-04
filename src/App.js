import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';
import { Header, Icon } from 'semantic-ui-react';

function App() {
  return (
    <FiltersProvider>
      <Header as="h2" floated="left">
        <Icon name="money bill alternate outline" />
        <Header.Content>Coin Map</Header.Content>
      </Header>
      <Header as="h2" floated="right"></Header>
      <Filters />
      <TreeMapGraph />
    </FiltersProvider>
  );
}

export default App;
