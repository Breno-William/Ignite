interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCounts: number;
}


export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative'>
      <img src={props.bannerUrl} alt=""  className="rounded-lg"/>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient flex flex-col absolute bottom-0 left-0 right-0 rounded-b-lg'>
        <strong className='font-bold text-white'>{props.title}</strong>
        <span className='text-zinc-300 text-sm'>{props.adsCounts} anúncios(s)</span>
      </div>
    </a>
  )
}