import Image from 'next/image';
import loader_logo from 'public/icons/loader_logo.gif';
type Props = {
  customClass?: boolean;
};

const PromLoaderLogo = ({ customClass = false }: Props) => {
  return (
    <div className={`loaderContainer ${customClass ? 'custom-height' : 'default-height'}`}>
      {' '}
      <Image width={200} height={250} src={loader_logo} alt="Loading" priority />
    </div>
  );
};

export default PromLoaderLogo;
