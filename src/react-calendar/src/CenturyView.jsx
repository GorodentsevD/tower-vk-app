import React from 'react';

import Decades from './CenturyView/Decades.jsx';

export default function CenturyView(props) {
    function renderDecades() {
        return (
            <Decades {...props} />
        );
    }

    return (
        <div className="react-calendar__century-view">
            {renderDecades()}
        </div>
    );
}
