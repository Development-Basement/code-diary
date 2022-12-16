import Error from 'next/error';

const Err: React.FC<{ statusCode: number }> = ({ statusCode }) => {

  return (
    <>
      <div className="flex h-screen place-items-center justify-center">
        <span className="bold text-2xl pr-[20px] border-r mr-[20px] leading-[45px]">{statusCode}</span>
        <span>This page could not be found.</span>
      </div>
    </>
  );
}

export default Err;