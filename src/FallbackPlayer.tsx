import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Hls from 'hls.js';

const DEFAULT_CLASSNAME = "sldp-react-player";

type Props = {
    streamUrl: string;
    wrapperId?: string;
    muted: boolean;
    width: string | number;
    height: string | number;
};

const FallbackPlayer = ({ streamUrl, wrapperId = `sldp-react-player-${uuidv4()}`, muted, width, height }: Props) => {
    const [videoEl, setVideoEl] = useState<HTMLMediaElement>();


    useEffect(() => {
        if (!videoEl) return; 
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                console.log('video and hls.js are now bound together !');
            });
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level'
                );
            });
            hls.loadSource(streamUrl);
            hls.attachMedia(videoEl);
        }
    }, [videoEl, streamUrl]);

    return <div id={wrapperId} className={DEFAULT_CLASSNAME} style={{ width, height }} >
        <video ref={(el: HTMLVideoElement) => setVideoEl(el)}
            className="video-js"
            width="100%"
            height="100%"
            controls={false}
            autoPlay
            muted={muted}
            playsInline
        ></video>
    </div>
}

export default FallbackPlayer;