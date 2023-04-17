import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = {
    src: string;
    onLazyLoad: (node: HTMLImageElement) => void;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export const LazyImg = ({
    src,
    onLazyLoad,
    ...imgProps
}: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);

    const [currentSrc, setCurrentSrc] = useState(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setCurrentSrc(src);
                    setIsLoaded(true);

                    if (node.current) onLazyLoad(node.current);
                }
            });
        });

        if (node.current) observer.observe(node.current);

        return () => {
            observer.disconnect();
        };
    }, [src, onLazyLoad, isLoaded]);

    return <img ref={node} src={currentSrc} {...imgProps} />;
};
