import express from 'express'
import { show, store } from '../controllers/groups-controller.ts'
import { createGroupRules } from '../rules/group-rules.ts'

const router = express.Router()

router.get('/:groupId', show)

router.post('/', createGroupRules, store)

export default router
