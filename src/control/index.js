import React from 'react';
import Control_film from '../control_components/films';
import Control_stage from '../control_components/stage';
import style from '../styles/control.module.css';

function Control() {
    return (
        <div className={`${style.main}`}>
            <div className={`${style.content}`}>
                <Control_film />
                <Control_stage />
            </div>
        </div>
    );
}

export default Control;
