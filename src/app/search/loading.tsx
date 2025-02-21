import loader_logo from '/public/loader_logo.gif';
import Image from 'next/image';
import './styles.scss';

export default function Loading() {
  return (
    <div className="loading-container">
      <Image width={200} height={250} src={loader_logo} alt="Loading" priority />
    </div>
  );
}
