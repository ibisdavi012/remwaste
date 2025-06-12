import { useState, useEffect, useMemo } from 'react';
import { getCachedImage, setCachedImage } from '../utils/imageCache';

export const useImageLoader = (size: number) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const imageUrl = useMemo(() => 
    `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`,
    [size]
  );

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const cached = getCachedImage(imageUrl);
        if (cached) {
          setImgSrc(cached);
          setIsLoading(false);
          return;
        }

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          setCachedImage(imageUrl, dataUrl);
          setImgSrc(dataUrl);
          setIsLoading(false);
        };

        reader.onerror = () => {
          setError(new Error('Failed to read image data'));
          setImgSrc(imageUrl); // fallback to direct url
          setIsLoading(false);
        };

        reader.readAsDataURL(blob);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setImgSrc(imageUrl); // fallback to direct url
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageUrl]);

  return { imgSrc, isLoading, error };
}; 