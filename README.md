<h1 align="center">Next-Video</h1>

<p align="center">
Next-Video: Your All-in-One Video Optimization Solution for React and Next.js! Effortlessly optimize and enhance video delivery with lazy loading, responsive video sources, HLS support, and more. Perfect for modern web apps, Next-Video ensures seamless integration and performance-focused video playback. 🎥✨
</p>

<br> <br>

## Features

- **Optimized Video Playback**: Built for modern web development, Next-Video provides lazy loading, responsive video sources, and HLS streaming.
- **Responsive Video Support**: Define multiple sources for adaptive streaming and responsive design, making your videos look great on any screen.
- **HLS Streaming Support**: Automatically integrates HLS.js for live streaming or adaptive bitrate playback.
- **Lazy Loading**: Save bandwidth by loading videos only when they appear in the viewport.
- **Poster and Placeholder Support**: Add fallback visuals, including blurred placeholders, for a polished experience.
- **Custom CDN Integration**: Easily transform video URLs using your preferred CDN path logic.
- **SSR Friendly**: Fully compatible with server-side rendering, ideal for Next.js and similar frameworks.
- **TypeScript Support**: Enjoy full typing, code completion, and type safety for a better developer experience.

## Installation

Install `next-video` using your preferred package manager:

### Bun

```bash
bun add next-video
```

### npm

```bash
npm install next-video
```

### pnpm

```bash
pnpm add next-video
```

### yarn

```bash
yarn add next-video
```

## Usage

### Basic Setup

Import the `Video` component and pass your video configuration:

```tsx
import React from 'react';
import { Video } from 'next-video';

export default function ExamplePage() {
  return (
    <div>
      <h1>My Awesome Video</h1>
      <Video
        src="/video.mp4"
        poster="/poster.jpg"
        placeholder="/placeholder.jpg"
        controls
        autoPlay={false}
        loop={false}
        lazy
        sources={[
          {
            src: '/video-480p.mp4',
            type: 'video/mp4',
            media: '(max-width: 480px)',
          },
          {
            src: '/video-720p.mp4',
            type: 'video/mp4',
            media: '(max-width: 720px)',
          },
        ]}
      />
    </div>
  );
}
```

### Advanced Features

#### **Responsive Videos**

Provide multiple video sources with responsive media queries for better performance across devices:

```tsx
<Video
  sources={[
    { src: '/video-360p.mp4', type: 'video/mp4', media: '(max-width: 360px)' },
    { src: '/video-720p.mp4', type: 'video/mp4', media: '(max-width: 720px)' },
  ]}
/>
```

#### **HLS Support**

Use HLS streaming with live or adaptive bitrate content:

```tsx
<Video src="/stream/video.m3u8" hls controls />
```

#### **Lazy Loading**

Improve performance by loading videos only when they appear in the viewport:

```tsx
<Video src="/video.mp4" lazy />
```

#### **Custom CDN Integration**

Transform video URLs using your custom CDN function:

```tsx
import { getCDNUrl } from 'next-video';

// Your custom CDN logic
const cdnTransform = (path: string) => `https://mycdn.example.com${path}`;

<Video
  src={getCDNUrl('/video.mp4', cdnTransform)}
  sources={[
    {
      src: getCDNUrl('/video-480p.mp4', cdnTransform),
      type: 'video/mp4',
      media: '(max-width: 480px)',
    },
  ]}
/>;
```

## API Reference

### `Video`

The `Video` component is the core of Next-Video. It provides a declarative way to define optimized video playback in your app.

**Props**:

| Prop          | Type                      | Default     | Description                                              |
| ------------- | ------------------------- | ----------- | -------------------------------------------------------- | ------------ | --------------------------------------------------- |
| `src`         | `string`                  | `undefined` | The video source URL.                                    |
| `sources`     | `ResponsiveVideoSource[]` | `[]`        | Array of responsive video sources.                       |
| `poster`      | `string`                  | `undefined` | The poster image URL.                                    |
| `placeholder` | `string`                  | `undefined` | The placeholder image URL (e.g., for a blurred preview). |
| `lazy`        | `boolean`                 | `false`     | Whether to enable lazy loading.                          |
| `hls`         | `boolean`                 | `false`     | Whether to enable HLS streaming support.                 |
| `preload`     | `'auto'                   | 'metadata'  | 'none'`                                                  | `'metadata'` | Specifies how the browser should preload the video. |
| `controls`    | `boolean`                 | `true`      | Whether to show video controls.                          |
| `autoPlay`    | `boolean`                 | `false`     | Whether the video should autoplay.                       |
| `muted`       | `boolean`                 | `false`     | Whether the video should be muted.                       |
| `loop`        | `boolean`                 | `false`     | Whether the video should loop after playback.            |

## License

This project is licensed under the GPL-3.0-or-later License.
