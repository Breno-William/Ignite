import logoImg from './assets/logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className='flex flex-col max-w-[1344px] items-center mx-auto m-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-10'>
        Seu <span className='bg-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title} 
              bannerUrl={game.bannerUrl} 
              adsCounts={game._count.ads}/>
          )
        })}          
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

