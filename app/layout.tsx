import type { Metadata } from 'next'
import './globals.css'
export const metadata:Metadata={title:'Heartbeat, uptime with proof',description:'Website, API, TCP, and SSL monitoring.'}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
