import { FC } from 'react'

const Skeleton: FC<{ withoutHeader?: boolean, formSkeleton?: boolean }> = ({ withoutHeader, formSkeleton }) => {
  return (
    <div role="status" className="h-screen w-full space-y-8 animate-pulse m">
      {!withoutHeader && <div className='flex-between mt-[20px]'>
        <div className='mt-[20px]'>
          <div className='w-[200px] h-[50px] bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
        </div>
        <div className='mt-[20px] bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5'>
          <div className='w-[270px] h-[70px] bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
        </div>
        <div className='mt-[20px] bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5'>
          <div className='w-[250px] h-[65px] bg-gray-200 rounded-lg dark:bg-gray-700 max-w-full mb-2.5' />
        </div>
      </div>}
      <div className={`${formSkeleton ? 'flex-center' : 'flex-column-center'} h-full w-full`}>
        {formSkeleton ? (<div className='h-[340px] bg-gray-200 rounded-lg dark:bg-gray-700 w-[300px] mb-2.5' />) : (
          <>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-[100px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
          </>
        )}
      </div>
    </div>


  )
}

export default Skeleton;
