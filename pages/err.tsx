import Error from 'next/error';
import React from 'react';

interface ErrPage { statusCode: number };

const Err: React.FC<ErrPage> = ({ statusCode }) => {

  return (
    <>
      <div className="flex h-screen place-items-center justify-center">
        <span className="bold text-2xl pr-[20px] border-r mr-[20px] leading-[45px]">{statusCode}</span>
        <span>This page could not be found.</span>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }): => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Err;