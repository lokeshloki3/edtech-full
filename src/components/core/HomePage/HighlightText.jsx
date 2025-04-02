import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <span className='font-bold text-richblue-200'>
            {/* Try gradient to from as well in tailwind css */}
            {" "}
            {text}
        </span>
    )
}

export default HighlightText