import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Player from '../Player';

export default {
  title: 'SLDP Player/Player',
  component: Player,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => <div>
  <Player {...args} />
</div>;

export const Controls = Template.bind({});
Controls.args = {
  controls: true,
  streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream'
};

export const AutoplayMuted = Template.bind({});
AutoplayMuted.args = {
  controls: false,
  autoplay: true,
  muted: true,
  streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream'
}

export const iPhoneFallback = Template.bind({});
iPhoneFallback.args = {
  width: '300px',
  height: 'auto',
  controls: false,
  autoplay: true,
  muted: true,
  streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream; https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
}