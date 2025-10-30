import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SkeletonDetailList() {
    return (
        <Card className="border">
                    <CardHeader className="border-b bg-muted/30">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                            <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-xl" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-sm" />
                            </div>
                            <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                            <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-sm"></div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md"></div>
                    </CardContent>
                  </Card>
    )
}