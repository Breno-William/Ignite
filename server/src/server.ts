import express from 'express'
import { PrismaClient } from '@prisma/client'
import { convertHourStringMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinuteToHourString } from './utils/convert-minutes-to-hour-string'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (request, response) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.status(201).json(games)
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const body = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringMinutes(body.hourStart),
      hourEnd: convertHourStringMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel

    }
  })

  return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.status(201).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHourString(ad.hourStart),
      hourEnd: convertMinuteToHourString(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return response.json({
    discord: ad.discord
  })
})

app.listen(3333, () => console.log('🚀 Server running'))