import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
// import { GROUPED_COLUMNS } from './columns' // used to show how grouped columns work
import './table.css'

const BasicTable = () => {

    // useMemo so data isn't recreated on each re-render
    const columns = useMemo(() => COLUMNS, [])
    // const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    // useTable returns an instance that we store in a constenant.
    // we need to use this instance in the jsx to render the necessary ui.
    // the destructured instance holds functions and arrays that the useTable hook from react-table package has given to us to enable easy table creation.
    //      we need to use all of these in our html for our table to work as intended.
    // getTableProps: a function that needs to be destructured on the <table> tag
    // getTableBodyProps: needs to be destructured on the <tbody> tag
    // headerGroups: contains the column heading information which belongs inside the <thead> tag. it is an array which requires us to use the map
    //      method to render the jsx for each header group. headers can be grouped.
    // footerGroups: works the same as other groups
    // rows: go inside the <tbody> tag. we need to render a list of elements using map.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        // the 'Header' comes from the MOCK_DATA.json file
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
                        // gives us access to the indivdual row cell and renders the value found in the MOCK_DATA.json
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

export default BasicTable