---
title: Binary Analysis I
layout: title-with-image
description: Identifying system components and properties
buttonText: Start Week 3
imageText: Week 3
slides:
  - Review
  - Executables
  - Loading
  - Linking
  - Demo
  - Lab 1
  - Assembly
  - Lab 2
  - Homework
---

```
7a85 dabd 8b48 892c a7c3 4cb4 e24c 3b40
8e66 2eb8 7ac1 a36d 95dc b150 8b84 3d02
782e 32bf d9d7 f400 f1ad 7fac b258 6fc6
e966 c004 d7d1 d16b 024f 5805 ff7c b47c 
7a85 dabd 8b48 892c a7ad 7fac b258 6fc6 
7a85 dabd 8b48 892c a7ad 7fac b258 6fc6
e966 c004 d7d1 d16b 024f 5805 ff7c b47c
371b f798 90fb 1861 2d53 e282 bb5e 8cd0
7aea 31e9 9659 d7d9 f6ad 7fac b258 6fc6 
```

---
currentNav: "Review"
---

# Review

Any questions on what we covered last week?

---
currentNav: "Executables"
---

# Building an Executable

Executables are usually built using a compiler like `gcc`, `clang`, `msvc`, `rustc`, etc., which generate machine code from source code.

C program source.

```c
int main() {
  printf("Hello World!\n");
  return 0;
}
```

Compile the source code.

```
gcc main.c -o my_program
```

Hex output

<ScrollableView height="100px">


```
$ xxd main | head
00000000: cafe babe 0000 0002 0100 0007 0000 0003  ................
00000010: 0000 4000 0000 bbf0 0000 000e 0100 000c  ..@.............
00000020: 8000 0002 0001 0000 0001 5c00 0000 000e  ..........\.....
00000030: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000040: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000050: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000060: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000070: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000080: 0000 0000 0000 0000 0000 0000 0000 0000  ................
00000090: 0000 0000 0000 0000 0000 0000 0000 0000  ................
```

</ScrollableView>

---
currentNav: "Executables"
---

# Building an Executable

Executables are usually built using a compiler like `gcc`, `clang`, `msvc`, `rustc`, etc., which generate machine code from source code.

Show three stages.

---
currentNav: "Executables"
---

# Executable Format Header

Different platforms support different executable file formats. These formats begin with a header that specifies the entry point, function locations, and other metadata.

<Row>
  <Column>
    <h3>Linux (ELF)</h3>
    <p><strong>Magic:</strong> <code>7F 45 4C 46</code></p>
    <ScrollableView height="250px">
```c
#include <stdint.h>
#define EI_NIDENT 16

typedef struct {
  unsigned char   e_ident[EI_NIDENT];
  uint16_t        e_type;
  uint16_t        e_machine;
  uint32_t        e_version;
  uint64_t        e_entry;
  uint64_t        e_phoff;
  uint64_t        e_shoff;
  uint32_t        e_flags;
  uint16_t        e_ehsize;
  uint16_t        e_phentsize;
  uint16_t        e_phnum;
  uint16_t        e_shentsize;
  uint16_t        e_shnum;
  uint16_t        e_shstrndx;
} Elf64_Ehdr;
```
    </ScrollableView>
  </Column>

  <Column>
    <h3>macOS (Mach-O)</h3>
    <p><strong>Magic:</strong> <code>FE ED FA CF</code></p>
    <ScrollableView height="250px">
```c
#include <stdint.h>

typedef struct {
  uint32_t magic;
  uint32_t cputype;
  uint32_t cpusubtype;
  uint32_t filetype;
  uint32_t ncmds;
  uint32_t sizeofcmds;
  uint32_t flags;
  uint32_t reserved;
} mach_header_64;

typedef struct {
  uint32_t cmd;
  uint32_t cmdsize;
  uint64_t vmaddr;
  uint64_t vmsize;
  uint64_t fileoff;
  uint64_t filesize;
  uint32_t maxprot;
  uint32_t initprot;
  uint32_t nsects;
  uint32_t flags;
} segment_command_64;
```
    </ScrollableView>
  </Column>

  <Column>
    <h3>Windows (PE)</h3>
    <p><strong>Magic:</strong> <code>4D 5A</code> + <code>50 45 00 00</code></p>
    <ScrollableView height="250px">
