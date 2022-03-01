import React from 'react'
function AssetLayout({ children }) {
    return (
        <div className='container'>
            <h2 className="py-3 border border-dark"> New Asset</h2>
            <div className="d-flex justify-content-center bg-success">
                {children}
            </div>

        </div>
    )
}

export default AssetLayout