import AdminHeader from '@/components/AdminHeader'

export default async function GeneralLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  )
}
