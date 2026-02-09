import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, UserPlus } from 'lucide-react';
import { useCreateStudent, useGetStudents, useMarkFeePaid } from './queries';
import MonthStatusCard from './MonthStatusCard';
import { getPhoneFromStore, savePhoneToStore } from './phoneStore';

export default function AdminPanel() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  const { data: students = [], isLoading: loadingStudents } = useGetStudents();
  const createStudent = useCreateStudent();
  const markFeePaid = useMarkFeePaid();

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!name.trim() || !phone.trim() || !pin.trim()) {
      return;
    }

    const pinNumber = parseInt(pin, 10);
    if (isNaN(pinNumber)) {
      return;
    }

    try {
      const studentId = await createStudent.mutateAsync({
        name: name.trim(),
        pin: BigInt(pinNumber),
      });

      // Save phone to local storage
      savePhoneToStore(studentId.toString(), phone.trim());

      setSuccessMessage(`Student "${name}" created successfully!`);
      setName('');
      setPhone('');
      setPin('');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const selectedStudent = students.find((s) => s.id.toString() === selectedStudentId);

  const handleToggleMonth = async (monthIndex: number) => {
    if (!selectedStudent) return;

    const currentStatus = selectedStudent.fees[monthIndex];
    await markFeePaid.mutateAsync({
      id: selectedStudent.id,
      month: BigInt(monthIndex),
      paid: !currentStatus,
    });
  };

  return (
    <div className="space-y-6">
      {/* Create Student Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Student
          </CardTitle>
          <CardDescription>Create a new student record with name, phone, and PIN</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateStudent} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  type="number"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={createStudent.isPending} className="w-full md:w-auto">
              {createStudent.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </>
              )}
            </Button>
          </form>

          {successMessage && (
            <Alert className="mt-4 border-primary bg-primary/10">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">{successMessage}</AlertDescription>
            </Alert>
          )}

          {createStudent.isError && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>Failed to create student. Please try again.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Manage Student Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Student Fees</CardTitle>
          <CardDescription>Select a student to view and update their monthly payment status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loadingStudents ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : students.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No students added yet. Create a student to get started.</p>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="student-select">Select Student</Label>
                <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                  <SelectTrigger id="student-select">
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => {
                      const storedPhone = getPhoneFromStore(student.id.toString());
                      return (
                        <SelectItem key={student.id.toString()} value={student.id.toString()}>
                          {student.name} {storedPhone ? `(${storedPhone})` : ''}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {selectedStudent && (
                <div className="space-y-4 pt-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-semibold text-lg mb-2">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Phone: {getPhoneFromStore(selectedStudent.id.toString()) || 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">Student ID: {selectedStudent.id.toString()}</p>
                  </div>

                  <MonthStatusCard
                    fees={selectedStudent.fees}
                    onToggle={handleToggleMonth}
                    isUpdating={markFeePaid.isPending}
                    readOnly={false}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
