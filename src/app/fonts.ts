import localFont from 'next/font/local'
import { Source_Code_Pro } from 'next/font/google'


export const source_code_pro = Source_Code_Pro({ subsets: ['latin'] })

export const stag = localFont({
  src: [
    {
      path: '../../public/fonts/stag-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/stag-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/stag-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})

// export const source_code_pro = Source_Code_Pro({ subsets: ['latin'] })

