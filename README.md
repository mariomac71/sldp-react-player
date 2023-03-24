# Sldp React Player

Sldp React Player is a lightweight React component that enables playing streams with the [SLDP](https://softvelum.com/sldp) protocol in modern browsers using the free version of the SLDP Player by Softvelum. The component is easy to use and customizable, allowing for seamless integration into your React projects.

## Live Demo
Check out the [**Live Demo**](https://fabrizioarmango.gitlab.io/sldp-react-player) to see sldp-react-player in action.

## Installation
To install sldp-react-player, simply run the following command:

```
npm i @fabrizio.armango/sldp-react-player
```

## Usage 
To use the component, simply import it into your React project and add the `<SldpReactPlayer>` tag with the appropriate props.

You can customize the `streamUrl`, `width`, `height`, `controls`, `autoplay`, `muted`, and `sldpOptions` props to suit your specific needs.

Here is an example:


``` jsx
import SldpReactPlayer from '@fabrizio.armango/sldp-react-player';

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
If you need any support or have any questions, please reach out via email at fabrizio.armango@gmail.com.

## Roadmap
- [x] support basic functionality
- [x] add storybook
- [ ] include basic styles
- [ ] build and publish using GitLab CI

## Contributing
This project welcomes contributions. Feel free to create issues, add features, stories, fix bugs or anything you think could help the community.

## Project status
The project is currently in beta. 