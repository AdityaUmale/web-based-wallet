import { Wallet } from "lucide-react"


function Header() {
  return (
    <div>
        <div className="flex items-center">
            <Wallet className="ml-10 w-8 h-8 mb-3"/>
        <h1 className="mb-8 text-sm font-extrabold text-gray-600 dark:text-white md:text-5xl lg:text-4xl ml-1 pl-1 pt-3 mt-2">Own<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Wallets</span><span className="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2 py-0 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">PRO</span></h1>
        </div>
        
    </div>
  )
}

export default Header