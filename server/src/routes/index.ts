import express from 'express'
import groups from './groups-router.ts'

const router = express.Router()

router.get('/api', (_req, res) => {
	res.send({
		status: 'success',
    data: 'OK'
	})
})

router.use('/api/groups', groups)

export default router
