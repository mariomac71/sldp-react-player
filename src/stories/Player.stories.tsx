import type { Meta, StoryObj } from '@storybook/react';
import Player from '../Player';

const meta: Meta<typeof Player> = {
  title: 'SLDP Player/Player',
  component: Player,
  parameters: {
    layout: 'centered',
  }
}
export default meta;

type Story = StoryObj<typeof Player>;

export const Controls: Story = {
  args: {
    controls: true,
    streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream'
  }
};

export const AutoplayMuted: Story = {
  args: {
    controls: false,
    autoplay: true,
    muted: true,
    streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream'
  }
}

export const iPhoneFallback: Story = {
  args: {
    width: '300px',
    height: 'auto',
    controls: false,
    autoplay: true,
    muted: true,
    streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream; https://demo.pgstreaming.pg.company:1444/live/democh1en.m3u8'
    // https://demo.pgstreaming.pg.company:1444/live/democh1en.m3u8
  }
}