import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

export default function Feedback() {
  const { currentUser } = useAuth();
  const { data } = useSWR(
    currentUser ? ['/api/feedback', currentUser.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
