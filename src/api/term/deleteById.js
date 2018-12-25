import mapper from 'utils/mapper'
import getByFullTerm from 'api/term/getByFullTerm'
import deleteAllByParent from 'api/term/deleteAllByParent'
import getById from 'api/term/getById'

/**
 * @param {string} id
 */
export default async function deleteById(id) {
  let termModel = await getById(id)

  // Remove all childs
  if (termModel.childrens)
    await deleteAllByParent(termModel.fullTerm)

  // Remove from parend prop `childrens` if term has parent
  try {
    const parent = await getByFullTerm(termModel.parent)
    if (parent.childrens.size === 1)
      delete parent.childrens
    else
      parent.childrens.delete(termModel.termLowCase)
    await mapper.update(parent)
  } catch (error) {
    // parent not exist, it is normally
  }

  return await mapper.delete(termModel)
}
