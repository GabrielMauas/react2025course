import Head from 'next/head'
import { useAuth } from '@/lib/auth';
import useSWR from 'swr'
import fetcher from '@/utils/fetcher';

import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { data } = useSWR('/api/sites', fetcher)

//   console.log(data.sites);

  if(!data) {
      return (
        <DashboardShell>
            <SiteTableSkeleton />
        </DashboardShell>
      )
  }

  return (
    <DashboardShell>
        { data.sites ? <SiteTable sites={data.sites} /> : <EmptyState /> }
    </DashboardShell>
  )


}
