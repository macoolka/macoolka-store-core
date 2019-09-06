/**
 * File Store Interface
 * @desczh
 * 存储接口
 * @file
 */
import { Stream } from 'stream'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'
import { MonadFunction } from 'macoolka-app/lib/MonadFunction'
import { traverse, parallel, MonadNode } from 'macoolka-app/lib/MonadNode'
import { streamToString } from 'macoolka-stream'
import { CompareObjectModelDefinition, parseToCompareModel, compareModel } from 'macoolka-compare'
/**
 * Container
 * 
 * The contains file and folder
 * @desczh
 * 容器
 * 包含文件和文件夹
 * @since 0.2.0
 * 
 */
export interface Container extends ContainerWhereUniqueInput {
    /**
     * Option
     * @desczh
     * 容器参数
     */
    option?: Record<string, any>
}
/**
 * Input Type when create a contianer
 * @desczh
 * 创建容器输入类型
 * @since 0.2.0
 */
export interface ContainerCreateInput extends Container {

}
/**
 * Return Type when create or update a contianer
 * @desczh
 * 创建或者修改容器返回类型
 * @since 0.2.0
 */
export interface ContainerData extends ContainerWhereUniqueInput {

}
/**
 * Return Type when search contianer
 * @desczh
 * 查询容器返回类型
 * @since 0.2.0
 */
export interface ContainerQueryData extends ContainerWhereUniqueInput {

}
/**
 * Input Data Type when update a contianer
 * @desczh
 * 修改容器输入的数据类型
 * @since 0.2.0
 */
export interface ContainerUpdateInput extends ContainerWhereUniqueInput {

}
/**
 * Input Type for update a container
 * @desczh
 * 修改容器的输入类型
 * @since 0.2.0
 */
export interface ContainerUpdateInputParam {
    data: ContainerUpdateInput
    where: ContainerWhereUniqueInput
}
/**
 * Input Type for upsert a container
 * @desczh
 * upsert容器的输入类型
 * @since 0.2.0
 */
export interface ContainerUpsertInputParam {
    update: ContainerUpdateInput
    create: ContainerCreateInput
    where: ContainerWhereUniqueInput
}

/**
 * Container unique id
 * @desczh
 * 容器唯一标示
 * @since 0.2.0
 */
export interface ContainerWhereUniqueInput {
    /**
      * Name of the container
      * @desczh
      * 名称
      */
    name: string
}
export interface File {
    name: string
    container: string
    folders?: Array<string>
    data: Stream | string | Buffer
    encoding?: string
    size: number
    lastModified: string
}
/**
 * Input Type when create a file
 * @desczh
 * 创建文件时的输入类型
 */
export interface FileCreateInput extends FileWhereUniqueInput {

    /**
     * encoding
     * @desczh
     * 文件编码方式
     */
    encoding?: string
    /**
     * content
     * @desczh
     * 文件内容
     */
    data: string | Buffer | Stream
}
/**
 * A File that no contain content
 * @desczh
 * 文件信息，不包含文件内容
 * @since 0.2.0
 */
export interface FileData extends FileWhereUniqueInput {
    /** 
     * Size in bytes of the file 
     * @desczh
     * 文件字节数
     */
    size: number
    /** 
     * Date when the file was last modified 
     * @desczh
     * 文件最后编辑的时间
     */
    lastModified: string
}
/**
 * Return Type When query file
 * @desczh
 * 查询文件返回的结果
 * @since 0.2.0
 */
export interface FileQueryData extends FileData {

}

/**
 * Input Data Type when update a file
 * @desczh
 * 修改文件的输入数据类型
 * @since 0.2.0
 */
export interface FileUpdateInput {
    name: string
    container: string
    folders?: Array<string>
    data?: Stream | string | Buffer
    encoding?: string
}
/**
 * Input Type when update a file
 * @desczh
 * 修改文件的输入类型
 * @since 0.2.0
 */
export interface FileUpdateInputParam {
    data: FileUpdateInput
    where: FileWhereUniqueInput
}
/**
 * Input Type when upsert a file
 * @desczh
 * upsert的输入类型
 * @since 0.2.0
 */
export interface FileUpsertInputParam {
    update: FileUpdateInput
    create: FileCreateInput
    where: FileWhereUniqueInput
}
/**
 * File Type when serach some file
 * @desczh
 * 查询文件的输入类型
 * @since 0.2.0
 */
