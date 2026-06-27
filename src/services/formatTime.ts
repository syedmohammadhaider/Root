export default function formatTime(time: number): string {
    const seconds = time % 60; 
        const minutes = Math.floor(time / 60) % 60; 
        const hours = Math.floor(time / 3600); 
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
} 