import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/utils/auth';
import Link from 'next/link';
import HomePage from './components/HomePage';
import { SolarSquareAltArrowLeftOutline } from './utils/Icons';

const Home = async () => {
  const sessionData = await getServerSession(authOptions);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {sessionData &&
        <Link className=" left-2 top-2 absolute text-lg bg-gray-600 px-4 py-1 rounded-xl block w-32" href="/hidden">
          <SolarSquareAltArrowLeftOutline className=' inline-block mr-1 mb-1' />
          破解頁面
        </Link>
      }
      <div className="px-[2%] sm:px-[18%] w-full h-full flex flex-col justify-center">
        <main className="w-full text-center pb-20">
          <HomePage></HomePage>
        </main >
      </div >
    </div >
  )
}
export default Home