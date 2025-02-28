import React, { memo } from 'react';
import './DetailLine.css';

const DetailLine = memo(({ label, value }) => {
    return (
        <div className="event-detail-line">
            <span className="detail-label">{label}:</span>
            <span className="detail-value">{value}</span>
        </div>
    );
}, (prev, next) => prev.value === next.value && prev.label === next.label);

export default DetailLine; 