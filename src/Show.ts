/**
 * Show in File Store
 * @file
 */
import { Show } from 'fp-ts/lib/Show'
import {FileWhereUniqueInput,ContainerWhereUniqueInput,Container} from './MonadFileStore'
import * as path from 'path'
/**
 * `Show` about FileLike
 * @desczh
 * 文件对象`Show`
 * @since 0.2.0
 */
export const showFile: Show<Partial<FileWhereUniqueInput>> = {
    show: a => fileToPath(a)
}
/**
 * `Show` about Container
 * @desczh
 * 容器对象`Show`
 * @since 0.2.0
 */
export const showContainer: Show<Container> = {
    show: a => a.name
}
const fileToPath = (a: Partial<FileWhereUniqueInput>) => {
    return path.join(a.container ? a.container : '', (a.folders ? a.folders : []).join(path.sep), a.name ? a.name : '')
}
/**
 * Covert a path to FileWhereUniqueInput
 * @since 0.2.0
 */
export const pathToFile = (container: string) => (a: string): FileWhereUniqueInput => {
    const _path = path.relative(container, a)
    const pathO = path.parse(_path)
    return {
        container,
        folders: pathO.dir.split(path.sep),
        name: pathO.base
    }
}
/**
 * Covert a ContainerWhereUniqueInput to path
 * @since 0.2.0
 */
export const containerToPath = (root: string) => (a: Partial<ContainerWhereUniqueInput>) => {
    return path.join(root, a.name ? a.name : '')
}