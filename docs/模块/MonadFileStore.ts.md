---
title: MonadFileStore.ts
nav_order: 1
parent: 模块
---

# 概述

存储接口

---

<h2 class="text-delta">目录</h2>

- [BasicFileStore (接口)](#basicfilestore-%E6%8E%A5%E5%8F%A3)
- [Container (接口)](#container-%E6%8E%A5%E5%8F%A3)
- [ContainerCreateInput (接口)](#containercreateinput-%E6%8E%A5%E5%8F%A3)
- [ContainerData (接口)](#containerdata-%E6%8E%A5%E5%8F%A3)
- [ContainerQueryData (接口)](#containerquerydata-%E6%8E%A5%E5%8F%A3)
- [ContainerUpdateInput (接口)](#containerupdateinput-%E6%8E%A5%E5%8F%A3)
- [ContainerUpdateInputParam (接口)](#containerupdateinputparam-%E6%8E%A5%E5%8F%A3)
- [ContainerUpsertInputParam (接口)](#containerupsertinputparam-%E6%8E%A5%E5%8F%A3)
- [ContainerWhereUniqueInput (接口)](#containerwhereuniqueinput-%E6%8E%A5%E5%8F%A3)
- [ExtendFileStore (接口)](#extendfilestore-%E6%8E%A5%E5%8F%A3)
- [File (接口)](#file-%E6%8E%A5%E5%8F%A3)
- [FileCreateInput (接口)](#filecreateinput-%E6%8E%A5%E5%8F%A3)
- [FileData (接口)](#filedata-%E6%8E%A5%E5%8F%A3)
- [FileQueryData (接口)](#filequerydata-%E6%8E%A5%E5%8F%A3)
- [FileUpdateInput (接口)](#fileupdateinput-%E6%8E%A5%E5%8F%A3)
- [FileUpdateInputParam (接口)](#fileupdateinputparam-%E6%8E%A5%E5%8F%A3)
- [FileUpsertInput (接口)](#fileupsertinput-%E6%8E%A5%E5%8F%A3)
- [FileUpsertInputParam (接口)](#fileupsertinputparam-%E6%8E%A5%E5%8F%A3)
- [FileWhereInput (接口)](#filewhereinput-%E6%8E%A5%E5%8F%A3)
- [FileWhereUniqueInput (接口)](#filewhereuniqueinput-%E6%8E%A5%E5%8F%A3)
- [FolderData (接口)](#folderdata-%E6%8E%A5%E5%8F%A3)
- [FolderWhereUniqueInput (接口)](#folderwhereuniqueinput-%E6%8E%A5%E5%8F%A3)
- [GlobWhereInput (接口)](#globwhereinput-%E6%8E%A5%E5%8F%A3)
- [MonadFileStore (接口)](#monadfilestore-%E6%8E%A5%E5%8F%A3)
- [PresignedUrl (接口)](#presignedurl-%E6%8E%A5%E5%8F%A3)
- [TextFile (接口)](#textfile-%E6%8E%A5%E5%8F%A3)
- [monadFileStore (函数)](#monadfilestore-%E5%87%BD%E6%95%B0)

---

# BasicFileStore (接口)

**签名**

```ts
interface BasicFileStore {
  /**
   *删除文件夹下所有的内容
   */
  clearFolder: MonadFunction<FolderWhereUniqueInput, void>
  /**
   *得到一个容器
   */
  container: MonadFunction<ContainerWhereUniqueInput, ContainerData>
  /**
   *列出所有的容器
   */
  containers: () => MonadNode<Array<ContainerQueryData>>
  /**
   *创建一个容器
   */
  createContainer: MonadFunction<ContainerCreateInput, ContainerData>
  /**
   *创建一个文件
   */
  createFile: MonadFunction<FileCreateInput, FileData>
  /**
   *删除一个容器
   */
  deleteContainer: MonadFunction<ContainerWhereUniqueInput, void>
  /**
   *删除一个文件
   */
  deleteFile: MonadFunction<FileWhereUniqueInput, void>
  /**
   *判断一个容器是否存在
   */
  existContainer: MonadFunction<ContainerWhereUniqueInput, boolean>
  /**
   *判断一个文件是否存在
   */
  existFile: MonadFunction<FileWhereUniqueInput, boolean>
  /**
   *得到一个文件信息
   */
  file: MonadFunction<FileWhereUniqueInput, FileData>
  /**
   *得到一个包含文件内容的流
   */
  fileStream: MonadFunction<FileWhereUniqueInput, Stream>
  /**
   *得到一个文件夹下文件和子文件夹信息
   */
  folders: MonadFunction<FolderWhereUniqueInput, FolderData>
  /**
   *查询文件用`glob`
   */
  glob: MonadFunction<GlobWhereInput, Array<FileData>>
  /**
   *修改一个容器
   */
  updateContainer: MonadFunction<ContainerUpdateInputParam, ContainerData>
  /**
   *更新一个文件内容或路径
   */
  updateFile: MonadFunction<FileUpdateInputParam, FileData>
}
```

v0.2.0 中添加

# Container (接口)

容器
包含文件和文件夹

**签名**

```ts
interface Container extends ContainerWhereUniqueInput {
  /**
   *容器参数
   */
  option?: Record<string, any>
}
```

v0.2.0 中添加

# ContainerCreateInput (接口)

创建容器输入类型

**签名**

```ts
interface ContainerCreateInput extends Container {}
```

v0.2.0 中添加

# ContainerData (接口)

创建或者修改容器返回类型

**签名**

```ts
interface ContainerData extends ContainerWhereUniqueInput {}
```

v0.2.0 中添加

# ContainerQueryData (接口)

查询容器返回类型

**签名**

```ts
interface ContainerQueryData extends ContainerWhereUniqueInput {}
```

v0.2.0 中添加

# ContainerUpdateInput (接口)

修改容器输入的数据类型

**签名**

```ts
interface ContainerUpdateInput extends ContainerWhereUniqueInput {}
```

v0.2.0 中添加

# ContainerUpdateInputParam (接口)

修改容器的输入类型

**签名**

```ts
interface ContainerUpdateInputParam {
  data: ContainerUpdateInput
  where: ContainerWhereUniqueInput
}
```

v0.2.0 中添加

# ContainerUpsertInputParam (接口)

upsert 容器的输入类型

**签名**

```ts
interface ContainerUpsertInputParam {
  create: ContainerCreateInput
  update: ContainerUpdateInput
  where: ContainerWhereUniqueInput
}
```

v0.2.0 中添加

# ContainerWhereUniqueInput (接口)

容器唯一标示

**签名**

```ts
interface ContainerWhereUniqueInput {
  /**
   *名称
   */
  name: string
}
```

v0.2.0 中添加

# ExtendFileStore (接口)

根据 FileStore 创建的一些函数

**签名**

```ts
interface ExtendFileStore {
  /**
   *查询文件
   */
  files: MonadFunction<FileWhereInput, Array<FileQueryData>>
  /**
   *得到一个文件的文本内容
   */
  readTextFile: MonadFunction<FileWhereUniqueInput & { encoding?: string }, TextFile>
  /**
   *得到一些文件的文本内容
   */
  readTextFiles: MonadFunction<FileWhereUniqueInput[] & { encoding?: string }, TextFile[]>
  /**
   *upsert容器
   */
  upsertContainer: MonadFunction<ContainerUpsertInputParam, ContainerData>
  /**
   *upsert文件
   */
  upsertFile: MonadFunction<FileUpsertInputParam, FileData>
}
```

v0.2.0 中添加

# File (接口)

**签名**

```ts
interface File {
  container: string
  data: Stream | string | Buffer
  encoding?: string
  folders?: Array<string>
  lastModified: string
  name: string
  size: number
}
```

v0.2.0 中添加

# FileCreateInput (接口)

创建文件时的输入类型

**签名**

```ts
interface FileCreateInput extends FileWhereUniqueInput {
  /**
   *文件内容
   */
  data: string | Buffer | Stream
  /**
   *文件编码方式
   */
  encoding?: string
}
```

v0.2.0 中添加

# FileData (接口)

文件信息，不包含文件内容

**签名**

```ts
interface FileData extends FileWhereUniqueInput {
  /**
   *文件最后编辑的时间
   */
  lastModified: string
  /**
   *文件字节数
   */
  size: number
}
```

v0.2.0 中添加

# FileQueryData (接口)

查询文件返回的结果

**签名**

```ts
interface FileQueryData extends FileData {}
```

v0.2.0 中添加

# FileUpdateInput (接口)

修改文件的输入数据类型

**签名**

```ts
interface FileUpdateInput {
  container: string
  data?: Stream | string | Buffer
  encoding?: string
  folders?: Array<string>
  name: string
}
```

v0.2.0 中添加

# FileUpdateInputParam (接口)

修改文件的输入类型

**签名**

```ts
interface FileUpdateInputParam {
  data: FileUpdateInput
  where: FileWhereUniqueInput
}
```

v0.2.0 中添加

# FileUpsertInput (接口)

**签名**

```ts
interface FileUpsertInput {
  create: FileCreateInput
  update: FileUpdateInput
  where: FileWhereUniqueInput
}
```

v0.2.0 中添加

# FileUpsertInputParam (接口)

upsert 的输入类型

**签名**

```ts
interface FileUpsertInputParam {
  create: FileCreateInput
  update: FileUpdateInput
  where: FileWhereUniqueInput
}
```

v0.2.0 中添加

# FileWhereInput (接口)

查询文件的输入类型

**签名**

```ts
interface FileWhereInput {
  AND?: Array<FileWhereInput>
  NOT?: Array<FileWhereInput>
  OR?: Array<FileWhereInput>
  container?: string
  container_between?: string
  container_contains?: string
  container_ends_with?: string
  container_gt?: string
  container_gte?: string
  container_in?: string
  container_lt?: string
  container_lte?: string
  container_not?: string
  container_not_contains?: string
  container_not_ends_with?: string
  container_not_in?: string
  container_not_starts_with?: string
  container_starts_with?: string
  lastModified?: string
  lastModified_between?: string
  lastModified_gt?: string
  lastModified_gte?: string
  lastModified_lt?: string
  lastModified_lte?: string
  lastModified_not?: string
  name?: string
  name_between?: string
  name_contains?: string
  name_ends_with?: string
  name_gt?: string
  name_gte?: string
  name_in?: string
  name_lt?: string
  name_lte?: string
  name_not?: string
  name_not_contains?: string
  name_not_ends_with?: string
  name_not_in?: string
  name_not_starts_with?: string
  name_starts_with?: string
  size?: number
  size_between?: number
  size_gt?: number
  size_gte?: number
  size_lt?: number
  size_lte?: number
  size_not?: number
}
```

v0.2.0 中添加

# FileWhereUniqueInput (接口)

文件唯一标示

**签名**

```ts
interface FileWhereUniqueInput {
  /**
   *容器
   */
  container: string
  /**
   *文件夹
   */
  folders: string[]
  /**
   *文件名
   */
  name: string
}
```

v0.2.0 中添加

# FolderData (接口)

**签名**

```ts
interface FolderData {
  files: FileData[]
  folders: string[]
}
```

v0.2.0 中添加

# FolderWhereUniqueInput (接口)

文件夹唯一标示

**签名**

```ts
interface FolderWhereUniqueInput {
  container: string
  folders: string[]
}
```

v0.2.0 中添加

# GlobWhereInput (接口)

**签名**

```ts
interface GlobWhereInput {
  container: string
  folders?: string[]
  pattern: string[] | string
}
```

v0.2.0 中添加

# MonadFileStore (接口)

Monad FileStore

**签名**

```ts
interface MonadFileStore extends BasicFileStore, ExtendFileStore {}
```

v0.2.0 中添加

# PresignedUrl (接口)

File Store Url

**签名**

```ts
interface PresignedUrl {
  /**
   *获得一个Get Url.
   */
  presignedGetUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number }, string>
  /**
   *获得一个Put Url.
   */
  presignedPutUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number; metadata?: object }, string>
}
```

v0.2.0 中添加

# TextFile (接口)

**签名**

```ts
interface TextFile extends FileCreateInput {
  data: string
}
```

v0.2.0 中添加

# monadFileStore (函数)

创建一个 MonadFileStore 实例

**签名**

```ts

export const monadFileStore = (C: BasicFileStore): MonadFileStore => ...

```

v0.2.0 中添加
