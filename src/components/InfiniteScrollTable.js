import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy } from "react-table";

import InfiniteScroll from "react-infinite-scroll-component";
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'


export const InfiniteScrollTable = () => {

    // useMemo so data isn't recreated on each re-render
    const columns = useMemo(() => COLUMNS, [])

    const fdata = useMemo(() => MOCK_DATA, [])

    const [data, setItems] = useState(fdata.slice(0, 15));

    const fetchMoreData = () => {
        setTimeout(() => {
            const len = data.length
            setItems(data.concat(fdata.slice(len, len + 10)));
        }, 300);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy }
    } = useTable(
        {
        columns,
        data
        },
        useSortBy
    );
    
    useEffect(() => {
        console.log("sort");
    }, [sortBy]);


    // Render the UI for your table
    return (
        <InfiniteScroll
            dataLength={rows.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading 10 more rows ...</h4>}
        >
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
            </table>
        </InfiniteScroll>
    );
}
