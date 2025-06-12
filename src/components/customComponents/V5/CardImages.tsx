const CardImagesV5 = ({ images }: { images: string[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-6">
      <h2 className="text-2xl mb-4">{'Photos'}</h2>
      {images.map((image, index) => (
        <img key={image + index} src={image} alt="" />
      ))}
    </div>
  );
};
export default CardImagesV5;
