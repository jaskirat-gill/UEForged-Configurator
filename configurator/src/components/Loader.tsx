import { LOGO } from "@/lib/data";

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center z-50">
            <div className="relative flex items-center justify-center mb-4">
                <div className="absolute w-64 h-64 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <img src={LOGO} alt="Logo" className="relative" />
            </div>
            <p className="mt-4 text-yellow-500">Loading...</p>
        </div>
    )
}

export default Loader;