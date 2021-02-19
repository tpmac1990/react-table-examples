import './App.css';
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import FilteringTable from './components/FilteringTable';
import PaginationTable from './components/PaginationTable';
import RowSelection from './components/RowSelection';
import { ColumnOrder } from './components/ColumnOrder';
import { StickyTable } from './components/StickyTable';
import { InfiniteScrollTable } from './components/InfiniteScrollTable';

function App() {
  return (
    <div>
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      {/* <RowSelection /> */}
      {/* <ColumnOrder /> */}
      {/* <StickyTable /> */}
      <InfiniteScrollTable />
    </div>
  )
  
}

export default App;
