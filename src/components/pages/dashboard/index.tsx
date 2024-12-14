import { Card } from "@/components/ui/card";

import WideChart from "./wide-chart";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <Card className="py-2 px-4 border flex items-center justify-between rounded-lg">
        <span className="text-sm">status website</span>
        <div className="flex items-center gap-2">
          <div className="bg-green-500 h-2 w-2 flex rounded-full">
            <div className="bg-green-500 h-2 w-2 rounded-full animate-ping"></div>
          </div>
          <span className="text-xs">Active</span>
        </div>
      </Card>
      <WideChart />
    </div>
  );
}
