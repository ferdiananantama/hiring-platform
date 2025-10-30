
export default function SkeletonJobList() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-gray-200 animate-pulse p-4 rounded-lg shadow">
                    <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded mb-2"></div>
                    <div className="flex justify-between mb-4">
                        <div className="w-24 h-4 bg-gray-300 rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}