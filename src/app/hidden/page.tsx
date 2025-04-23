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

    const text = `神回到了塔可拉島。祂感念你們救贖了這座島嶼，贈與你們一人一個十米高的黃金雕像。鬍嗑船長瞠目結舌，但因為感謝你們解放了這座島讓他能夠離開，他毅然決然決定載你們回去。到了旅人故鄉的島嶼(絕對沒有海關這種東西)你們用一點黃金換了一間大房子，房子的周圍擺著你們的雕像。
於是你們過著幸福快樂的生活，躺著就可以過完餘生。
多年以後，突然空氣中飄出一個聲音，是一個甜美的女聲，隨後是一個似曾相似的船夫的聲音。
「塔可拉島已然至善至美，多虧了你們，因此神決定讓你們無限次來這裡度假，當然，這座島很隱密，所以只有你們能來，至於通關密語––」
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
                    <h1 className="text-2xl">2025 建北電資聯合春遊 RPG 隱藏結局!</h1>
                    <h2 className="text-lg text-gray-400 mt-2">春眠不覺曉，電資樂逍遙</h2>
                    <h3 className="text-md text-gray-500 mt-2">破解時間：{crackTime}</h3>
                    <pre className="mt-8 p-4 rounded-xl border border-gray-600 whitespace-pre-wrap">{text}
<br></br>
 <h2 className="text-lg text-gray-400 mt-0">春眠不覺曉，電資樂逍遙</h2>
						</pre>
                    <div className=' w-full  text-right mt-3 pr-1'>
                        <Link className="text-gray-500 text-base underline" href="/?auto=1">首頁</Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HiddenPage;
