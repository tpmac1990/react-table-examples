import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { Checkbox } from './Checkbox'

// may need to turn off strict mode in App.js. It may cause an error

const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows // provides a flat array of rows that are currently selected in the table
    } = useTable(
        {
        columns,
        data
        },
        useRowSelect, // gives us a property that keeps track of the selected rows
        // this function gets all the table hooks as an argument
        hooks => {
        // add a visible column onto the table. this new column recieves all the columns as an argument
        hooks.visibleColumns.push(columns => [
            {
            id: 'selection',
            // getToggleAllRowsSelectedProps: something the useRowSelect hook provides 
            Header: ({ getToggleAllRowsSelectedProps }) => (
                // pass in all the rows selected props. allows use to selected or unselect all checkboxes in the table through the header checkbox.
                <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            // deconstruct the row and add a check box for the row
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
            },
            // we need to maintain the remainder of the columns using a spread
            ...columns
        ])
        }
    )

    // replace rows with firstPageRows. This will return the first 10 rows of data rather than the full 200.
    const firstPageRows = rows.slice(0, 10)

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
            {/* firstPageRows has replaced rows */}
            {firstPageRows.map(row => {
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
        {/* stringify the selected rows beneath the table */}
        <pre>
            <code>
            {JSON.stringify(
                {
                selectedFlatRows: selectedFlatRows.map(row => row.original)
                },
                null,
                2
            )}
            </code>
        </pre>
        </>
    )
}

export default RowSelection