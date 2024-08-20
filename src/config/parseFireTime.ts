export default function parseFireTime(date: { seconds: number }){
    return new Date(date?.seconds*1000)
}