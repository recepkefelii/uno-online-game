import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Spinner = () => {
    return (
        <div>
            <ThreeCircles
                height="100"
                width="100"
                color="#0066FF"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    )
}

export default Spinner