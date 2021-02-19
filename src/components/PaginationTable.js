import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'


const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // destructure page instead of rows
        nextPage, // helper functions that react-table gives us to help navigate across different pages
        previousPage, // two buttons and click events need to be added in the jsx like 'onClick={() => previousPage()}
        canPreviousPage, //boolean properties that tell use if we can or not goto the next or previous page
        canNextPage, // used in the next and previous buttons as 'disabled={!canNextPage}'
        pageOptions,
        state,
        gotoPage, // allows use to goto a specific page
        pageCount,
        setPageSize, // number of rows per page
        prepareRow
    } = useTable(
        {
        columns,
        data,
        initialState: { pageIndex: 2 } // set the initial page to number 2. it is 0 by default
        },
        usePagination // usePagination as the second argument in the useTable hook
    )

    // pageIndex: page currently on (starts at 0)
    const { pageIndex, pageSize } = state

    return (
        <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {/* change from rows to page */}
            {page.map(row => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
        <div>
            {/* goto the first page */}
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
            </button>{' '}
            {/* previousPage/ nextPage was destructured from useTable above */}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>{' '}
            <span>
            Page{' '}
            {/* renders the current active page out of the total number of pages */}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            {/* create a gap using ' ' */}
            <span>
            | Go to page:{' '}
            {/* this is not a controlled component. this controls the goto page by manually entereing the number */}
            <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
                }}
                style={{ width: '50px' }}
            />
            </span>{' '}
            {/* allows the user to select between 10, 25 or 50 rows per page */}
            <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}>
            {[10, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select>
        </div>
        </>
    )
}

export default PaginationTable