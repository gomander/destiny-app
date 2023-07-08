import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { CreateGroupData } from '../types'
import { createGroup, getGroup } from '../services/groups-service'

export const show = async (req: Request, res: Response) => {
  try {
    const data = await getGroup(req.params.groupId.toLowerCase())
    if (!data) {
      return res.status(404).send({
        status: 'error',
        data: { error: 'not found' }
      })
    }
    res.send({
      status: 'success',
      data
    })
  } catch (error: any) {
    res.status(500).send({
      status: 'error',
      data: { error }
    })
  }
}

export const store = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: 'error',
			data: { error: validationErrors.array() }
		})
	}
  try {
    const validData = matchedData(req) as CreateGroupData
    const data = await createGroup(validData)
    res.send({
      status: 'success',
      data
    })
  } catch (error: any) {
    res.status(500).send({
      status: 'error',
      data: { error }
    })
  }
}