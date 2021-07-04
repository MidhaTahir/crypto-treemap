import Filters from './components/Filters';
import TreeMapGraph from './components/TreeMapGraph';
import { FiltersProvider } from './context/filtersContext';

function App() {
  return (
    <FiltersProvider>
      <Filters />
      <TreeMapGraph />
    </FiltersProvider>
  );
}

export default App;
