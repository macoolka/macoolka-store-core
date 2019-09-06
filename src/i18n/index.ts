import en from './en.json'
import zh from './zh.json'
import buildApp, { MessageInfo, MonidI18N } from 'macoolka-i18n'
import { notEmpty } from 'macoolka-predicate'
import { FileWhereUniqueInput } from '../MonadFileStore'

export const defaultOption = {
    defaultLanguage: 'en',
    locale: 'en',
    languages: ['en', 'zh'],
    data: {
        en,
        zh
    }
}
export type Message = MessageInfo<keyof typeof defaultOption.data.en, {
    container?: string,
    folders?: string,
    name: string
}>

export const buildI18N = buildApp<Message>(defaultOption)
export default buildI18N

export const folderNotExist = ({ folders = [], name, container }: FileWhereUniqueInput): MonidI18N => {
    folders.push(name)
    const result = folders.filter(notEmpty)
    return buildI18N({
        id: 'macoolka.fs.folderNotExist',
        value: {
            name: result.join('/'),
            container: container,
        }
    })
}
export const fileNotExist = ({ folders = [], name, container }: FileWhereUniqueInput): MonidI18N => {
    const result = folders.filter(notEmpty)
    return buildI18N({
        id: 'macoolka.fs.fileNotExist',
        value: {
            name: name,
            container: container,
            folders: result.join('/'),
        }
    })
}
export const containerNotExist = (name:string): MonidI18N => {
    return buildI18N({
        id: 'macoolka.fs.containerNotExist',
        value: {
            name: name,
           
        }
    })
}