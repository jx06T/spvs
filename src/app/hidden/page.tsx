import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/utils/auth';  // Correct path to authOptions
import { Session } from 'next-auth';
import { FaceWhitOpenMouth } from '../utils/Icons';
import Link from 'next/link';

interface CustomSession extends Session {
    user: {
        id: string;
        name?: string;
        email?: string;
        image?: string;
        timestamp: number;
        status: string;
    };
}

const HiddenPage = async () => {
    const session = await getServerSession(authOptions);

    const text = `可能會有一些東西在這裡
或是沒有
我也不知道
不要問我
再多加一些字好了
字字字字字字字字字字字字字字字字字字字字字字字字字字
`;

    if (!session) {
        return (
            <div className="w-full px-2">
                <h1 className="text-xl text-gray-400 mt-2">你還不該來到這的...</h1>
                <h1 className="text-xl text-gray-400 mt-2">當然...</h1>
                <h1 className="text-xl text-gray-400 mt-2">你啥都看不到？！</h1>
                <Link className="text-lg bg-gray-400 px-4 py-3 rounded-xl block w-30 mt-6" href="/?auto=1">
                    回去吧
                    <FaceWhitOpenMouth className="inline-block ml-3 text-xl -mt-0.5" />
                </Link>
            </div>
        );
    }

    const crackTime = new Date(session.user ? (session as CustomSession).user.timestamp : "").toLocaleString(
        "zh-TW",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }
    );

    return (
        <div className="relative w-full h-full">
            <div className="px-[2%] sm:px-[18%] w-full h-full flex flex-col justify-center">
                <main className="w-full text-center pb-20">
                    <h1 className="text-2xl">2025 建北電資聯合春遊 RPG 隱藏結局？</h1>
                    <h2 className="text-lg text-gray-400 mt-2">嗯嗯這就是隱藏結局</h2>
                    <h3 className="text-md text-gray-500 mt-2">破解時間：{crackTime}</h3>
                    <pre className="mt-8 p-4 rounded-xl border border-gray-600 whitespace-pre-wrap">{text}</pre>
                    <div className=' w-full  text-right mt-3 pr-1'>
                        <Link className="text-gray-500 text-base underline" href="/?auto=1">首頁</Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HiddenPage;
