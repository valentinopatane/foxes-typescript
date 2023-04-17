import { LazyImg } from "@/components/LazyImage/LazyImage";
import { useState } from "react";
import type { MouseEventHandler } from "react";
type ImageItem = { id: string; url: string };

export default function Home() {
    const [images, setImages] = useState<Array<ImageItem>>([]);

    const random = () => Math.floor(Math.random() * 123) + 1;
    const generateId = () => Math.random().toString(36).substring(2, 10);

    const handleNew: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const newFox = {
            id: generateId(),
            url: `https://randomfox.ca/images/${random()}.jpg`,
        };
        setImages([...images, newFox]);
    };

    const handleClick = () => {
        console.log("Nice fox huh?");
    };

    const handleLoaded = (node: HTMLImageElement): void => {
        console.log("Cargada" + node);
    };

    return (
        <div>
            <header className="titleFox">
                <h1 className="text-3xl font-bold">Wanna see some foxes?</h1>
                <button onClick={handleNew}>Add new</button>
            </header>
            <main className="gridFoxes">
                {images.map((i) => (
                    <div className="p-4" key={i.id}>
                        <LazyImg
                            src={i.url}
                            onLazyLoad={handleLoaded}
                            className="rounded bg-gray-300 w-80 h-auto"
                            onClick={handleClick}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}
