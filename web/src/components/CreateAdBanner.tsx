import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className='pt-px bg-gradient mt-8 rounded-lg'>
      <div className='bg-[#2A2634] py-6 px-8 w-[1344px] rounded-lg flex flex-row justify-between'>
        <div className=''>
          <strong className='text-2xl text-white font-black block'>Não encontrou o seu duo?</strong>
          <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <Dialog.Trigger className='bg-violet-500 hover:bg-violet-600 text-white px-4 py-3 rounded-md font-medium flex flex-row gap-3 items-center'>
          <MagnifyingGlassPlus size={24}/>
          <p>Publicar anúncio</p>
        </Dialog.Trigger>
      </div>
    </div>
  )
}