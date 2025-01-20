// file for organising our schemas and putting them into an array which gets imported into the sanity.config.
import project from './project-schema'
import page from './page-schema'
import category from './category-schema'
import tier from './tier-schema'

const schemas = [project, page, category, tier]

export default schemas
