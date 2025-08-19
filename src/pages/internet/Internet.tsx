import { useNetworkState } from '@uidotdev/usehooks';
import { memo } from 'react';

const Internet = () => {
    const { online } = useNetworkState();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 dark:bg-slate-800">
            {online ? (
                <div className="px-6 py-4 bg-green-500 text-white rounded-md shadow-lg text-lg font-semibold">
                    Siz onlaynsiz
                </div>
            ) : (
                <div className="px-6 py-4 bg-red-500 text-white rounded-md shadow-lg text-lg font-semibold">
                    Siz offlaynsiz
                </div>
            )}
        </div>
    );
};

export default memo(Internet);
