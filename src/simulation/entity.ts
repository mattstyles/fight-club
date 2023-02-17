import {uuid} from '~/utils/random'
import {d} from '~/utils/dice'

// export class Entity {
//   health = 160
//   name: string
//   id: string

//   constructor() {
//     this.health = 100 + ((Math.random() * 20) | 0)
//     this.name = uuid(4)
//     this.id = uuid()
//   }

//   someMethod() {
//     // Testing serialisation of the object into idb, going in is probably fine but coming out might be an issue
//     return 'some string from some method on the entity class'
//   }
// }

export type Entity = {
  health: number
  id: string
  name: string
}

export function create(): Entity {
  const id = uuid()
  return {
    health: d(1, 20, 100),
    name: id,
    id: id,
  }
}
