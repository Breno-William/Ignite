import { Check, GameController } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: string,
  title: string,

}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChennel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {

    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChennel
      })

      alert("Anúncio criado com sucesso")
    } catch (err) {
      console.log(err)
      alert("Erro ao criar o anúncio")
    }

  } 


  return (
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content aria-describedby={undefined} className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/35'>
            <Dialog.Title className='text-2xl font-black'>Publique um anúncio</Dialog.Title>

            <form onSubmit={handleCreateAd} action="" className='space-y-4 mt-8'>
              <div className='flex flex-col space-y-2'>
                <label htmlFor="game">Qual o game?</label>
                <select name="game" id='game' className='bg-zinc-900 px-4 py-3 text-sm rounded appearance-none' defaultValue=''>
                  <option value="" disabled className="text-zinc-500">Selecione o game que deseja jogar</option>

                  {games.map(game => {
                    return (
                      <option key={game.id} value={game.id}>{game.title}</option>
                    )
                  })}

                </select>
              </div>

              <div className='flex flex-col space-y-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <input name="name" id='name' type="text" className='bg-zinc-900 px-4 py-3 text-sm rounded' placeholder='Como te chamam dentro do game?'/>
              </div>

              <div className='flex flex-row'>
                <div className='space-y-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <input name="yearsPlaying" id='yearsPlaying' className='bg-zinc-900 px-4 py-3 text-sm max-w-48 rounded' placeholder='Tudo bem ser ZERO'/>

                </div>

                <div className='space-y-2'>
                  <label htmlFor="discord">Qual seu discord?</label>
                  <input name="discord" id='discord' className='bg-zinc-900 px-4 py-3 text-sm max-w-48 rounded' placeholder='Usuario#0000'/>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <ToggleGroup.Root 
                    type="multiple" 
                    className='grid grid-cols-4 gap-1'
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item value="0" title='Domingo' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                    <ToggleGroup.Item value="1" title='Segunda' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value="2" title='Terça' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                    <ToggleGroup.Item value="3" title='Quarta' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value="4" title='Quinta' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                    <ToggleGroup.Item value="5" title='Sexta' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    <ToggleGroup.Item value="6" title='Sábado' className={`px-3 py-[7px] rounded text-sm ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                  </ToggleGroup.Root>

                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual o horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <input className='bg-zinc-900 px-3 py-[7px] text-sm rounded' name="hourStart" id='hourStart' type="time" placeholder='De'/>
                    <input className='bg-zinc-900 px-3 py-[7px] text-sm rounded' name='hourEnd' id='hourEnd' type="time" placeholder='Até'/>
                  </div>
                </div>
              </div>

              <label className='flex gap-2 items-center mt-2'>
                <Checkbox.Root 
                checked={useVoiceChennel}
                onCheckedChange={(checked) => {
                  if (checked == true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }} className="w-6 h-6 rounded bg-zinc-900 p-1">
                  <Checkbox.Indicator >
                    <Check className="w-4 h-4 text-emerald-400"/>
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo de conectar ao chat de voz
              </label>

              <footer className='flex justify-end gap-4 pt-4'>
                <Dialog.Close className='bg-zinc-500 rounded-md px-5 py-3 hover:bg-zinc-600 font-semibold'>Cancelar</Dialog.Close>
                <button type='submit' className='flex bg-violet-500 rounded-md px-5 py-3 gap-3 items-center hover:bg-violet-600 font-semibold'>
                  <GameController size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>

          </Dialog.Content>
        </Dialog.Portal>

  )
}