import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkeletonListUser(props : { index : number}) {
    return (
        <Card key={props.index} className="border py-5 bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start gap-3">
                        {/* Skeleton for Logo */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                          <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-lg" />
                        </div>
                        {/* Skeleton for Job Title and Company Name */}
                        <div className="flex-1 min-w-0">
                          <div className="w-36 h-4 bg-gray-300 animate-pulse rounded-md mb-2" />
                          <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Skeleton for Location */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
                        <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md" />
                      </div>
                      {/* Skeleton for Salary/Started Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
                        <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md" />
                      </div>
            </CardContent>
        </Card>
    )
}