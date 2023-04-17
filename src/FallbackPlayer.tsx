import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface IVideoJSPlayer {
    srcObject?: Blob;
    src: (streamUrl: string) => void;
    play: () => void;
    pause: () => void;
}

const DEFAULT_CLASSNAME = "sldp-react-player";

type Props = {
    streamUrl: string;
    wrapperId?: string;
    muted: boolean;
    width: string | number;
    height: string | number;
};

const FallbackPlayer = ({ streamUrl, wrapperId = `sldp-react-player-${uuidv4()}`, muted, width, height }: Props) => {
    const [videoEl, setVideoEl] = useState<HTMLVideoElement>();
    const [playerInst, setPlayerInst] = useState<IVideoJSPlayer>();

    useEffect(() => {
        if (videoEl) {
            if (!playerInst) {
                setPlayerInst(videojs(videoEl, {
                    muted,
                    autoplay: true,
                    controls: false,
                    sources: streamUrl,
                    fluid: true
                }, function onPlayerReady() {
                    // do nothing
                }));
            } else {
                const isPlayerAlreadyPlaying = videoEl && videoEl.currentTime > 0 && !videoEl.paused && !videoEl.ended && videoEl.readyState > videoEl.HAVE_CURRENT_DATA;
                if (!isPlayerAlreadyPlaying) {
                    try {
                        playerInst.src(streamUrl);
                        fetch(streamUrl)
                            .then(response => response.blob())
                            .then(blob => {
                                playerInst.srcObject = blob;
                                return playerInst.play();
                            })
                            .then(_ => {
                                // do nothing
                            })
                            .catch(e => {
                                // do nothing
                            })
                    } catch (ex) {
                        // do nothing
                    }
                }
            }
        }

        return () => {
            if (playerInst) {
                const isPlayerAlreadyPlaying = videoEl && videoEl.currentTime > 0 && !videoEl.paused && !videoEl.ended && videoEl.readyState > videoEl.HAVE_CURRENT_DATA;
                if (isPlayerAlreadyPlaying) {
                    try {
                        playerInst.pause();
                    } catch (ex) {
                        // do nothing
                    }
                }
            }
        }
    }, [videoEl, streamUrl, playerInst, muted]);

    return <div id={wrapperId} className={DEFAULT_CLASSNAME} style={{ width, height }}>
        <video ref={(el: HTMLVideoElement) => setVideoEl(el)} className="video-js" width="100%" height="100%"></video>
    </div>
}

export default FallbackPlayer;