```c
typedef struct {
  WORD  e_magic;
  WORD  e_cblp;
  WORD  e_cp;
  WORD  e_crlc;
  WORD  e_cparhdr;
  WORD  e_minalloc;
  WORD  e_maxalloc;
  WORD  e_ss;
  WORD  e_sp;
  WORD  e_csum;
  WORD  e_ip;
  WORD  e_cs;
  WORD  e_lfarlc;
  WORD  e_ovno;
  WORD  e_res[4];
  WORD  e_oemid;
  WORD  e_oeminfo;
  WORD  e_res2[10];
  LONG  e_lfanew;
} IMAGE_DOS_HEADER;

typedef struct {
  DWORD Signature;
  IMAGE_FILE_HEADER FileHeader;
  IMAGE_OPTIONAL_HEADER64 OptionalHeader;
} IMAGE_NT_HEADERS64;
```
    </ScrollableView>
  </Column>
</Row>

---
currentNav: "Executables"
---

# Components of an Executable

Executable files are organized into distinct sections that serve different purposes during execution.

<Row>
  <Column>
    <h4>Headers:</h4>
    <ul>
      <li><strong>ELF Header</strong> - Entry point and other metadata</li>
      <li><strong>Section Headers</strong> - Table describing all sections</li>
      <li><strong>Program Headers</strong> - Memory layout and loading</li>
    </ul>
    <h4>Key Sections:</h4>
    <ul>
      <li><strong>.text</strong> - Contains the actual executable code</li>
      <li><strong>.data</strong> - Initialized global and static variables</li>
      <li><strong>.rodata</strong> - Read-only data (strings, constants)</li>
      <li><strong>.bss</strong> - Uninitialized global and static variables</li>
      <li><strong>.debug</strong> - Debugging information for developers</li>
      <li><strong>.symtab</strong> - Symbol table for linking and debugging</li>
    </ul>
  </Column>
  <Column>
    <div class="architecture-container">
      <ArchitectureLayerLabel label="Header" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid :columns="1">
            <ArchitectureItem text="ELF Header" color="#3b82f6" width="100%" />
            <ArchitectureItem text="Program Headers" color="#3b82f6" width="100%" />
            <ArchitectureItem text="Section Headers" color="#3b82f6" width="100%" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
      <ArchitectureLayerLabel label="Text Sections" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid :columns="1">
            <ArchitectureItem text=".text" color="#10b981" width="100%" />
            <ArchitectureItem text=".init" color="#10b981" width="100%" />
            <ArchitectureItem text=".fini" color="#10b981" width="100%" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
      <ArchitectureLayerLabel label="Data Sections" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid :columns="1">
            <ArchitectureItem text=".data" color="#f59e0b" width="100%" />
            <ArchitectureItem text=".rodata" color="#f59e0b" width="100%" />
            <ArchitectureItem text=".bss" color="#f59e0b" width="100%" />
            <ArchitectureItem text=".debug" color="#8b5cf6" width="100%" />
            <ArchitectureItem text=".symtab" color="#8b5cf6" width="100%" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
    </div>
  </Column>
</Row>

---
currentNav: "Executables"
---

# Executable Format Header

Which platform and format is this? What's the entry point?

<Row>
<Column>
<ScrollableView height="380px">
```c
#include <stdint.h>
#define EI_NIDENT 16

typedef struct {
  unsigned char   e_ident[EI_NIDENT];
  uint16_t        e_type;
  uint16_t        e_machine;
  uint32_t        e_version;
  uint64_t        e_entry;
  uint64_t        e_phoff;
  uint64_t        e_shoff;
  uint32_t        e_flags;
  uint16_t        e_ehsize;
  uint16_t        e_phentsize;
  uint16_t        e_phnum;
  uint16_t        e_shentsize;
  uint16_t        e_shnum;
  uint16_t        e_shstrndx;
} Elf64_Ehdr;
```
    </ScrollableView>
