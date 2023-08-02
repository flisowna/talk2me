import Link from 'next/link'
import Image from 'next/image';
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
        <Image
            src="/404_image.svg"
            alt="404 icon"
            width={150}
            height={150}
        />
      <Link href="/">Return Home</Link>
    </div>
  )
}