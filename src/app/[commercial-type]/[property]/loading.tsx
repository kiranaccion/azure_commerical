import loader_logo from '/public/loader_logo.gif';
import Image from 'next/image';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: ' #fff',
      }}
    >
      <Image width={200} height={250} src={loader_logo} alt="Loading" priority />
    </div>
  );
}
