---
title: Show.ts
nav_order: 2
parent: Modules
---

# Overview

Show in File Store

---

<h2 class="text-delta">Table of contents</h2>

- [showContainer (constant)](#showcontainer-constant)
- [showFile (constant)](#showfile-constant)
- [containerToPath (function)](#containertopath-function)
- [pathToFile (function)](#pathtofile-function)

---

# showContainer (constant)

`Show` about Container

**Signature**

```ts

export const showContainer: Show<Container> = ...

```

Added in v0.2.0

# showFile (constant)

`Show` about FileLike

**Signature**

```ts

export const showFile: Show<Partial<FileWhereUniqueInput>> = ...

```

Added in v0.2.0

# containerToPath (function)

Covert a ContainerWhereUniqueInput to path

**Signature**

```ts

export const containerToPath = (root: string) => (a: Partial<ContainerWhereUniqueInput>) => ...

```

Added in v0.2.0

# pathToFile (function)

Covert a path to FileWhereUniqueInput

**Signature**

```ts

export const pathToFile = (container: string) => (a: string): FileWhereUniqueInput => ...

```

Added in v0.2.0
