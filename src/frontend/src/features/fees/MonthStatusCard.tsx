import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { MONTHS } from './months';

interface MonthStatusCardProps {
  fees: boolean[];
  onToggle?: (monthIndex: number) => void;
  isUpdating?: boolean;
  readOnly?: boolean;
}

export default function MonthStatusCard({ fees, onToggle, isUpdating = false, readOnly = false }: MonthStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monthly Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {MONTHS.map((month, index) => {
            const isPaid = fees[index];
            
            if (readOnly) {
              return (
                <div
                  key={month}
                  className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
                >
                  <span className="text-sm font-medium">{month}</span>
                  <Badge variant={isPaid ? 'default' : 'secondary'}>
                    {isPaid ? 'Paid' : 'Unpaid'}
                  </Badge>
                </div>
              );
            }

            return (
              <Button
                key={month}
                variant={isPaid ? 'default' : 'outline'}
                className="flex h-auto flex-col gap-2 p-3"
                onClick={() => onToggle?.(index)}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="text-sm font-medium">{month}</span>
                    <Badge variant={isPaid ? 'secondary' : 'outline'} className="text-xs">
                      {isPaid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </>
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
