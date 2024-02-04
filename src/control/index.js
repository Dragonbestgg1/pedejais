import React from 'react';
import Control_film from '../control_components/films';
import Control_stage from '../control_components/stage';
import Control_activity from '../control_components/activity';

function Control() {
    return (
        <div>
            <Control_film />
            <Control_stage />
            <Control_activity />
        </div>
    );
}

export default Control;
