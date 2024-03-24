import { ReactNode, useEffect, useRef, useState } from 'react';
import discord from '@/lib/discord/service';
import { Common, EventPayloadData } from '@discord/embedded-app-sdk';

import "@/components/layoutmode/layout.scss"

export default function LayoutMode({ children }: { children: ReactNode }) {
    // https://discord.com/developers/docs/activities/development-guides#application-layout-mode
    const [layoutModeString, setLayoutModeString] = useState<string>("FOCUSED");
    const layoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLayoutModeUpdate = (update: EventPayloadData<'ACTIVITY_LAYOUT_MODE_UPDATE'>) => {
            const layoutMode = update.layout_mode;
            let layoutModeStr = '';
            switch (layoutMode) {
                case Common.LayoutModeTypeObject.FOCUSED:
                    layoutModeStr = 'FOCUSED';
                    break;
                case Common.LayoutModeTypeObject.PIP:
                    layoutModeStr = 'PIP';
                    break;
                case Common.LayoutModeTypeObject.GRID:
                    layoutModeStr = 'GRID';
                    break;
                case Common.LayoutModeTypeObject.UNHANDLED:
                    layoutModeStr = 'UNHANDLED';
                    break;
            }

            setLayoutModeString(layoutModeStr);
        };

        discord.sdk.subscribe('ACTIVITY_LAYOUT_MODE_UPDATE', handleLayoutModeUpdate);

        return () => {
            discord.sdk.unsubscribe('ACTIVITY_LAYOUT_MODE_UPDATE', handleLayoutModeUpdate);
        };
    }, []);

    useEffect(() => {
        layoutRef.current!.className = `layout-container ${layoutModeString}`;
    }, [layoutModeString])

    return (
        <div ref={layoutRef}>
            {children}
        </div>
    );
}