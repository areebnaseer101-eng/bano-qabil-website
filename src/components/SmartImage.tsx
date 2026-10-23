import { useState, type ImgHTMLAttributes } from 'react';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#f5ead7"/>
      <text x="200" y="200" font-size="48" text-anchor="middle" dominant-baseline="middle" fill="#c9a96e" font-family="serif">Bloom &amp; Bliss</text>
      <text x="200" y="240" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#dcc28a" font-family="sans-serif">Floral Boutique</text>
    </svg>`
  );

export function SmartImage({ onError, fallbackSrc = DEFAULT_FALLBACK, ...props }: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!errored) {
      setErrored(true);
    }
    onError?.(e);
  };

  return (
    <img
      {...props}
      src={errored ? fallbackSrc : props.src}
      onError={handleError}
    />
  );
}
