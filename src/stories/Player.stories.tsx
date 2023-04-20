import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Player from '../Player';

const meta: Meta<typeof Player> = {
  title: 'SLDP Player/Player',
  component: Player,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (StoryComponent) => (
      <div style={{
        margin: '1rem',
        minWidth: '70vw',
        height: 'auto'
      }}>
        <StoryComponent />
      </div>
    ),
  ],
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
    width: '100%',
    height: 'auto',
    controls: false,
    autoplay: true,
    muted: true,
    streamUrl: 'wss://vd1.wmspanel.com/video_demo_without_ads/stream; https://demo.pgstreaming.pg.company:1444/live/democh1en.m3u8'
    // https://demo.pgstreaming.pg.company:1444/live/democh1en.m3u8
  }
}