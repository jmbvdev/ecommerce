import React from 'react';
import "../styles/loading.css"

const LoadingScreen = () => {
    return (
        <div className='loading-screen'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;