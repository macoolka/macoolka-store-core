import { readFileSync, statSync } from 'fs'
import { createReadStream } from 'fs'
import { Stream } from 'stream'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import { parse } from 'path'
import { glob } from 'macoolka-fs';
import * as path from 'path'
import { FileCreateInput } from '../MonadFileStore'
export type LocalFile = {
    localPath: string,
    size: number,
    path: string
}
export type File = {
    size: number
    path: string
    data: Stream | string | Buffer
}
export interface UploadFile extends FileCreateInput {
    size: number
}

//const root = __dirname + '/files'

const openFile = (type: 'string' | 'buffer' | 'stream') =>
    (path: string): Stream | string | Buffer => {
        switch (type) {
            case 'string':
                return readFileSync(path, 'utf8')
            case 'stream':
                return createReadStream(path)
            case 'buffer':
                return readFileSync(path)
        }
    }
export const bufferToString = (a: Buffer) => a.toString()
const getUploadStrem = (root: string, container: string) => (localPath: string): UploadFile[] => {
    const size = statSync(localPath).size;
    // const localPath,
    const parsePath = path.parse(path.relative(root, localPath))


    const _folders = parsePath.dir.split(path.sep)
    const name = parsePath.base
    const inits: UploadFile[] = [{
        // ...a,
        container,
        folders: ['stream', ..._folders],
        name,
        size: size,
        data: openFile('stream')(localPath)
    }, {
        container,
        folders: ['buffer', ..._folders],
        name,
        size,
        data: openFile('buffer')(localPath)
    }]

    return pipe(
        localPath,
        O.fromPredicate(isTxtFile),
        O.map(a =>
            A.snoc(inits, ({
                container,
                folders: ['string'],
                name,
                size,
                data: openFile('string')(localPath)
            }))
        ),
        O.getOrElse(() => inits)
    )

}

const isTxtFile = (filePath: string) => parse(filePath).ext === '.txt'
export const getFiles = (root: string) =>
    pipe(

        glob({path:root + '/**/*'}),
        A.map(getUploadStrem(root, root)),
        A.flatten
    )



