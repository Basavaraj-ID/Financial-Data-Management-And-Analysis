import { FC, memo, useState } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import './table.css';
import Loader from '../Loader';
import { NO_DATA_AVAILABLE } from '../../../utils/constants';

const Table: FC<TableProps> = ({ data, columns, onSortChange, isLoading, error }) => {
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

  const handleSort = (newSortColumns: SortColumn[]) => {
    setSortColumns(newSortColumns);

    if (newSortColumns.length > 0) {
      const { columnKey, direction } = newSortColumns[0];
      onSortChange(columnKey, direction); // Trigger the callback for sorting
    } else {
      onSortChange('', ''); // Clear sorting if no columns are selected
    }
  };

  return (
    <DataGrid
      columns={columns}
      rows={data}
      rowHeight={50}
      headerRowHeight={30}
      sortColumns={sortColumns}
      onSortColumnsChange={handleSort}
      renderers={{
        noRowsFallback: (
          <div
            className="flex justify-center items-center w-full h-[70vh]"
            style={{
              gridColumn: '1 / -1', // Spans all columns
              height: '100%',
            }}
          >
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>
            ) : (
                <div className="text-textPrimary">{ NO_DATA_AVAILABLE }</div> // Fallback text when there is no data and not loading
            )}
          </div>
        ),
      }}        
      style={{
        maxHeight: '70vh',
        width: '100%',
      }}
    />
  );
};

export default memo(Table);