</Column>
<Column>
<ScrollableView height="380px">
```
00000000: 7f45 4c46 0201 0100 0000 0000 0000 0000  .ELF............
00000010: 0300 3e00 0100 0000 2015 0000 0000 0000  ..>..... .......
00000020: 4000 0000 0000 0000 1862 0000 0000 0000  @........b......
00000030: 0000 0000 4000 3800 0d00 4000 1f00 1e00  ....@.8...@.....
00000040: 0600 0000 0400 0000 4000 0000 0000 0000  ........@.......
00000050: 4000 0000 0000 0000 4000 0000 0000 0000  @.......@.......
00000060: d802 0000 0000 0000 d802 0000 0000 0000  ................
00000070: 0800 0000 0000 0000 0300 0000 0400 0000  ................
00000080: 1803 0000 0000 0000 1803 0000 0000 0000  ................
00000090: 1803 0000 0000 0000 1c00 0000 0000 0000  ................
000000a0: 1c00 0000 0000 0000 0100 0000 0000 0000  ................
000000b0: 0100 0000 0400 0000 0000 0000 0000 0000  ................
000000c0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
000000d0: 0010 0000 0000 0000 0010 0000 0000 0000  ................
000000e0: 0010 0000 0000 0000 0100 0000 0500 0000  ................
000000f0: 0010 0000 0000 0000 0010 0000 0000 0000  ................
00000100: 0010 0000 0000 0000 5d1e 0000 0000 0000  ........].......
00000110: 5d1e 0000 0000 0000 0010 0000 0000 0000  ]...............
00000120: 0100 0000 0400 0000 0030 0000 0000 0000  .........0......
00000130: 0030 0000 0000 0000 0030 0000 0000 0000  .0.......0......
00000140: e410 0000 0000 0000 e410 0000 0000 0000  ................
00000150: 0010 0000 0000 0000 0100 0000 0600 0000  ................
00000160: 884c 0000 0000 0000 885c 0000 0000 0000  .L.......\......
00000170: 885c 0000 0000 0000 c803 0000 0000 0000  .\..............
00000180: 2014 0000 0000 0000 0010 0000 0000 0000   ...............
00000190: 0200 0000 0600 0000 984c 0000 0000 0000  .........L......
000001a0: 985c 0000 0000 0000 985c 0000 0000 0000  .\.......\......
000001b0: f001 0000 0000 0000 f001 0000 0000 0000  ................
000001c0: 0800 0000 0000 0000 0400 0000 0400 0000  ................
000001d0: 3803 0000 0000 0000 3803 0000 0000 0000  8.......8.......
000001e0: 3803 0000 0000 0000 3000 0000 0000 0000  8.......0.......
000001f0: 3000 0000 0000 0000 0800 0000 0000 0000  0...............
00000200: 0400 0000 0400 0000 6803 0000 0000 0000  ........h.......
00000210: 6803 0000 0000 0000 6803 0000 0000 0000  h.......h.......
00000220: 4400 0000 0000 0000 4400 0000 0000 0000  D.......D.......
00000230: 0400 0000 0000 0000 53e5 7464 0400 0000  ........S.td....
00000240: 3803 0000 0000 0000 3803 0000 0000 0000  8.......8.......
00000250: 3803 0000 0000 0000 3000 0000 0000 0000  8.......0.......
00000260: 3000 0000 0000 0000 0800 0000 0000 0000  0...............
00000270: 50e5 7464 0400 0000 ac3b 0000 0000 0000  P.td.....;......
00000280: ac3b 0000 0000 0000 ac3b 0000 0000 0000  .;.......;......
00000290: 1401 0000 0000 0000 1401 0000 0000 0000  ................
000002a0: 0400 0000 0000 0000 51e5 7464 0600 0000  ........Q.td....
000002b0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
000002c0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
000002d0: 0000 0000 0000 0000 1000 0000 0000 0000  ................
000002e0: 52e5 7464 0400 0000 884c 0000 0000 0000  R.td.....L......
000002f0: 885c 0000 0000 0000 885c 0000 0000 0000  .\.......\......
00000300: 7803 0000 0000 0000 7803 0000 0000 0000  x.......x.......
00000310: 0100 0000 0000 0000 2f6c 6962 3634 2f6c  ......../lib64/l
00000320: 642d 6c69 6e75 782d 7838 362d 3634 2e73  d-linux-x86-64.s
00000330: 6f2e 3200 0000 0000 0400 0000 2000 0000  o.2......... ...
00000340: 0500 0000 474e 5500 0200 00c0 0400 0000  ....GNU.........
00000350: 0300 0000 0000 0000 0280 00c0 0400 0000  ................
00000360: 0100 0000 0000 0000 0400 0000 1400 0000  ................
00000370: 0300 0000 474e 5500 9dce 4a1b e2e6 1e98  ....GNU...J.....
00000380: 8bf8 584f 42a0 81ae bd2b 9b69 0400 0000  ..XOB....+.i....
00000390: 1000 0000 0100 0000 474e 5500 0000 0000  ........GNU.....
000003a0: 0300 0000 0200 0000 0000 0000 0000 0000  ................
000003b0: 0300 0000 2c00 0000 0100 0000 0600 0000  ....,...........
000003c0: 0001 a100 8001 1002 2c00 0000 2e00 0000  ........,.......
000003d0: 0000 0000 281d 8c1c d165 ce6d 6655 6110  ....(....e.mfUa.
000003e0: 39f2 8b1c 0000 0000 0000 0000 0000 0000  9...............
000003f0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
```
</ScrollableView>
</Column>
</Row>

---
currentNav: "Loading"
---

# Loading an Executable

