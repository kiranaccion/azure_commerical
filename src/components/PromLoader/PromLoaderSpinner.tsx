import { Oval } from 'react-loader-spinner';

export interface IPromLoaderSpinnerProps {
  height: number;
  width: number;
}

const PromLoaderSpinner = ({ height, width }: IPromLoaderSpinnerProps) => {
  return (
    <div className="headerLoaderSpinner">
      <Oval height={height} width={width} color="#ef4e22" ariaLabel="oval-loading" />
    </div>
  );
};

export default PromLoaderSpinner;
