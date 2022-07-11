import { useState, useEffect, FC } from "react";

import CrossfadeImg from "react-crossfade-img";

interface ISlide {
  name: string;
}

interface IChangingImageProps {
  changeInterval: number;
  slides: ISlide[];
}

const ChangingImage: FC<IChangingImageProps> = ({changeInterval, slides}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, changeInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <CrossfadeImg
      src={
        import.meta.env.VITE_PUBLIC_URL +
        "/assets/slideshow/" +
        slides[seconds % slides.length].name
      } // Image URL
      width="100%"
      height="100%"
      objectFit="cover"
      duration="1s"
    />
  );
};

export default ChangingImage;
