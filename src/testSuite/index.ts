import { MonadFileStore } from '../MonadFileStore'
import { parallel } from 'macoolka-app/lib/MonadNode'
import * as TE from 'fp-ts/lib/TaskEither'
import { randomString } from 'macoolka-random'
import { makeBy } from 'fp-ts/lib/Array'

import { getFiles } from './testFiles'
import * as E from 'fp-ts/lib/Either'
import { streamSize } from 'macoolka-stream'
import { pipe } from 'fp-ts/lib/pipeable'
export interface TestOption {
    providerName: string,
    largeSize: boolean,
    beforeTests?: () => void
    skipPresignedUrlTests?: boolean
    signedPutRequestHeaders?: Record<string, any>,
    root: string,
}

export default (store: MonadFileStore, option: TestOption) => {

    const { root } = option;
    const genContainerName = (prefix: string) => randomString({
        length: 8,
        charset: 'alphabetic',
        capitalization: 'lowercase',
        prefix
    })

    describe('Test suite for ' + option.providerName, function () {
        const containerCreateNames = makeBy(2, genContainerName('mk-'))
        //  const containerNewsNames = makeBy(2, genContainerName('mk-new-'))
        const addContainers: string[] = [];
        //   const addfiles: FileCreateInput[] = [];
        const container = containerCreateNames[0]
        const getfiles = () => getFiles(root).map(a => ({
            ...a,
            container,
        }))

        //  const smallFiles = testFiles(containerCreateNames[0])
        //  const addLargeFiles = largeFiles(containerCreateNames[0])
        //   const addFiles = smallFiles.concat(addLargeFiles)
        const files = getfiles()

        beforeAll(function () {
            if (option.beforeTests) {
                option.beforeTests()
            }
        })

        it('createContainer', async () => {

            // Create containers
            const result = pipe(
                parallel(
                    containerCreateNames.map(name => {
                        addContainers.push(name)
                        return pipe(
                            store.createContainer({ name }),

                            TE.map(a => {
                                expect(a.name).toEqual(name)
                                return a
                            })
                        )
                    })
                ),

                TE.chain(() => pipe(
                    //exist container
                    store.existContainer({ name: containerCreateNames[0] }),

                    TE.map(a => {
                        expect(a).toEqual(true)
                        return a
                    }),
                    TE.mapLeft(a => {
                        console.log(a({}))
                        return a
                    })
                )),
                TE.chain(() => pipe(
                    //containers 
                    store.containers(),

                    TE.map(a => {
                        for (const el of containerCreateNames) {
                            expect(a.map(b => b.name).includes(el)).toBeTruthy()
                        }
                        return a
                    }),
                    TE.mapLeft(a => {
                        console.log(a({}))
                        return a
                    })
                )),
                TE.chain(() => pipe(
                    //container
                    store.container({ name: containerCreateNames[0] }),

                    TE.map(a => {
                        expect(a).toEqual({ name: a.name })
                        return a
                    }),
                    TE.mapLeft(a => {
                        console.log(a({}))
                        return a
                    })
                )),
                TE.chain(() => pipe(
                    //updateContainer 
                    store.updateContainer({ data: { name: 'new' + containerCreateNames[0] }, where: { name: containerCreateNames[0] } }),

                    TE.map(a => {
                        expect(a.name).toEqual('new' + containerCreateNames[0])
                        return a
                    }),
                    TE.chain(() => store.existContainer({ name: 'new' + containerCreateNames[0] })),

                    TE.map(a => {
                        expect(a).toEqual(true)
                        return a
                    }),
                    TE.chain(() => {
                        return store.updateContainer({ data: { name: containerCreateNames[0] }, where: { name: 'new' + containerCreateNames[0] } })
                    }),
                    TE.mapLeft(a => {
                        console.log(a({}))
                        return a
                    })

                )),

                TE.chain(() => pipe(
                    //file 
                    files.map(file => {
                        //  addfiles.push(file)
                        return pipe(
                            file,
                            // createFile
                            store.createFile,
                            TE.map(a => {
                                expect(a.size === file.size).toBeTruthy()
                                expect(a.name === file.name).toBeTruthy()
                                expect(a.container === file.container).toBeTruthy()
                                expect(a.folders === file.folders).toBeTruthy()
                            }),
                            TE.mapLeft(a => {
                                console.log(a({}))
                                return a
                            }),
                            //file
                            TE.chain(() => pipe(
                                store.file(file),
                                TE.map(a => {
                                    expect(a.size === file.size).toBeTruthy()
                                    expect(a.name === file.name).toBeTruthy()
                                    expect(a.container === file.container).toBeTruthy()
                                    expect(a.folders === file.folders).toBeTruthy()
                                }),
                                TE.mapLeft(a => {
                                    console.log(a({}))
                                    return a
                                })
                            )),

                            //existFile
                            TE.chain(() => pipe(
                                store.existFile(file),
                                TE.map(a => {
                                    expect(a).toEqual(true)
                                    return a
                                }),
                                TE.mapLeft(a => {
                                    console.log(a({}))
                                    return a
                                })
                            )),

                            TE.chain(() => pipe(
                                store.fileStream(file),
                                TE.chain(a => TE.rightTask(streamSize(a))),
                                TE.map(size => expect(size).toEqual(file.size)),
                                TE.mapLeft(a => {
                                    console.log(a({}))
                                    return a
                                }),

                            )),
                            // as=>
                            //updateFile
                            TE.chain(_ => pipe(
                                store.updateFile(
                                    {
                                        data: { ...file, data: 'new' },
                                        where: file
                                    }),
                                TE.map(a => {
                                    expect(a.size === 3).toBeTruthy()
                                    expect(a.name === file.name).toBeTruthy()
                                    expect(a.container === file.container).toBeTruthy()
                                    expect(a.folders === file.folders).toBeTruthy()

                                }),
                                TE.mapLeft(a => {
                                    console.log(a({}))
                                    return a
                                })
                            )),

                            //readTextFile
                            TE.chain(() => pipe(
                                store.readTextFile(file),
                                TE.map(a => expect(a.data).toEqual('new')),
                                TE.mapLeft(a => {
                                    console.log(a({}))
                                    return a
                                })
                            )),
                            TE.mapLeft(a => {
                                console.log(a({}))
                                return a
                            })
                        )
                    }),
                    parallel,
                    //files
                    TE.chain(_ => {
                        const result = pipe(
                            store.files({ container }),
                            TE.map(a => {
                                expect(a.length).toEqual(files.length)
                            }),
                            TE.chain(() => store.files({ container, name_ends_with: '.txt' })),
                            TE.map(a => {
                                expect(a.length).toEqual(3)
                            }),
                            TE.chain(() => store.files({ container, name_not_ends_with: '.txt' })),
                            TE.map(a => {
                                expect(a.length).toEqual(4)
                            }),
                            TE.chain(() => store.files({ container, NOT: [{ name_ends_with: '.txt', }] })),
                            TE.map(a => {
                                expect(a.length).toEqual(4)
                            }),

                        )
                        return result
                    }),
                    //glob
                    TE.chain(_ => {
                        const result = pipe(
                            store.glob({ container, pattern: ['**/*'] }),
                            TE.map(a => {
                                expect(a.length).toEqual(files.length)
                            }),
                            TE.chain(() => store.glob({ container, pattern: ['**/*.txt'] })),
                            TE.map(a => {

                                expect(a.length).toEqual(3)

                            }),
                            TE.chain(() => store.glob({ container, pattern: ['**/*', '!**/*.txt'] })),
                            TE.map(a => {
                                expect(a.length).toEqual(files.length - 3)
                            }),

                        )
                        return result
                    }),
                    TE.chain(_ => {
                        const result = pipe(
                            store.folders({ container, folders: [] }),
                            TE.map(a => {
                                expect(a).toEqual({ folders: ['buffer', 'stream', 'string'], files: [] })
                            }),
                            TE.chain(() => store.folders({ container, folders: ['stream'] })),
                            TE.map(a => {

                                expect(a).toEqual({ folders: ['images', 'txt'], files: [] })

                            }),
                            TE.chain(() => store.folders({ container, folders: ['stream', 'txt'] })),
                            TE.map(a => {
                                expect({ folders: a.folders, files: a.files.map(b => b.name) }).toEqual({ folders: [], files: ['pg1008.txt'] })
                            }),

                        )
                        return result
                    }),
                )),
                TE.chain(_ => pipe(
                    //clearFolder
                    store.createContainer({ name: 'clear' }),
                    TE.chain(_ => store.createFile({ container: 'clear', folders: ['a'], name: 'a.txt', data: 'a.txt' })),
                    TE.chain(_ => store.clearFolder({ container: 'clear', folders: ['a'] })),
                   
                    TE.chain(_ => store.existFile({ container: 'clear', folders: ['a'], name: 'a.txt' })),
                    
                    TE.map(a => expect(a).toEqual(false)),
                    TE.chain(_ => store.deleteContainer({ name: 'clear' })),
                    TE.mapLeft(a=>{
                        console.log(`deleteContainer error:${a({})}`)
                        return a;
                    }),
                    TE.chain(_ => store.existContainer({ name: 'clear' })),
                    TE.map(a => expect(a).toEqual(false)),
                    TE.mapLeft(a=>{
                        console.log(a({}))
                        return a;
                    })
                )),
                TE.chain(_ => pipe(
                    //file 
                    files.map(file => {
                        //deleteFile
                        return pipe(
                            store.deleteFile(file),
                            TE.map(a => expect(a).toEqual(void 0)),
                            //existFile return false
                            TE.chain(() => pipe(
                                store.existFile(file),
                                TE.map(a => {
                                    expect(a).toEqual(false)
                                    return a
                                }),
                            )),

                        )
                    }),
                    parallel,
                )),
                TE.chain(() => pipe(
                    addContainers.map(name => {
                        return pipe(
                            store.deleteContainer({ name }),
                            TE.map(a => {
                                expect(a).toEqual(void 0)
                                return a
                            }),
                            TE.chain(() => pipe(
                                store.existContainer({ name }),
                                TE.map(result => expect(result).toEqual(false))
                            ))
                        )
                    }),
                    parallel
                )),
                TE.chain(() => pipe(
                    //exist container
                    store.existContainer({ name: containerCreateNames[0] }),
                    TE.map(a => {
                        expect(a).toEqual(false)
                        return a
                    })
                )),
             /*    TE.mapLeft(a => {
                    console.log(a({}))
                }) */
                // a => a(),
            )

            const as = await result();
            if(E.isLeft(as)){
                console.log(as.left({}))
            }
            expect(E.isRight(as)).toEqual(true)


        })


        it('deleteContainer', async function () {
            // Deleting a container that doesn't exist
            const result = await store.deleteContainer({ name: 'doesnotexist' })()

            expect(E.isLeft(result)).toEqual(true)
        })
        it('container', async function () {

            const result = await pipe(
                store.container({ name: 'abc' }),
                TE.mapLeft(a => {
                    expect(a({}).endsWith('not exist.')).toEqual(true)
                    expect(a({ i18n: { locale: 'zh' } }).endsWith('不存在.')).toEqual(true)
                }),
            )()
            expect(E.isLeft(result)).toEqual(true)
        })





        // Delete all objects and containers that we created
        afterAll(async function () {
            // Delete all containers
            /*   await sequenceParallel(containerCreateNames.map(name =>
                  store.deleteContainer({ name })
              ))() */
        })
    })

}
/* 
it('presignedPutUrl', async function () {
  
    if (option.skipPresignedUrlTests) {
        return
    }
    const tasks = files.map(file => {
        const newFile = { ...file, path: 'put/' + file.path }
        addfiles.push(newFile)
        return pipe(
            store.presignedPutUrl(newFile),
            Task.chain((uploadUrl) => {
                expect(typeof uploadUrl === 'string').toBeTruthy()
                expect(uploadUrl.substr(0, 4) == 'http').toBeTruthy()
                return () => new Promise((resolve, reject) => {
                    request.put(uploadUrl, { body: file.data }, (error, response, body) => {
                        if (error) {
                            reject(error)
                        }

                        // Ensure status code is a successful one
                        if (!response || !response.statusCode || response.statusCode < 200 || response.statusCode > 299) {
                            return reject(Error('Invalid response status code'))
                        }

                        resolve()
                    })
                    // return uploadUrl
                })


            }),

        )
    }


    )
    await (sequenceParallel(tasks))()

})

it('presignedGetUrl', async function () {
    // Skip if the provider doesn't support this
    if (option.skipPresignedUrlTests) {

        return
    }
    const tasks = files.map(file =>
        pipe(
            store.presignedGetUrl(file),
            Task.chain((uploadUrl) => {
                expect(typeof uploadUrl === 'string').toBeTruthy()
                expect(uploadUrl.substr(0, 4) == 'http').toBeTruthy()
                return () => new Promise((resolve, reject) => {
                    request.get(uploadUrl, (error, _, body) => {
                        if (error) {
                            reject(error)
                        }

                        if (!body) {
                            return reject(Error('Empty response'))
                        }
                        if (typeof file.data === 'string') {
                            expect(body === file.data).toBeTruthy()
                        }
                        // expect(body === addFiles[2].data).toBeTruthy()
                        resolve()
                    })
                    // return uploadUrl
                })


            }),

        )

    )
    await (sequenceParallel(tasks))()
}) */