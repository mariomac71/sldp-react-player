# Sldp React Player

Sldp React Player is a lightweight React component that enables playing streams with the [SLDP](https://softvelum.com/sldp) protocol in modern browsers using the free version of the SLDP Player by Softvelum. The component is easy to use and customizable, allowing for seamless integration into your React projects.

## Live Demo
Check out the [**Live Demo**](https://github.com/mariomac71/sldp-react-player) to see sldp-react-player in action.

## Installation
To install sldp-react-player, simply run the following command:

```
npm i @mario.mac.rc/sldp-react-player
```

## Usage 
To use the component, simply import it into your React project and add the `<SldpReactPlayer>` tag with the appropriate props.

You can customize the `streamUrl`, `width`, `height`, `controls`, `autoplay`, `muted`, and `sldpOptions` props to suit your specific needs.

Here is an example:


``` jsx
import SldpReactPlayer from '@mario.mac.rc/sldp-react-player';

<SldpReactPlayer 
    streamUrl={'wss://<stream_url>'}
    width={1280}
    height={720}
    controls={false}
    autoplay={true}
    muted={false}
    sldpOptions={{
        adaptive_bitrate: {
            initial_rendition: '240p'
        },
        buffering: 500
    }}  
/>
```

## iOS
SLDP Protocol seems not to work on iPhones ([check Browser support section](https://softvelum.com/player/web/)) without installing an additional application first.

A simple workaround has been implemented, providing the component with 2 urls as `streamUrl` separated by ";".

The first url will be used as default sldp stream and the second one for iPhone devices using of [video.js](https://github.com/videojs/video.js).

### Example
``` jsx

<SldpReactPlayer 
    // props
    streamUrl={'wss://vd1.wmspanel.com/video_demo_without_ads/stream; https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
/>

```

## Support
If you need any support or have any questions, please reach out via email at mario.mac.rc@gmail.com.

## Roadmap
- [x] support basic functionality
- [x] add storybook
- [ ] include basic styles
- [ ] build and publish using GitLab CI

## Contributing
This project welcomes contributions. Feel free to create issues, add features, stories, fix bugs or anything you think could help the community.

## Project status
The project is currently in beta. 