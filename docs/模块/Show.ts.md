---
title: Show.ts
nav_order: 2
parent: 模块
---

# 概述

Show in File Store

---

<h2 class="text-delta">目录</h2>

- [showContainer (常量)](#showcontainer-%E5%B8%B8%E9%87%8F)
- [showFile (常量)](#showfile-%E5%B8%B8%E9%87%8F)
- [containerToPath (函数)](#containertopath-%E5%87%BD%E6%95%B0)
- [pathToFile (函数)](#pathtofile-%E5%87%BD%E6%95%B0)

---

# showContainer (常量)

容器对象`Show`

**签名**

```ts

export const showContainer: Show<Container> = ...

```

v0.2.0 中添加

# showFile (常量)

文件对象`Show`

**签名**

```ts

export const showFile: Show<Partial<FileWhereUniqueInput>> = ...

```

v0.2.0 中添加

# containerToPath (函数)

Covert a ContainerWhereUniqueInput to path

**签名**

```ts

export const containerToPath = (root: string) => (a: Partial<ContainerWhereUniqueInput>) => ...

```

v0.2.0 中添加

# pathToFile (函数)

Covert a path to FileWhereUniqueInput

**签名**

```ts

export const pathToFile = (container: string) => (a: string): FileWhereUniqueInput => ...

```

v0.2.0 中添加
