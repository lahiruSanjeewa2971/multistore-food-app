import React from 'react'

interface SetupLayoutProp {
    children: React.ReactNode
}

const SetupLayout = ({ children }: SetupLayoutProp) => {
    return (
        <div>{children}</div>
    )
}

export default SetupLayout