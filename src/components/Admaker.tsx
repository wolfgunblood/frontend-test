import React from 'react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Trash2, Wand } from 'lucide-react';
import Modal from './Modal';
import Image from 'next/image';
import { useAdStore, useVideoStore } from 'store/useStore';
import { EditForm } from './Editform';


const badgeStyles: Record<string, { backgroundColor: string; color: string }> = {
    auto: { backgroundColor: '#BBF7D0', color: '#166534' },
    static: { backgroundColor: '#BFDBFE', color: '#1E40AF' },
    "ab": { backgroundColor: '#FED7AA', color: '#9A3412' }
};
const formatMarkerType = (type: string) => {
    switch (type.toUpperCase()) {
        case 'AUTO':
            return 'Auto';
        case 'STATIC':
            return 'Static';
        case 'AB':
            return 'A/B';
        default:
            return type;
    }
};


function convertSecondsToHHMMSS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.round(seconds % 60);

    if (remainingSeconds === 60) {
        remainingSeconds = 0;
        minutes += 1;
    }

    const roundedMinutes = Math.round(minutes);
    const roundedHours = Math.round(hours + roundedMinutes / 60);

    return `${String(roundedHours).padStart(2, '0')}:${String(roundedMinutes % 60).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const Admaker = () => {


    // const items = [
    //     { id: 1, type: 'auto', timestamp: '00:00:00' },
    //     { id: 2, type: 'static', timestamp: '00:05:00' },
    //     { id: 3, type: 'AB', timestamp: '00:10:00' },
    // ];
    const { markers, deleteMarker } = useAdStore();

    return (
        <div className=" h-[552px] p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className='flex flex-col gap-4'>
                <div className="flex justify-between">
                    <h2 className="text-base text-zinc-800 font-bold font-manrope">Admakers</h2>
                    <p className="text-base text-zinc-500 font-semibold font-manrope">3 markers</p>
                </div>

                <div className=' max-h-72 overflow-y-auto pr-4'>
                    <ol className="flex flex-col gap-4">
                        {markers.map((marker, index) => (
                            <li key={index} className="flex items-center justify-between gap-4 w-full max-w-2xl mx-auto">
                                <span className='text-base text-zinc-500 font-semibold font-manrope'>{index + 1}</span>
                                <div className='flex items-center gap-4 border border-zinc-200 rounded-lg py-3 px-4 shadow-sm flex-grow justify-between'>
                                    <span className='text-base text-zinc-800 font-semibold font-manrope'>{convertSecondsToHHMMSS(marker.time)}</span>
                                    <Badge style={{
                                        backgroundColor: badgeStyles[marker.type.toLowerCase()]?.backgroundColor,
                                        color: badgeStyles[marker.type.toLowerCase()]?.color
                                    }}>
                                        <span className='text-xs font-semibold font-manrope'>
                                            {formatMarkerType(marker.type)}
                                        </span>
                                    </Badge>
                                    <EditForm index={index} />
                                    <Button variant="trash" size="sm" className='flex items-center justify-center' onClick={() => deleteMarker(index)}>

                                        <Trash2 size={16} color='#7F1D1D' />
                                    </Button>

                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4">
                <Modal />
                <Button className="text-sm font-semibold font-manrope inline-flex gap-2 items-center" variant="outline">
                    Automatically Place
                    {" "}
                    <Wand size={16} />
                </Button>
            </div>
        </div>
    );
}

export default Admaker;
