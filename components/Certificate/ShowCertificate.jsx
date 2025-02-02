import { Fancybox as NativeFancybox } from '@fancyapps/ui';

export default function ShowCertificate({ image, caption, children }) {
  const handleButtonClick = () => {
    NativeFancybox.show([
      {
        src: image,
        type: 'image',
        caption: caption,
      },
    ]);
  };

  return (
    <button onClick={handleButtonClick} className="text-primary">
      {children}
    </button>
  );
}
