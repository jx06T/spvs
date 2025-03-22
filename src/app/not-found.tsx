import Link from 'next/link';
import { FaceWhitOpenMouth } from '@/app/utils/Icons';

const NotFoundPage = () => {
    return (
        <div className="relative w-full  px-4 md:px-6 pt-4">
            <h1 className="text-xl text-gray-400 mt-2">： 4 0 4 . . .</h1>
            <h1 className="text-xl text-gray-400 mt-2">：你迷路了哈哈</h1>
            <h1 className="text-xl text-gray-400 mt-2">：下面是回去的路</h1>
            <Link className="text-lg bg-gray-600 px-4 py-1 rounded-xl block w-30 mt-4 ml-5" href="/?auto=1">
                回首頁
                <FaceWhitOpenMouth className="inline-block ml-3 text-xl -mt-0.5" />
            </Link>
        </div>
    );

};

export default NotFoundPage;
