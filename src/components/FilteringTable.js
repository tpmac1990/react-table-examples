import React, { useMemo } from 'react'
// the useGlobal hook allows use to implement the global filter.
// Global filter allows to filter all columns by the one filter.
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';

const FilteringTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    // 1st arg is the created function, 2nd arg is the is an empty array.
    // we are returning an object with properties that need to be applied to every column in the table.
    // this defaultColumn will then be passed into the useTable hook after data in the first argument.
    // this is the same as specifying a filter property of 'filter: ColumnFilter' for every column in the table
    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter
        }),
        []
    )

    // state: the table state
    // setGlobalFilter: the funciton to set the global filter value

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
    {
        columns,
        data,
        defaultColumn
    },
        useFilters, // pass this in before useGlobalFilter
        useGlobalFilter
    )

    // destructure globalFilter from the state
    const { globalFilter } = state

    return (
        <>
            {/* use the GlobalFilter component. it needs two props, filter and setFilter */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                        {/* render the column filter in the column header */}
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
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
                <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.map(column => (
                        <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                    ))}
                    </tr>
                ))}
                </tfoot>
            </table>
        </>
    )
}

export default FilteringTable