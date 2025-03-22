import { HTMLProps } from "react"

function Loader({ color = "#ffffff", className, ...other }: { color?: string, className?: string } & HTMLProps<HTMLDivElement>) {
    return (
        <div {...other} className={className + " inline-block relative z-20"} >
            <div className="absolute rounded-full opacity-60 w-full h-full" style={{ animation: "loader1 3s cubic-bezier(0.7, 0, 0.3, 1) infinite", backgroundColor: color }}></div>
            <div className="absolute rounded-full opacity-60 w-full h-full" style={{ animation: "loader2 3s cubic-bezier(0.7, 0, 0.3, 1) infinite", backgroundColor: color }}></div>
        </div >
    )
}

export default Loader