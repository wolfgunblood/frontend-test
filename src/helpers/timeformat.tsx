
export const DisplayTime = (seconds :number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
};


const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);  
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
};

export const generateTimeLabels = (duration :number) => {
    const interval = 10;
    const timeLabels = [];
    for (let time = 0; time <= duration; time += interval) {
        timeLabels.push(formatTime(time));
    }
    return timeLabels;
};