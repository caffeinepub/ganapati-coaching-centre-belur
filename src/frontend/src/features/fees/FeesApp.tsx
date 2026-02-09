import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminPanel from './AdminPanel';
import StudentPanel from './StudentPanel';

export default function FeesApp() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Fee Tracking System</CardTitle>
        <CardDescription>Manage student fees and view payment status</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
            <TabsTrigger value="student">Student Login</TabsTrigger>
          </TabsList>
          <TabsContent value="admin" className="mt-6">
            <AdminPanel />
          </TabsContent>
          <TabsContent value="student" className="mt-6">
            <StudentPanel />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
