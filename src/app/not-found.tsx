import Link from 'next/link'
import Image from 'next/image';
 
export default function NotFound() {
  return (
    <div className='flex flex-col mx-auto justify-center items-center h-screen'>
      <h2>404</h2>
      <Image
            src="/404_image.svg"
            alt="404 icon"
            width={300}
            height={300}
        />
      <p className='text-bold my-4'>Oops, the page you requested could not be found.</p>
        
      <Link href="/">
        <button className='text-black mt-4'>Zum Spiel</button></Link>
    </div>
  )
}