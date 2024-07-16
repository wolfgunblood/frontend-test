import React from 'react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Trash2, Wand } from 'lucide-react';
import Modal from './Modal';

const badgeStyles: Record<string, { backgroundColor: string; color: string }> = {
    auto: { backgroundColor: '#BBF7D0', color: '#166534' },
    static: { backgroundColor: '#BFDBFE', color: '#1E40AF' },
    "a/b": { backgroundColor: '#FED7AA', color: '#9A3412' }
};

const Admaker = () => {
    const items = [
        { id: 1, type: 'auto', timestamp: '00:00:00' },
        { id: 2, type: 'static', timestamp: '00:05:00' },
        { id: 3, type: 'A/B', timestamp: '00:10:00' },
    ];

    return (
        <div className="w-96 h-[552px] p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className='flex flex-col gap-4'>
                <div className="flex justify-between">
                    <h2 className="text-base text-zinc-800 font-bold font-manrope">Admakers</h2>
                    <p className="text-base text-zinc-500 font-semibold font-manrope">3 markers</p>
                </div>
                <ol className="flex flex-col gap-4">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-4 w-full">
                            <p className='text-base text-zinc-500 font-semibold font-manrope'>{item.id}</p>
                            <div className='flex items-center gap-4 border border-zinc-200 rounded-lg py-3 px-4 flex-grow justify-between'>
                                <p className='text-base text-zinc-800 font-semibold font-manrope'>{item.timestamp}</p>
                                <Badge style={{
                                    backgroundColor: badgeStyles[item.type.toLowerCase()]?.backgroundColor,
                                    color: badgeStyles[item.type.toLowerCase()]?.color
                                }}>
                                    {item.type}
                                </Badge>
                                <Button variant="outline" size="sm" className='text-sm text-secondary-foreground font-semibold font-manrope'>Edit</Button>
                                <Button variant="trash" size="sm" className='flex items-center'><Trash2 size={16} color='#7F1D1D' /></Button>

                            </div>
                        </li>
                    ))}
                </ol>
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
