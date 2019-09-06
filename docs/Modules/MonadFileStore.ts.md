---
title: MonadFileStore.ts
nav_order: 1
parent: Modules
---

# Overview

File Store Interface

---

<h2 class="text-delta">Table of contents</h2>

- [BasicFileStore (interface)](#basicfilestore-interface)
- [Container (interface)](#container-interface)
- [ContainerCreateInput (interface)](#containercreateinput-interface)
- [ContainerData (interface)](#containerdata-interface)
- [ContainerQueryData (interface)](#containerquerydata-interface)
- [ContainerUpdateInput (interface)](#containerupdateinput-interface)
- [ContainerUpdateInputParam (interface)](#containerupdateinputparam-interface)
- [ContainerUpsertInputParam (interface)](#containerupsertinputparam-interface)
- [ContainerWhereUniqueInput (interface)](#containerwhereuniqueinput-interface)
- [ExtendFileStore (interface)](#extendfilestore-interface)
- [File (interface)](#file-interface)
- [FileCreateInput (interface)](#filecreateinput-interface)
- [FileData (interface)](#filedata-interface)
- [FileQueryData (interface)](#filequerydata-interface)
- [FileUpdateInput (interface)](#fileupdateinput-interface)
- [FileUpdateInputParam (interface)](#fileupdateinputparam-interface)
- [FileUpsertInput (interface)](#fileupsertinput-interface)
- [FileUpsertInputParam (interface)](#fileupsertinputparam-interface)
- [FileWhereInput (interface)](#filewhereinput-interface)
- [FileWhereUniqueInput (interface)](#filewhereuniqueinput-interface)
- [FolderData (interface)](#folderdata-interface)
- [FolderWhereUniqueInput (interface)](#folderwhereuniqueinput-interface)
- [GlobWhereInput (interface)](#globwhereinput-interface)
- [MonadFileStore (interface)](#monadfilestore-interface)
- [PresignedUrl (interface)](#presignedurl-interface)
- [TextFile (interface)](#textfile-interface)
- [monadFileStore (function)](#monadfilestore-function)

---

# BasicFileStore (interface)

**Signature**

```ts
interface BasicFileStore {
  /**
   *Clear all content on the given folder
   */
  clearFolder: MonadFunction<FolderWhereUniqueInput, void>
  /**
   *Get a container detail
   */
  container: MonadFunction<ContainerWhereUniqueInput, ContainerData>
  /**
   *Lists all containers
   */
  containers: () => MonadNode<Array<ContainerQueryData>>
  /**
   *Creates a container
   */
  createContainer: MonadFunction<ContainerCreateInput, ContainerData>
  /**
   *Create a file
   */
  createFile: MonadFunction<FileCreateInput, FileData>
  /**
   *Removes a container
   */
  deleteContainer: MonadFunction<ContainerWhereUniqueInput, void>
  /**
   *Removes an file
   */
  deleteFile: MonadFunction<FileWhereUniqueInput, void>
  /**
   *Checks if a container exists.
   */
  existContainer: MonadFunction<ContainerWhereUniqueInput, boolean>
  /**
   *Check a file exist
   */
  existFile: MonadFunction<FileWhereUniqueInput, boolean>
  /**
   *Get a file info
   */
  file: MonadFunction<FileWhereUniqueInput, FileData>
  /**
   *Requests an object. The method returns a Promise that resolves to a Readable Stream containing the data.
   */
  fileStream: MonadFunction<FileWhereUniqueInput, Stream>
  /**
   *Get files and folders in a given folder
   */
  folders: MonadFunction<FolderWhereUniqueInput, FolderData>
  /**
   *Query file with `glob`
   */
  glob: MonadFunction<GlobWhereInput, Array<FileData>>
  /**
   *Update a container.
   */
  updateContainer: MonadFunction<ContainerUpdateInputParam, ContainerData>
  /**
   *Update a file content and path
   */
  updateFile: MonadFunction<FileUpdateInputParam, FileData>
}
```

Added in v0.2.0

# Container (interface)

Container

The contains file and folder

**Signature**

```ts
interface Container extends ContainerWhereUniqueInput {
  /**
   *Option
   */
  option?: Record<string, any>
}
```

Added in v0.2.0

# ContainerCreateInput (interface)

Input Type when create a contianer

**Signature**

```ts
interface ContainerCreateInput extends Container {}
```

Added in v0.2.0

# ContainerData (interface)

Return Type when create or update a contianer

**Signature**

```ts
interface ContainerData extends ContainerWhereUniqueInput {}
```

Added in v0.2.0

# ContainerQueryData (interface)

Return Type when search contianer

**Signature**

```ts
interface ContainerQueryData extends ContainerWhereUniqueInput {}
```

Added in v0.2.0

# ContainerUpdateInput (interface)

Input Data Type when update a contianer

**Signature**

```ts
interface ContainerUpdateInput extends ContainerWhereUniqueInput {}
```

Added in v0.2.0

# ContainerUpdateInputParam (interface)

Input Type for update a container

**Signature**

```ts
interface ContainerUpdateInputParam {
  data: ContainerUpdateInput
  where: ContainerWhereUniqueInput
}
```

Added in v0.2.0

# ContainerUpsertInputParam (interface)

Input Type for upsert a container

**Signature**

```ts
interface ContainerUpsertInputParam {
  create: ContainerCreateInput
  update: ContainerUpdateInput
  where: ContainerWhereUniqueInput
}
```

Added in v0.2.0

# ContainerWhereUniqueInput (interface)

Container unique id

**Signature**

```ts
interface ContainerWhereUniqueInput {
  /**
   *Name of the container
   */
  name: string
}
```

Added in v0.2.0

# ExtendFileStore (interface)

Auto build some function with BasicFileStore

**Signature**

```ts
interface ExtendFileStore {
  /**
   *query file
   */
  files: MonadFunction<FileWhereInput, Array<FileQueryData>>
  /**
   *Get a file text content.
   */
  readTextFile: MonadFunction<FileWhereUniqueInput & { encoding?: string }, TextFile>
  /**
   *Get some file text content.
   */
  readTextFiles: MonadFunction<FileWhereUniqueInput[] & { encoding?: string }, TextFile[]>
  /**
   *upsert a container
   */
  upsertContainer: MonadFunction<ContainerUpsertInputParam, ContainerData>
  /**
   *upsert a file
   */
  upsertFile: MonadFunction<FileUpsertInputParam, FileData>
}
```

Added in v0.2.0

# File (interface)

**Signature**

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

Added in v0.2.0

# FileCreateInput (interface)

Input Type when create a file

**Signature**

```ts
interface FileCreateInput extends FileWhereUniqueInput {
  /**
   *content
   */
  data: string | Buffer | Stream
  /**
   *encoding
   */
  encoding?: string
}
```

Added in v0.2.0

# FileData (interface)

A File that no contain content

**Signature**

```ts
interface FileData extends FileWhereUniqueInput {
  /**
   *Date when the file was last modified
   */
  lastModified: string
  /**
   *Size in bytes of the file
   */
  size: number
}
```

Added in v0.2.0

# FileQueryData (interface)

Return Type When query file

**Signature**

```ts
interface FileQueryData extends FileData {}
```

Added in v0.2.0

# FileUpdateInput (interface)

Input Data Type when update a file

**Signature**

```ts
interface FileUpdateInput {
  container: string
  data?: Stream | string | Buffer
  encoding?: string
  folders?: Array<string>
  name: string
}
```

Added in v0.2.0

# FileUpdateInputParam (interface)

Input Type when update a file

**Signature**

```ts
interface FileUpdateInputParam {
  data: FileUpdateInput
  where: FileWhereUniqueInput
}
```

Added in v0.2.0

# FileUpsertInput (interface)

**Signature**

```ts
interface FileUpsertInput {
  create: FileCreateInput
  update: FileUpdateInput
  where: FileWhereUniqueInput
}
```

Added in v0.2.0

# FileUpsertInputParam (interface)

Input Type when upsert a file

**Signature**

```ts
interface FileUpsertInputParam {
  create: FileCreateInput
  update: FileUpdateInput
  where: FileWhereUniqueInput
}
```

Added in v0.2.0

# FileWhereInput (interface)

File Type when serach some file

**Signature**

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

Added in v0.2.0

# FileWhereUniqueInput (interface)

File unique ID

**Signature**

```ts
interface FileWhereUniqueInput {
  /**
   *the container
   */
  container: string
  /**
   *folders
   */
  folders: string[]
  /**
   *name
   */
  name: string
}
```

Added in v0.2.0

# FolderData (interface)

**Signature**

```ts
interface FolderData {
  files: FileData[]
  folders: string[]
}
```

Added in v0.2.0

# FolderWhereUniqueInput (interface)

Folder unique id

**Signature**

```ts
interface FolderWhereUniqueInput {
  container: string
  folders: string[]
}
```

Added in v0.2.0

# GlobWhereInput (interface)

**Signature**

```ts
interface GlobWhereInput {
  container: string
  folders?: string[]
  pattern: string[] | string
}
```

Added in v0.2.0

# MonadFileStore (interface)

Monad FileStore

**Signature**

```ts
interface MonadFileStore extends BasicFileStore, ExtendFileStore {}
```

Added in v0.2.0

# PresignedUrl (interface)

File Store Url

**Signature**

```ts
interface PresignedUrl {
  /**
   *Returns a URL that clients (e.g. browsers) can use to request an object
   *from the server with a GET request, even if the object is private.
   */
  presignedGetUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number }, string>
  /**
   *Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
   */
  presignedPutUrl: MonadFunction<FileWhereUniqueInput & { ttl?: number; metadata?: object }, string>
}
```

Added in v0.2.0

# TextFile (interface)

**Signature**

```ts
interface TextFile extends FileCreateInput {
  data: string
}
```

Added in v0.2.0

# monadFileStore (function)

Build a MonadFileStore instance from BasicFileStore

**Signature**

```ts

export const monadFileStore = (C: BasicFileStore): MonadFileStore => ...

```

Added in v0.2.0
