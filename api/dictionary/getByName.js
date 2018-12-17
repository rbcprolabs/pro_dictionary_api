import DictionaryModel from 'model/dictionary'
import mapper from 'utils/mapper'
import CustomError, {
  CODE as ERROR,
} from 'utils/custom-error'
import { AttributePath } from '@aws/dynamodb-expressions/build/AttributePath'

/**
 * @param {string} name
 */
export default async function getByName(name) {
  let dictionaryModel
  const scan = mapper.scan(DictionaryModel, {
    filter: {
      type: 'Equals',
      subject: new AttributePath('name'),
      object: name,
    },
  })
  for await (const item of scan)
    dictionaryModel = item

  if (!dictionaryModel)
    throw new CustomError(ERROR.NOT_EXIST, `Dictionary "${name}" does not exist`)

  return dictionaryModel
}
