# Sldp React Player

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