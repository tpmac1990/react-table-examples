import React, { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const ColumnOrder = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setColumnOrder // controls the order of the columns in the table
    } = useTable({
        columns,
        data
    }, useColumnOrder)

    // will change the original order of columns to the order seen below
    const changeOrder = () => {
        setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
    }

    return (
        <>
        <button onClick={changeOrder}>Change column order</button>
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