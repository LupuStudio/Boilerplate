import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <main className='flex gap-2'>
      <Link href={"/"}>Home Page</Link>
      <Link className='underline' href={"/protected"} prefetch={false}>Protected</Link>

      <Link className='underline' href={"/isr"}>isr</Link>
      <Link className='underline' href={"/ssg"}>ssg</Link>

      <Link className='underline' href={"/user"}>Users</Link>
    </main>
  )
}
