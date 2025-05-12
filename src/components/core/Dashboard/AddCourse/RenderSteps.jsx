import React from 'react'
import { useSelector } from 'react-redux'

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    return (
        <div>

        </div>
    )
}

export default RenderSteps