import { CSSProperties } from 'react';

import '@/components/loading/loading.scss';

export default function LoadingComp({ style }: {style?: CSSProperties}) {
    return (
        <div className="loading-container" style={style}>
            <h1 className="loading-text">Loading
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
            </h1>
        </div>
    );
}