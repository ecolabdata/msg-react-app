import type { ImageDetailed } from 'api/interfaces/common';

const CardImages = ({ images }: { images: ImageDetailed[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-6">
      <h2 className="text-2xl mb-4">{'Photos'}</h2>
      {images.map((image, index) => (
        <img
          key={(image.url || '') + index}
          src={image.thumbnails.small?.url || image.url}
          alt=""
        />
      ))}
    </div>
  );
};
export default CardImages;
