import React from 'react'

const InputError = ({ error }) => {
    return (
        <>
            {error ?
                <div className='text-left w-full text-xs text-red-400'>{error}</div> : ""
            }
        </>
    )
}

export default InputError