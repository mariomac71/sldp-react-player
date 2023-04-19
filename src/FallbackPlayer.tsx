import React, { useEffect, useState } from 'react';
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
    const [videoEl, setVideoEl] = useState<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoEl) return;

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(videoEl);
        }
        // HLS.js is not supported on platforms that do not have Media Source
        // Extensions (MSE) enabled.
        //
        // When the browser has built-in HLS support (check using `canPlayType`),
        // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
        // element through the `src` property. This is using the built-in support
        // of the plain video element, without using HLS.js.
        //
        // Note: it would be more normal to wait on the 'canplay' event below however
        // on Safari (where you are most likely to find built-in HLS support) the
        // video.src URL must be on the user-driven white-list before a 'canplay'
        // event will be emitted; the last video event that can be reliably
        // listened-for when the URL is not on the white-list is 'loadedmetadata'.
        else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
            videoEl.src = streamUrl;
        }
    }, [videoEl, streamUrl]);

    return <div id={wrapperId} className={DEFAULT_CLASSNAME} style={{ width, height }} >
        <video ref={(el: HTMLVideoElement) => { setVideoEl(el) }}
            width="100%"
            height="100%"
            controls={false}
            autoPlay
            muted={muted}
            playsInline
        />
    </div>
}

export default FallbackPlayer;