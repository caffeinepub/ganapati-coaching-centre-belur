import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, LogIn, LogOut } from 'lucide-react';
import { useLoginStudent, useGetStudent } from './queries';
import MonthStatusCard from './MonthStatusCard';
import { getPhoneFromStore } from './phoneStore';

export default function StudentPanel() {
  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [loggedInStudentId, setLoggedInStudentId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState('');

  const loginStudent = useLoginStudent();
  const { data: student, isLoading: loadingStudent } = useGetStudent(loggedInStudentId);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!studentId.trim() || !pin.trim()) {
      setLoginError('Please enter both Student ID and PIN');
      return;
    }

    const pinNumber = parseInt(pin, 10);
    if (isNaN(pinNumber)) {
      setLoginError('Invalid PIN format');
      return;
    }

    try {
      const success = await loginStudent.mutateAsync({
        id: BigInt(studentId),
        pin: BigInt(pinNumber),
      });

      if (success) {
        setLoggedInStudentId(studentId);
        setPin('');
      } else {
        setLoginError('Invalid Student ID or PIN');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedInStudentId(null);
    setStudentId('');
    setPin('');
    setLoginError('');
  };

  if (loggedInStudentId && student) {
    const storedPhone = getPhoneFromStore(student.id.toString());

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Welcome, {student.name}!</CardTitle>
              <CardDescription>View your monthly fee payment status</CardDescription>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
            <p className="text-sm text-muted-foreground">Phone: {storedPhone || 'N/A'}</p>
            <p className="text-sm text-muted-foreground">Student ID: {student.id.toString()}</p>
          </div>

          <MonthStatusCard fees={student.fees} readOnly={true} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Student Login
        </CardTitle>
        <CardDescription>Enter your Student ID and PIN to view your fee status</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <Input
              id="student-id"
              placeholder="Enter your Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-pin">PIN</Label>
            <Input
              id="student-pin"
              type="password"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loginStudent.isPending} className="w-full">
            {loginStudent.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
            )}
          </Button>
        </form>

        {loginError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        {loadingStudent && (
          <div className="flex items-center justify-center py-8 mt-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
