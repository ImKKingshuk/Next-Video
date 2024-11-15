import * as React from 'react';
import Hls from 'hls.js';

export type ResponsiveVideoSource = {
  src: string;
  type: string; // MIME type, e.g., 'video/mp4', 'video/webm'
  media?: string; // Media query for responsive loading
};

export type VideoProps = {
  src?: string; // Fallback video URL
  sources?: ResponsiveVideoSource[]; // Array of responsive sources
  poster?: string; // Poster image
  placeholder?: string; // Placeholder image URL
  lazy?: boolean; // Lazy load the video
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  hls?: boolean; // HLS streaming support
};

const Video: React.FC<VideoProps> = ({
  src,
  sources = [],
  poster,
  placeholder,
  lazy = false,
  preload = 'metadata',
  className,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  hls = false,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isHlsSupported = Hls.isSupported();

  // Lazy loading logic
  React.useEffect(() => {
    if (!lazy || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.load(); // Trigger loading
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  // HLS support
  React.useEffect(() => {
    if (hls && isHlsSupported && src && videoRef.current) {
      const hlsInstance = new Hls();
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(videoRef.current);

      return () => hlsInstance.destroy();
    }
  }, [hls, isHlsSupported, src]);

  return (
    <div style={{ position: 'relative' }}>
      {placeholder && (
        <img
          src={placeholder}
          alt="Video placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(10px)',
            objectFit: 'cover',
          }}
        />
      )}
      <video
        ref={videoRef}
        poster={poster}
        preload={lazy ? 'none' : preload}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className={className}
      >
        {sources.map(({ src, type, media }) => (
          <source
            key={src}
            src={lazy ? undefined : src}
            type={type}
            media={media}
          />
        ))}
        {!hls && src && <source src={lazy ? undefined : src} />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