export interface FileWhereInput {
    name?: string
    name_not?: string
    name_lt?: string
    name_gt?: string
    name_lte?: string
    name_gte?: string
    name_between?: string
    name_contains?: string
    name_not_contains?: string
    name_starts_with?: string
    name_ends_with?: string
    name_not_starts_with?: string
    name_not_ends_with?: string
    name_in?: string
    name_not_in?: string
    container?: string
    container_not?: string
    container_lt?: string
    container_gt?: string
    container_lte?: string
    container_gte?: string
    container_between?: string
    container_contains?: string
    container_not_contains?: string
    container_starts_with?: string
    container_ends_with?: string
    container_not_starts_with?: string
    container_not_ends_with?: string
    container_in?: string
    container_not_in?: string
    size?: number
    size_not?: number
    size_lt?: number
    size_gt?: number
    size_lte?: number
    size_gte?: number
    size_between?: number
    lastModified?: string
    lastModified_not?: string
    lastModified_lt?: string
    lastModified_gt?: string
    lastModified_lte?: string
    lastModified_gte?: string
    lastModified_between?: string
    AND?: Array<FileWhereInput>
    OR?: Array<FileWhereInput>
    NOT?: Array<FileWhereInput>
}

export interface FileUpsertInput {
    update: FileUpdateInput
    create: FileCreateInput
    where: FileWhereUniqueInput
}
/**
 * File unique ID
 * @desczh
 * 文件唯一标示
 * @since 0.2.0
 */
export interface FileWhereUniqueInput {
    /** 
      * the container 
      * 
      * @desczh
      * 容器
     */
    container: string
    /** 
     * folders
     * @desczh
     * 文件夹
     */
    folders: string[]
    /**
     * name
     * @desczh
     * 文件名
     */
    name: string
}
/**
 * Folder unique id
 * @desczh
 * 文件夹唯一标示
 * @since 0.2.0
 */
export interface FolderWhereUniqueInput {
    container: string,
    folders: string[]
}

export interface GlobWhereInput {
    container: string;
    folders?: string[];
    pattern: string[] | string;
}
export interface FolderData {
    folders: string[]
    files: FileData[]
}

export interface TextFile extends FileCreateInput {
    data: string
}
export interface BasicFileStore {
    /**
     * Creates a container
     * @desczh
     * 创建一个容器
     */
    createContainer: MonadFunction<ContainerCreateInput, ContainerData>
    /**
     * Update a container.
     * @desczh
     * 修改一个容器
     */
    updateContainer: MonadFunction<ContainerUpdateInputParam, ContainerData>
    /**
     * Removes a container
     * @desczh
     * 删除一个容器
     */
    deleteContainer: MonadFunction<ContainerWhereUniqueInput, void>

    /**
     * Checks if a container exists.
     * @desczh
     * 判断一个容器是否存在
     */
    existContainer: MonadFunction<ContainerWhereUniqueInput, boolean>

    /**
    * Get a container detail
    * @desczh
    * 得到一个容器
    */
    container: MonadFunction<ContainerWhereUniqueInput, ContainerData>
    /**
     * Lists all containers
     * @desczh
     * 列出所有的容器
     */
    containers: () => MonadNode<Array<ContainerQueryData>>
    /**
     * Create a file 
     * @desczh
     * 创建一个文件
     */
    createFile: MonadFunction<FileCreateInput, FileData>
    /**
     * Update a file content and path
     * @desczh
     * 更新一个文件内容或路径 
     */
    updateFile: MonadFunction<FileUpdateInputParam, FileData>
    /**
     * Removes an file
     * @desczh
     * 删除一个文件
     * 
     */
    deleteFile: MonadFunction<FileWhereUniqueInput, void>
    /**
     * Check a file exist
     * @desczh
     * 判断一个文件是否存在
     */
    existFile: MonadFunction<FileWhereUniqueInput, boolean>
    /**
     * Get a file info
     * @desczh
     * 得到一个文件信息
     * 
     */
    file: MonadFunction<FileWhereUniqueInput, FileData>

