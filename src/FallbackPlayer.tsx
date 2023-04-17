import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface IVideoJSPlayer {
    srcObject?: Blob
    src: Function;
    play: Function;
    pause: Function;
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
    console.log(videoEl);
    const [playerInst, setPlayerInst] = useState<IVideoJSPlayer>();

    useEffect(() => {
        console.log(videoEl, streamUrl, playerInst, muted);
        if (videoEl) {
            if (!playerInst) {
                console.log("setting new instance");
                setPlayerInst(videojs(videoEl, {
                    muted: muted,
                    autoplay: true,
                    controls: false,
                    sources: streamUrl,
                    fluid: true
                }, function onPlayerReady() {
                    console.log('onPlayerReady');
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
                            })
                            .catch(e => {
                            })
                    } catch (ex) {
                        console.warn(ex);
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
                        console.warn(ex);
                    }
                }
            }
        }
    }, [videoEl, streamUrl, playerInst, muted]);

    return <div id={wrapperId} className={DEFAULT_CLASSNAME} style={{ width: width, height: height }}>
        <video ref={(el: HTMLVideoElement) => setVideoEl(el)} className="video-js" width="100%" height="100%"></video>
    </div>
}

export default FallbackPlayer;