import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/utils/auth';
import { Session } from 'next-auth';
import { FaceWhitOpenMouth } from '@/app/utils/Icons';
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
    const sessionData = await getServerSession(authOptions);

    const text = `可能會有一些東西在這裡
或是沒有
我也不知道
不要問我
再多加一些字好了
字字字字字字字字字字字字字字字字字字字字字字字字字字
`;

    if (!sessionData) {
        return (
            <div className="relative w-full px-4 md:px-6 pt-4">
                <h1 className="text-xl text-gray-400 mt-2">：你還不該來到這的...</h1>
                <h1 className="text-xl text-gray-400 mt-2">：當然你啥都看不到！</h1>
                <h1 className="text-xl text-gray-400 mt-2">：回去找東西吧</h1>
                <Link className="text-lg bg-gray-600 px-4 py-1 rounded-xl block w-30 mt-4 ml-5" href="/?auto=1">
                    回首頁
                    <FaceWhitOpenMouth className="inline-block ml-3 text-xl -mt-0.5" />
                </Link>
            </div>
        );
    }

    const crackTime = new Date(sessionData.user ? (sessionData as CustomSession).user.timestamp : "").toLocaleString(
        "zh-TW",
        {
            timeZone: "Asia/Taipei", 
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
            <div className="px-[2%] sm:px-[18%] mt-[36%] sm:mt-[8%] md:mt-[10%] w-full h-full">
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