    /**
      * Query file with `glob`
      * @desczh
      * 查询文件用`glob`
      */
    glob: MonadFunction<GlobWhereInput, Array<FileData>>
    /**
     * Requests an object. The method returns a Promise that resolves to a Readable Stream containing the data.
     * @desczh
     * 得到一个包含文件内容的流
     */
    fileStream: MonadFunction<FileWhereUniqueInput, Stream>
    /**
    * Clear all content on the given folder
    * @desczh
    * 删除文件夹下所有的内容
    */
    clearFolder: MonadFunction<FolderWhereUniqueInput, void>
    /**
    * Get files and folders in a given folder
    * @desczh
    * 得到一个文件夹下文件和子文件夹信息
    */
    folders: MonadFunction<FolderWhereUniqueInput, FolderData>
}
/**
 * Auto build some function with BasicFileStore 
 * @desczh
 * 根据FileStore创建的一些函数
 * @sice 0.2.0
 */
export interface ExtendFileStore {
    /**
    * upsert a container
    * @desczh
    * upsert容器
    */
    upsertContainer: MonadFunction<ContainerUpsertInputParam, ContainerData>
    /**
    * upsert a file
    * @desczh
    * upsert文件
    */
    upsertFile: MonadFunction<FileUpsertInputParam, FileData>
    /**
    * query file
    * @desczh
    * 查询文件
    */
    files: MonadFunction<FileWhereInput, Array<FileQueryData>>
    /**
     * Get a file text content.
     * @desczh
     * 得到一个文件的文本内容
     */
    readTextFile: MonadFunction<FileWhereUniqueInput & { encoding?: string }, TextFile>
    /**
     * Get some file text content.
     * @desczh
     * 得到一些文件的文本内容
     */
    readTextFiles: MonadFunction<FileWhereUniqueInput[] & { encoding?: string }, TextFile[]>
}
/**
 * Monad FileStore 
 * @sice 0.2.0
 */
export interface MonadFileStore extends BasicFileStore, ExtendFileStore {

}

const personWhereModel: CompareObjectModelDefinition = {
    string: ['name', 'container'],
    number: ['size'],
    boolean: [],
    enum: [],
    date: ['lastModified']
}
const filewheres = parseToCompareModel<FileWhereInput, FileData>(personWhereModel)
const compare = compareModel<FileWhereInput, FileData>(filewheres)
/**
 * Build a MonadFileStore instance from BasicFileStore
 * @desczh
 * 创建一个MonadFileStore实例
 * @param C 
 */
export const monadFileStore = (C: BasicFileStore): MonadFileStore => {
    const readTextFile: MonadFileStore['readTextFile'] = (where) => {
        return pipe(
            C.fileStream(where),
            TE.chain(a => {
                return pipe(
                    streamToString({ encoding: where.encoding })(a),
                    T.map(content => E.right({ ...where, data: content }))
                )
            }),
        )
    }
    const readTextFiles: MonadFileStore['readTextFiles'] = (where) => {

        return traverse(where, readTextFile)
    }
    const files: MonadFileStore['files'] = (where) => {
        return pipe(
            C.containers(),
            TE.chain(as => pipe(
                as,
                A.map(b => C.glob({ pattern: ['**/*'], container: b.name })),
                parallel,
            )),
            TE.map(as => pipe(
                as,
                A.flatten,
                A.filter(compare(where))
            ))
        )
    }
    const upsertFile: MonadFileStore['upsertFile'] = ({ where, create, update }) => {
        return pipe(
            C.existFile(where),
            TE.chain(a => {
                return a
                    ? C.updateFile({ data: update, where: where })
                    : C.createFile(create)

            })
        )

    }
    const upsertContainer: MonadFileStore['upsertContainer'] = ({ where, create, update }) => {
        return pipe(
            C.existContainer(where),
            TE.chain(a => {
                return a
                    ? C.updateContainer({ data: update, where: where })
                    : C.createContainer(create)

            })
        )

    }
    return {
        ...C,
        readTextFile,
        readTextFiles,
        upsertFile,
        upsertContainer,
        files,
    }
}
/**
 * File Store Url
 * @since 0.2.0
 */
export interface PresignedUrl {
    /**
      * Returns a URL that clients (e.g. browsers) can use to request an object 
      * from the server with a GET request, even if the object is private.
      * 
      * @desczh
      * 获得一个Get Url.
      * @since 0.2.0
      */
    presignedGetUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number }, string>

    /**
     * Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
     * 
     * @desczh
     * 获得一个Put Url.
     */
    presignedPutUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number, metadata?: object }, string>
}