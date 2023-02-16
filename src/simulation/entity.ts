import {uuid} from '~/utils/random'

export class Entity {
  health = 160
  name: string
  id: string

  constructor() {
    this.health = 100 + ((Math.random() * 20) | 0)
    this.name = uuid(4)
    this.id = uuid()
  }
}
