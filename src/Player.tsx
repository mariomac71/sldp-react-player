import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef } from "react";
import { getSDK } from './utils'
const SLDP_LIB_URL = 'https://softvelum.com/player/releases/sldp-vVERSION.min.js';
const SLDP_GLOBAL = 'SLDP';

type SldpOptions = {
    controls?: boolean;
    container?: string;
    stream_url?: string;
    adaptive_bitrate: {
        initial_rendition: string;
    },
    buffering: number;
    autoplay?: boolean;
    muted?: boolean;
};

type Props = {
    sldpVersion?: string;
    streamUrl: string;
    width: number;
    height: number;
    controls: boolean;
    autoplay?: boolean;
    muted?: boolean;
    sldpOptions?: SldpOptions;
    wrapperId?: string;
};

const DEFAULT_CLASSNAME = "sldp-react-player";

const Player = ({
    sldpVersion = '2.24.0',
    streamUrl,
    width,
    height,
    controls = true,
    autoplay = false,
    muted = false,
    wrapperId = `sldp-react-player-${uuidv4()}`,
    sldpOptions = {
        adaptive_bitrate: {
            initial_rendition: '240p'
        },
        buffering: 500
    }
}: Props) => {
    const playerInstance = useRef<{
        init: (options: SldpOptions) => {}
        destroy: () => {}
    }>();

    useEffect(() => {
        getSDK(
            SLDP_LIB_URL.replace('VERSION', sldpVersion),
            SLDP_GLOBAL
        ).then((SLDP: any) => {
            playerInstance.current = SLDP.init(Object.assign({}, sldpOptions, {
                container: wrapperId,
                stream_url: streamUrl,
                autoplay,
                muted,
                height,
                width,
                controls
            }));
        });

        return () => {
            if (playerInstance.current)
                playerInstance.current.destroy();
        }
    }, [streamUrl]);

    return <div id={wrapperId} className={DEFAULT_CLASSNAME}></div>
};

export default Player;