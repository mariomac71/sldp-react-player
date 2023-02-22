# Sldp React Player

## Description
Sldp React Player is a React component for playing streams with [SLDP](https://softvelum.com/sldp) protocol in modern browsers using the free version of SLDP Player by Softvelum.

[**Live Demo**](https://fabrizio.armango.gitlab.io/sldp-react-player)


## Installation
```
npm i @fabrizio.armango/sldp-react-player
```

## Usage 
``` jsx
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

## Support
Email: fabrizio.armango@gmail.com

## Roadmap
- [x] support basic functionality
- [x] add storybook
- [ ] include basic styles
- [ ] build and publish using gitlab ci

## Contributing
This project welcomes contributions. Feel free to create issues, add features, stories, fix bugs or anything you think could help the community.

## Project status
The project is currently in beta. 