import React, { useState } from 'react'
// This will wait 1 sec after typing to filter results rather than filtering after every key stroke.
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <span>
        Search:{' '}
        <input
            value={value || ''}
            onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
            }}
        />
        </span>
    )
}

export default GlobalFilter