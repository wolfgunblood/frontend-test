export const DisplayTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const formattedHours = h < 10 ? '0' + h : h;
    const formattedMinutes = m < 10 ? '0' + m : m;
    const formattedSeconds = s < 10 ? '0' + s : s;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};


const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);  
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
};

// export const generateTimeLabels = (duration :number) => {
//     const interval = 10;
//     const timeLabels = [];
//     for (let time = 0; time <= duration; time += interval) {
//         timeLabels.push(formatTime(time));
//     }
//     return timeLabels;
// };

export function generateTimeLabels(duration : number) {
    const labels = [];
    for (let i = 0; i <= duration; i += 10) { 
        const hours = Math.floor(i / 3600);
        const minutes = Math.floor((i % 3600) / 60);
        const seconds = i % 60;
        const formattedTime = [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
        labels.push(formattedTime);
    }
    return labels;
}

export function convertSecondsToHHMMSS(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (remainingSeconds === 60) {
        minutes += 1;
    }

    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
