import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { Student } from '@/backend';

export function useGetStudents() {
  const { actor, isFetching } = useActor();

  return useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStudent(studentId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Student | null>({
    queryKey: ['student', studentId],
    queryFn: async () => {
      if (!actor || !studentId) return null;
      return actor.getStudent(BigInt(studentId));
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useCreateStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, pin }: { name: string; pin: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createStudent(name, pin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useLoginStudent() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ id, pin }: { id: bigint; pin: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.loginStudent(id, pin);
    },
  });
}

export function useMarkFeePaid() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, month, paid }: { id: bigint; month: bigint; paid: boolean }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markFeePaid(id, month, paid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });
    },
  });
}
