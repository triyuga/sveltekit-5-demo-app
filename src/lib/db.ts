import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { type SignUpForm, type TypesOfDeathData } from './models'
// import { v4 as uuidv4 } from 'uuid'

type Data = {
	users: SignUpForm[]
	deathReports: TypesOfDeathData[]
}

const file = join(process.cwd(), 'db.json')
const adapter = new JSONFile<Data>(file)
const defaultData = {
	users: [],
	deathReports: []
}
const db = new Low<Data>(adapter, defaultData)

async function initDB() {
	await db.read()
	db.data ||= defaultData
	await db.write()
}

initDB()

export default db
