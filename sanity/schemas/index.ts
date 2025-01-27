// file for organising our schemas and putting them into an array which gets imported into the sanity.config.
import project from './project-schema'
import aboutPage from './about-page-schema'
import category from './category-schema'
import tier from './tier-schema'

const schemas = [project, aboutPage, category, tier]

export default schemas