<Row>
  <Column :width="'60%'">
    <h4>Loading Process:</h4>
    <ul>
      <li><strong>File Validation</strong> - OS checks magic bytes and file format</li>
      <li><strong>Permission Check</strong> - Verifies user has execute permissions</li>
      <li><strong>Memory Allocation</strong> - Allocates virtual memory space for the process</li>
      <li><strong>Header Parsing</strong> - Reads ELF header to find entry point and program headers</li>
      <li><strong>Segment Mapping</strong> - Maps file segments to memory using program headers</li>
      <li><strong>Dynamic Linking</strong> - Loads shared libraries if needed</li>
      <li><strong>Stack Setup</strong> - Creates initial stack frame and environment</li>
      <li><strong>Process Creation</strong> - Establishes process control block (PCB)</li>
      <li><strong>Jump to Entry</strong> - Transfers control to the program's entry point</li>
    </ul>
  </Column>
  <Column :width="'10%'">
    <div class="architecture-container">
      <ArchitectureLayerLabel label="Memory Layout" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid :columns="1">
            <ArchitectureItem text="Stack (grows down)" color="#ef4444" width="100%" />
            <ArchitectureItem text="Heap (grows up)" color="#f59e0b" width="100%" />
            <ArchitectureItem text="BSS (.bss)" color="#8b5cf6" width="100%" />
            <ArchitectureItem text="Data (.data)" color="#f59e0b" width="100%" />
            <ArchitectureItem text="Read-only (.rodata)" color="#6b7280" width="100%" />
            <ArchitectureItem text="Text (.text)" color="#10b981" width="100%" />
            <ArchitectureItem text="Headers (loaded)" color="#3b82f6" width="100%" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
    </div>
  </Column>
</Row>

---
currentNav: "Linking"
---

# Linking an Executable

- Static and dynamic linking

---
currentNav: "Loading"
---

# Loading an executable

Operating system will validate the file, verify execution permissions, allocate virtual memory for the process, parse the headers, map the segments into memory, load dynamic libraries, setup stack, initialize the process, and jump to the entry point.

<Row>
  <Column>
    <h3>Unloaded Executable (Disk)</h3>
    <div class="architecture-container">
      <ArchitectureLayerLabel label="ELF Structure" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid>
            <ArchitectureItem text="ELF Header" color="#3b82f6" />
            <ArchitectureItem text="Program Headers" color="#3b82f6" />
            <ArchitectureItem text="Section Headers" color="#3b82f6" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
      <ArchitectureLayerLabel label="File Sections" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid>
            <ArchitectureItem text=".text" color="#8b5cf6" />
            <ArchitectureItem text=".data" color="#8b5cf6" />
            <ArchitectureItem text=".bss" color="#8b5cf6" />
            <ArchitectureItem text=".rodata" color="#8b5cf6" />
            <ArchitectureItem text=".symtab" color="#8b5cf6" />
            <ArchitectureItem text=".debug" color="#8b5cf6" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
    </div>
  </Column>
  <Column>
    <h3>Loaded Executable (Memory)</h3>
    <div class="architecture-container">
      <ArchitectureLayerLabel label="Memory Segments" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid>
            <ArchitectureItem text="Text Segment" color="#10b981" />
            <ArchitectureItem text="Data Segment" color="#10b981" />
            <ArchitectureItem text="BSS Segment" color="#10b981" />
            <ArchitectureItem text="Heap" color="#10b981" />
            <ArchitectureItem text="Stack" color="#10b981" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
      <ArchitectureLayerLabel label="Key Differences" labelWidth="150px">
        <ArchitectureLayer>
          <ArchitectureGrid>
            <ArchitectureItem text="Sections: File organization" color="#ef4444" />
            <ArchitectureItem text="Segments: Memory layout" color="#ef4444" />
            <ArchitectureItem text="Multiple sections → One segment" color="#ef4444" />
            <ArchitectureItem text="Alignment requirements" color="#ef4444" />
          </ArchitectureGrid>
        </ArchitectureLayer>
      </ArchitectureLayerLabel>
    </div>
  </Column>
</Row>

<style>
.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: #e5e7eb;
  font-size: 1.25rem;
  font-weight: 600;
}
</style>

---
currentNav: "Lab 1"
---

## Lab 1

Initial binary triage.

