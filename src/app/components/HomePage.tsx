'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useAnimation } from '@/app/context/AnimationContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { MynauiSendSolid, LineiconsPointerTop } from '@/app/utils/Icons';
import Loader from '@/app/components/Loader';




const HomeContent = () => {
  const [password, setPassword] = useState('');
  const [overlayActive, setOverlayActive] = useState(0);
  const [verifying, setVerifying] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const auto = searchParams.get('auto');
  const { triggerFallingFaces } = useAnimation();

  useEffect(() => {
    if (auto === '1') {
      handleOverlayClick();
    }
  }, [auto]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setVerifying(true)
    setPassword("");
    e.preventDefault();
    const result = await signIn('credentials', {
      password,
      redirect: false,
      callbackUrl: '/hidden',
    });

    setVerifying(false)
    if (result?.ok) {
      triggerFallingFaces(true);
      setTimeout(() => {
        router.push('/hidden');
      }, 1500);
    } else {
      triggerFallingFaces(false);
      console.log(result)
    }
  };

  const handleOverlayClick = () => {
    setOverlayActive(1);
    setTimeout(() => {
      setOverlayActive(2);
    }, 1000);
  };


  return (
    <>
      <h1 className="text-2xl">2025 建北電資聯合春遊 RPG 隱藏結局？</h1>
      <h2 className="text-lg text-gray-400 mt-2">猜猜看這要做啥</h2>

      <form
        className="mt-4 flex justify-center text-gray-950"
        style={{
          opacity: overlayActive == 0 ? 0.3 : 1,
          transform: overlayActive !== 2 ? "scale(0.5)" : "scale(1)",
          animation: overlayActive == 0 ? 'none' : 'showInput 1s forwards'
        }}
        onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="輸入你找到的東西"
          className="h-14 bg-gray-100 outline-none py-3 text-lg px-4 my-4 rounded-l-md shrink w-full"
        />
        <button
          className="h-14 cursor-pointer bg-gray-100 py-3 my-4 min-w-14 shrink-0 rounded-r-md border-l border-white active:bg-gray-300 origin-left active:scale-95 transition-all duration-100"
          type="submit"
        >
          {
            verifying ?
              <Loader color='#171717' className='inline-block -mb-1 h-[27px] w-[27px]' /> :
              <MynauiSendSolid className="text-3xl inline-block -mt-0.5 h-8 hover:text-2xl" />
          }
        </button>
      </form>
      {
        overlayActive < 2 &&
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 transition-opacity duration-500"
          onClick={handleOverlayClick}
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 0%, rgba(0, 0, 0, 1) 20%, black 80%)',
            animation: overlayActive == 0 ? 'none' : 'shrinkOverlay 1s forwards'
          }}
        >
          <div style={{ animation: overlayActive == 0 ? "breathe 3s infinite" : "hidePointer .2s forwards" }}><LineiconsPointerTop className=' text-3xl ' /></div>
        </div>
      }
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="relative w-full h-full overflow-hidden">
        <div className="px-[2%] sm:px-[18%] w-full h-full flex flex-col justify-center">
          <Loader color='#171717' className='inline-block -mb-1 h-32 w-32' /> :
          <div className=' text-lg'>Loading...</div>
        </div>
      </div>}>
      <HomeContent />
    </Suspense>
  );
}