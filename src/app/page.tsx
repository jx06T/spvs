'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MynauiSendSolid, LineiconsPointerTop, FaceWhitOpenMouth } from './utils/Icons';

interface Face {
  x: number;
  y: number;
  vy: number;
  id: number;
  rotation: number;
}

export default function Home() {
  const [password, setPassword] = useState('');
  const [overlayActive, setOverlayActive] = useState(0);
  const [fallingFaces, setFallingFaces] = useState<Face[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const auto = searchParams.get('auto');
  const animationFrameId = useRef<number | null>(null);
  const lasttime = useRef<number>(Date.now());

  useEffect(() => {
    if (auto === '1') {
      handleOverlayClick();
    }
  }, [auto]);

  const addFallingFace = () => {
    const randomX = Math.floor(Math.random() * 80) + 10;

    const newFace = {
      id: Date.now(),
      x: randomX,
      y: -10,
      vy: 0.1,
      rotation: Math.random() * 360,
    };

    setFallingFaces(prev => [...prev, newFace]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      password,
      redirect: false,
      callbackUrl: '/hidden',
    });

    if (result?.ok) {
      router.push('/hidden');
    } else {
      setPassword("");
      for (let i = 0; i < 5; i++) {
        setTimeout(() => addFallingFace(), i * 100);
      }
    }
  };

  const handleOverlayClick = () => {
    setOverlayActive(1);
    setTimeout(() => {
      setOverlayActive(2);
    }, 1000);
  };

  useEffect(() => {
    if (fallingFaces.length === 0) return;

    const updateFaces = () => {
      setFallingFaces(prev =>
        prev
          .map(face => ({
            ...face,
            y: face.y + face.vy,
            vy: face.vy + 0.01 * (Date.now() - lasttime.current),
            rotation: face.rotation + 5,
          }))
          .filter(face => face.y < 700)
      );
      animationFrameId.current = requestAnimationFrame(updateFaces);
      lasttime.current = Date.now()
    };

    animationFrameId.current = requestAnimationFrame(updateFaces);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [fallingFaces.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="px-[2%] sm:px-[18%] w-full h-full flex flex-col justify-center">
        <main className="w-full text-center pb-20">
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
              className="bg-gray-100 outline-none py-3 text-lg px-4 my-4 rounded-l-md shrink w-full"
            />
            <button
              className="cursor-pointer bg-gray-100 py-3 my-4 min-w-14 shrink-0 rounded-r-md border-l border-white active:bg-gray-300 origin-left active:scale-95 transition-all duration-100"
              type="submit"
            >
              <MynauiSendSolid className="text-3xl inline-block pt-0.5 h-8 hover:text-2xl" />
            </button>
          </form>
        </main>
      </div>
      {fallingFaces.map(face => (
        <div
          key={face.id}
          className="absolute text-6xl z-20"
          style={{
            left: `${face.x}%`,
            top: `${face.y}%`,
            transform: `rotate(${face.rotation}deg)`,
          }}
        >
          <FaceWhitOpenMouth className='' />
        </div>
      ))}

      {overlayActive < 2 &&
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
    </div>
  );
}
