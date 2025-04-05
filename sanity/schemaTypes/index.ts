import { type SchemaTypeDefinition } from 'sanity'

import {startup} from './startup'
import {playlist} from './playlist'
import {author} from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [startup, playlist, author],
}
