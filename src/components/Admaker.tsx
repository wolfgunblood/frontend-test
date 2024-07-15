import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Trash2 } from 'lucide-react';


import Modal from './Modal';

const badgeColors: Record<string, string> = {
    auto: '#BBF7D0',  // Green
    static: '#2196F3', // Blue
    AB: '#795548'     // Brown
};


const Admaker = () => {
    const items = [
        { id: 1, type: 'auto', timestamp: '00:00:00' },
        { id: 2, type: 'static', timestamp: '00:05:00' },
        { id: 3, type: 'A/B', timestamp: '00:10:00' },
    ];

    return (
        <Card style={{
            width: '412px',  
            height: '552px', 
            padding: '32px', 
            borderRadius: '16px 0px 0px 0px', 
            // borderRight: '1px solid', 
        }}>
            <CardHeader>
                <CardTitle>Admakers</CardTitle>
                <CardDescription>Manage your ad markers</CardDescription>
            </CardHeader>
            <CardContent>
                <ol>
                    {items.map((item) => (
                        <li key={item.id}>
                            <div style={{ padding: '10px' }} className='flex gap-5 items-center justify-between'>
                                {item.id}
                                <Badge style={{ backgroundColor: badgeColors[item.type.toLowerCase()]! }}>
                                {item.type}
                                </Badge>
                                <div>{item.timestamp}</div>
                                <div className='inline-flex items-center gap-2'>
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="destructive" size="sm"><Trash2 /></Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </CardContent>
            <CardFooter className='w-full flex flex-col'>
                <Modal />
                <Button className='w-full' variant="secondary">Automatically Place</Button>
            </CardFooter>
        </Card>
    );
}

export default Admaker;