[https://hacs408e.umd.edu/labs/week-03/lab-1/](https://hacs408e.umd.edu/labs/week-03/lab-1/)

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "Assembly"
---

# Assembly

Low-level programming language that is translated into the the architecture's byte-code. Here we will use the x86_64 architecture.

**Common Architectures**

- Intel x86/x86_64: Used by most desktop computers
- ARM: Used by mobile devices, IOT devices, and (increasingly) desktop computers
- MIPS: Used mostly by IOT devices

---
currentNav: "Assembly"
---

# Moving Data Around

Move immediates and other data between registers and the stack.

```asm
mov eax, 0x01        ;put 1 into eax
mov [eax], 0x01      ;put 1 into the address in eax
mov eax, [esi]       ;put contents of address (esi)
```

Push data on onto the stack.

```asm
push eax             ;put contents of eax on top of stack
push 0x01            ;put 1 on top of stack
                     ; and inc the stack pointer

pop eax              ;put contents top of the stack into eax,
                     ; and dec the stack pointer 
```

Displacements.

```asm
; [base + index*size + offset]
; size can only be 1,2,4,8
mov eax, [arr + esi*4 + 0]
```

---
currentNav: "Assembly"
---

# Moving Data Around

Load effective address does not access memory with the displacement operator! It only does the pointer arithmetic with no dereference! 

```asm
lea eax, ecx   ;invalid
lea eax, [ecx] ;valid, equivalent to mov eax, ecx

lea eax, [ecx + edx]   ;mov eax, ecx + edx*1 (implicit 1)
lea eax, [ecx + edx*3] ;invalid, valid numbers are 1,2,4,8

lea eax, [eax + edx*4] ;can be thought of as 
                       ; eax = (DWORD *)eax[edx] why?
```

---
currentNav: "Assembly"
---

# Directing Execution

Jumping to an address or label.

```asm
jmp addr     ;addr could be a register
             ; with an address or a label
this_is_a_label:
call addr    ; functions are just labels (addresses), with a calling convention
ret          ; using the correct calling convention, 
             ;  ret returns from the called function
syscall      ; more commonly seen as 'int' for interrupt
```

Jump if flags are set.

```asm
je addr  ; or jz  -- if zero flag is set
jg addr  ; or ja  -- if greater - signed or unsigned 
jl addr  ; or jb  -- if less    - signed or unsigned
jge addr ;        -- if greater or equal to
```

Common flags.

```asm
carry    -- used to indicate carry in arithmetic operation                    
zero     -- if a value is zero or comparison equals 0
sign     -- if negative
overflow -- if overflow occurred
```

---
currentNav: "Assembly"
---

# Intel vs AT&T

A given assembly architecture may have multiple syntaxes: Intel and AT&T syntaxes are the moxt common. We'll focus on the former but we want you to know the other exists. The main difference is in the source and destination operand order.

Intel

```asm
mov edi, esi
```

AT&T

```asm
mov %esi, %edi
```


---
currentNav: "Assembly"
---

# Walkthrough

We'll walk through how C code corresponds to the assembly.

<Row>
<Column>
```asm {*|21-23|25-27|29-30|32-33|34|1-3|5|6-7|9-10|12|13|14|15|17-19|35-36|38-41|*}{at:'0', maxHeight:'400px'}
foo:
    push ebp
    mov ebp, esp

    sub esp, 8            ;make room
    mov ecx, [ebp + 4]    ;get c
    mov edx, [ebp + 8]    ;get d
    
    mov eax, 4     ;sizeof(int)    
    mul edx        ;sizeof(int)*d
    
    push eax       ;arg to malloc
    call malloc    
    add esp, 4     ;clean up arg
    mov [esp], eax ;store in yeet
    
    add esp, 8     ;clean up locals
    pop ebp
    ret

main:
    push ebp
    mov ebp, esp
    
    push 5       ;a
    push 7       ;b
    sub esp, 4   ;bar
    
    mov eax, [esp + 4]      ;get b
    mov ebx, [esp + 8]      ;get a

    push ebx         ;d
    push eax         ;c
    call foo
    add esp, 8       ;clean up args  
    mov [esp], eax   ;store in bar

    add esp, 12      ;clean up locals
    mov eax, 0       ;return 0
    pop ebp
    ret
```
</Column>
<Column>
```c {*|8|9-10|11|11|11|1|2-3|3|3|3|3|3|3|5|11|13|*}{at:'+1', maxHeight: '400px'}
int *foo(c,d) {
    char e;
    void *yeet = malloc(sizeof(c)*d);
    /* Stop! */
    return (int *)yeet;
}

int main(int argc, char *argv[]) {
    int a = 5;
    int b = 7;
    char *bar = foo(a,b);
    
    return 0;
}
```
</Column>
</Row>

---
currentNav: "Lab 2"
---

## Lab 2

[https://hacs408e.umd.edu/schedule/week-02/lab-2/](https://hacs408e.umd.edu/schedule/week-02/lab-2/)

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

Second homework is due in two week.
