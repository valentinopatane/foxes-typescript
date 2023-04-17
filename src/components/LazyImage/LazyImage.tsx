import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = {
    image: string;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export const LazyImg = ({ image, ...imgProps }: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);
    const [currentSrc, setCurrentSrc] = useState(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    );

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentSrc(image);
                }
            });
        });
        if (node.current) observer.observe(node.current);

        return () => {
            observer.disconnect();
        };
    }, [image]);

    return <img ref={node} src={currentSrc} {...imgProps} />;
};
