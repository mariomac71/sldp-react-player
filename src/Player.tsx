import React, { useEffect, useMemo, useState } from 'react';
import MobileDetect from 'mobile-detect';

import StandardPlayer from './StandardPlayer';
import type { Props as SldpProps } from './StandardPlayer';
import FallbackPlayer from './FallbackPlayer';

const Player = (props: SldpProps) => {
    const { streamUrl, muted = false, controls, width, height } = props;
    const sldpStreamUrl = useMemo(() => streamUrl.split(";")[0].trim(), [streamUrl]);
    const fallbackStreamUrl = useMemo(() => {
        const tmp = streamUrl.split(";");
        if (tmp.length > 1) {
            return tmp[1].trim();
        }
        return tmp[0].trim();
    }, [streamUrl]);

    const [deviceRecognized, setDeviceRecognized] = useState(false);
    const [isIPhone, setIsIPhone] = useState(false);
    useEffect(() => {
        if (!window.navigator) {
            return;
        }
        const mobileDetect = new MobileDetect(window.navigator.userAgent);
        setIsIPhone(mobileDetect.is('iPhone'));
        setDeviceRecognized(true);
    }, []);

    if (!deviceRecognized) return null;
    if (isIPhone) {
        return <FallbackPlayer wrapperId={props.wrapperId} muted={muted} streamUrl={fallbackStreamUrl} width={width} height={height} />
    }
    return <StandardPlayer {...props} streamUrl={sldpStreamUrl} />
};

export default Player;