---
title: Binary Analysis II
layout: title-with-image
description: Assembly, calling conventions, and dynamic analysis
buttonText: Start Week 4
imageText: Week 4
slides:
  - Assembly
  - System V
  - Loading
  - Debugging
  - Lab 1
  - Tracing
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
currentNav: "Assembly"
---

# Assembly Review

Low-level programming language that is translated into the the architecture's byte-code. Here we will use the x86_64 architecture.

**Common Architectures**

- Intel x86/x86_64: Used by most desktop computers
- ARM: Used by mobile devices, IOT devices, and (increasingly) desktop computers
- MIPS: Used mostly by IOT devices

---
currentNav: "Assembly"
---

# Registers

- General purpose: `rax`, `rbx`, `rcx`, `rdx`, `rsi`, `rdi`, `rsp`, `rbp`, `r8`-`r15`
- Special purpose: program counter, counters, flags, floating point arithmetic, etc.

![Registers](/images/registers.svg)

---
currentNav: "Assembly"
---

# General Purpose Registers

These registers may be used for any purpose but generally follow these conventions.

| Name | 64-bit | 32-bit | 16-bit | Conventional Use |
|------|--------|--------|--------|-----|
| Accumulator | `rax` | `eax` | `ax` | Used for the return value of functions |
| Base | `rbx` | `ebx` | `bx` | Used as a pointer to data |
| Counter | `rcx` | `ecx` | `cx` | Used in loops and shift operations |
| Data | `rdx` | `edx` | `dx` | Used in I/O operations and arithmetic |
| Stack Pointer | `rsp` | `esp` | `sp` | Points to the top of the stack |
| Base Pointer | `rbp` | `ebp` | `bp` | Points to the base of the current stack frame |

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

# Comparisons and Branching

Assembly provides instructions for comparing values and controlling program flow based on the results.

**Comparison Instructions**

```asm
cmp eax, ebx    ;compare eax with ebx (sets flags)
test eax, eax   ;bitwise AND of eax with itself (sets flags)
```

**Conditional Jumps**

```asm
je addr  ; or jz  -- if zero flag is set (equal)
jne addr ; or jnz -- if zero flag is not set (not equal)
jg addr  ; or ja  -- if greater - signed or unsigned 
jl addr  ; or jb  -- if less    - signed or unsigned
jge addr ;        -- if greater or equal to
jle addr ;        -- if less or equal to
```

**Common flags used by comparisons**

```asm
CF (Carry Flag)    -- used to indicate carry in arithmetic operation                    
ZF (Zero Flag)     -- if a value is zero or comparison equals 0
SF (Sign Flag)     -- if negative
```

---
currentNav: "Assembly"
---

# Assembly Practice

The following examples are adapted from this book of assembly riddles.

<Row>
  <Column>
    <img src="/images/xchg_cover.png" style="height: 380px; width: 100%; object-fit: cover;"></img>
  </Column>
  <Column>
    <img src="/images/xchg_contents.png" style="height: 380px; width: 100%; object-fit: cover;"></img>
  </Column>
</Row>

---
currentNav: "Assembly"
---

# Assembly Practice 1

Let's walk through each line.

```asm {*|1|2|3|4|5-6|*}
mov      rdx,0
xor      eax,eax
and      esi,0
sub      edi,edi
push     0
pop      rbp
```

<v-click>

Different ways of setting a register to zero.

</v-click>

---
currentNav: "Assembly"
---

# Assembly Practice 2

What value ends up in `rax` after this code executes?

```asm {*|1-2|3|4-5|7|8|12|*}
main:
  mov rax, 0x100 
  mov rbx, 0x200
  cmp rax, rbx
  je equal_label

  mov rax, 0x300
  jmp end_label

equal_label:
    mov rax, 0x400
end_label:
```

<v-click>

<code>rax = 0x300</code>

</v-click>

---
currentNav: "Assembly"
---

# Assembly Practice 3

What value ends up in `rax` after this code executes?

```asm {*|1|2|3|4-6|7|8|9|10|*}
mov rax, 0x0
mov rbx, 0x1
mov rcx, 0x3
loop_start:
    test rcx, rcx
    jle  loop_end
    xchg rax, rbx
    add  rax, rbx
    dec  rcx
    jg   loop_start
loop_end:
```

<v-click>
<br>
Computes Fibonacci numbers by swapping <code>rax</code> and <code>rbx</code> each loop, adding them to produce the next term in <code>rax</code>, decrementing <code>rcx</code> until zero. The loop executes three times, so <code>rax</code> = 1, 1, 2.
</v-click>

---
currentNav: "System V"
---

# Application Binary Interface (ABI)

An ABI defines how compiled code interacts at runtime. This includes:

- How general purpose registers are used
- Calling conventions
- Data types sizes and layouts
- Symbols and linkage rules
- System call interfaces
- etc

---
currentNav: "System V"
---

# System V ABI

Defines the calling convention for x86_64 architecture, specifying how functions are called and how registers are used. It's the standard for Linux and includes the ELF format.

<Browser 
  url="https://www.sco.com/developers/gabi/latest/contents.html"
  width="100%"
  height="380px"
/>

---
currentNav: "System V"
---

# System V ABI

The ABI defines how calling conventions and return values are passed.

<Row>
  <Column>
    <h3>Function Arguments</h3>
    <p>Arguments are passed in registers in this order:</p>
    <ol>
      <li><code>rdi</code> - 1st argument</li>
      <li><code>rsi</code> - 2nd argument</li>
      <li><code>rdx</code> - 3rd argument</li>
      <li><code>rcx</code> - 4th argument</li>
      <li><code>r8</code> - 5th argument</li>
      <li><code>r9</code> - 6th argument</li>
    </ol>
    <p>Additional arguments are passed on the stack.</p>
  </Column>
  <Column>
    <h3>Return Values</h3>
    <ul>
      <li><code>rax</code> - Integer return value</li>
      <li><code>rdx:rax</code> - 128-bit return value</li>
      <li><code>xmm0</code> - Floating point return value</li>
    </ul>
  </Column>
</Row>

---
currentNav: "System V"
---

# Comparing different calling conventions

Comparison of 32-bit and 64-bit calling conventions.

| Aspect | cdecl (32-bit) | System V (64-bit) |
|--------|----------------|-------------------|
| **Arguments** | All on stack (right-to-left) | First 6 in registers, others on stack |
| **Return Values** | Integer: `eax`<br>64-bit: `edx:eax`<br>128-bit: Not supported<br>Floating point: Not supported | Integer: `rax`<br>64-bit: `rdx:rax`<br>128-bit: `rdx:rax`<br>Floating point: `xmm0` |

<v-click>
<br>
<i>Why might newer calling conventions use registers instead of the stack for passing arguments?</i>
</v-click>

---
currentNav: "Assembly"
---

# Register Volatility

By convention, some registers are expected to be preserved across function calls and some are not.

<Row>
  <Column>
    <h3>Volatile Registers</h3>
    <p><strong>Caller-saved</strong> - Values may be modified by called functions</p>
    <ul>
      <li><code>rax</code> - Return value</li>
      <li><code>rcx</code> - 4th argument</li>
      <li><code>rdx</code> - 3rd argument</li>
      <li><code>rsi</code> - 2nd argument</li>
      <li><code>rdi</code> - 1st argument</li>
      <li><code>r8-r11</code> - other arguments</li>
    </ul>
  </Column>
  <Column>
    <h3>Non-Volatile Registers</h3>
    <p><strong>Callee-saved</strong> - Values must be preserved by called functions</p>
    <ul>
      <li><code>rbx</code> - Must be preserved</li>
      <li><code>rbp</code> - Frame pointer</li>
      <li><code>rsp</code> - Stack pointer</li>
      <li><code>r12</code> - Must be preserved</li>
      <li><code>r13</code> - Must be preserved</li>
      <li><code>r14</code> - Must be preserved</li>
      <li><code>r15</code> - Must be preserved</li>
    </ul>
  </Column>
</Row>

---
currentNav: "Assembly"
---

# Virtual Memory Layout

Last week we talked about the sections and segments. Here's a broader view of the memory layout.

<Row>
  <Column>
    <ul>
      <li><strong>Virtual Memory</strong> - Executable code</li>
      <li><strong>Data Segment</strong> - Initialized global/static variables</li>
      <li><strong>BSS Segment</strong> - Uninitialized global/static variables</li>
      <li><strong>Heap</strong> - Dynamic memory allocation (malloc/free)</li>
      <li><strong>Stack</strong> - Function calls, local variables, return addresses</li>
      <li><strong>Kernel Space</strong> - Operating system code and data</li>
    </ul>
  </Column>
  <Column>
    <ScrollableView height="380px">
      <img src="/images/os-memory.png"></img>
    </ScrollableView>
  </Column>
</Row>

---
currentNav: "Debugging"
---

# Dynamic Analysis

Last week we introduced static analysis. This can be laborious for large binaries, so it's useful to analyze a program when it's running. Debugging with GDB is one strategy.

<ScrollableView height="380px">
<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>gdb ./program</code></td>
      <td>Start GDB with program</td>
    </tr>
    <tr>
      <td><code>run</code></td>
      <td>Start execution</td>
    </tr>
    <tr>
      <td><code>quit</code></td>
      <td>Exit GDB</td>
    </tr>
    <tr>
      <td><code>help</code></td>
      <td>Show help</td>
    </tr>
    <tr>
      <td><code>info registers</code></td>
      <td>Show all registers</td>
    </tr>
    <tr>
      <td><code>info breakpoints</code></td>
      <td>List breakpoints</td>
    </tr>
    <tr>
      <td><code>break main</code></td>
      <td>Set breakpoint at main</td>
    </tr>
    <tr>
      <td><code>break *0x401000</code></td>
      <td>Set breakpoint at address</td>
    </tr>
    <tr>
      <td><code>continue</code></td>
      <td>Continue execution</td>
    </tr>
    <tr>
      <td><code>step</code></td>
      <td>Step into function calls</td>
    </tr>
    <tr>
      <td><code>next</code></td>
      <td>Step over function calls</td>
    </tr>
    <tr>
      <td><code>finish</code></td>
      <td>Run until function returns</td>
    </tr>
    <tr>
      <td><code>x/10i $rip</code></td>
      <td>Disassemble 10 instructions</td>
    </tr>
    <tr>
      <td><code>x/10x $rsp</code></td>
      <td>Examine 10 words in hex</td>
    </tr>
    <tr>
      <td><code>x/s $rdi</code></td>
      <td>Examine as string</td>
    </tr>
    <tr>
      <td><code>disassemble main</code></td>
      <td>Disassemble function</td>
    </tr>
    <tr>
      <td><code>print $rax</code></td>
      <td>Print register value</td>
    </tr>
    <tr>
      <td><code>set $rax = 0</code></td>
      <td>Set register value</td>
    </tr>
  </tbody>
</table>
</ScrollableView>

---
currentNav: "Debugging"
---

# GDB Commands

Do we remember GDB commands?

1. **What command shows the current instruction pointer?**
   <v-click>
   <code>info registers rip</code> or <code>x/i $rip</code>
   </v-click>

2. **How do you set a breakpoint at the `main` function?**
   <v-click>
   <code>break main</code> or <code>b main</code>
   </v-click>

3. **How do you set a breakpoint at `0x400000`?**
   <v-click>
   <code>break *0x400000</code> or <code>b *0x400000</code>
   </v-click>

4. **How do you continue execution after hitting a breakpoint?**
   <v-click>
   <code>continue</code> or <code>c</code>
   </v-click>

---
currentNav: "Debugging"
---

# GDB Commands

Do we remember GDB commands?

5. **What's the difference between `step` and `next`?**
   <v-click>
   <code>step</code> goes into function calls, <code>next</code> steps over them
   </v-click>

6. **What does `x/s $rdi` do?**
   <v-click>
   Examines the memory pointed to by RDI as a string
   </v-click>

7. **How do you examine memory at address `0x401000` as hex?**
   <v-click>
   <code>x/x 0x401000</code>
   </v-click>

8. **What command sets the value of RAX to 0?**
   <v-click>
   <code>set $rax = 0</code>
   </v-click>

---
currentNav: "Debugging"
---

# GEF Plugin

To aid debugging for reverse engineering we've set up the `gef` plugin for GDB. It provides a number of new commands and a new view.

<ScrollableView height="380px">
  <img src="/images/gef.png"></img>
</ScrollableView>

---
currentNav: "Lab 1"
---

## Lab 1

Using GDB.

[https://hacs408e.umd.edu/labs/week-03/lab-1/](https://hacs408e.umd.edu/labs/week-03/lab-1/)

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "Tracing"
---

# Tracing

Debugging is an appropriate solution for fine-grained or precise analysis. For faster results it's sometimes useful to trace only specific aspects of your program's behavior.

- Data written to `stdout`/`stderr`
- Changes to the system file system
- Library function calls
- System calls

---
currentNav: "Tracing"
---

# Library Loading

Processes may load dynamic libraries that provide shared functionality. 

<div class="architecture-container">
  <ArchitectureLayerLabel label="User Applications" labelWidth="150px">
    <Row>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 1" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 2" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="Application 3" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureItem text="..." color="" />
      <ArchitectureArrow>
        <ArchitectureItem text="Application N" color="#3b82f6" />
      </ArchitectureArrow>
    </Row>
  </ArchitectureLayerLabel>
  <ArchitectureLayerLabel label="User Libraries" labelWidth="150px">
    <Row>
      <ArchitectureArrow>
        <ArchitectureItem text="libselinux.so" color="#3b82f6" width="200px"/>
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="libclang.so" color="#3b82f6" width="85px"/>
      </ArchitectureArrow>
      <ArchitectureItem text="..." color="" />
      <ArchitectureArrow>
        <ArchitectureItem text="lib*.so" color="#3b82f6" width="85px" />
      </ArchitectureArrow>
    </Row>
    <Row>
      <ArchitectureArrow>
        <ArchitectureItem text="libpthread.so" color="#3b82f6" />
      </ArchitectureArrow>
      <ArchitectureArrow>
        <ArchitectureItem text="libc.so" color="#3b82f6" width="200px"/>
      </ArchitectureArrow>
      <ArchitectureItem text="..." color="" />
      <ArchitectureArrow>
        <ArchitectureItem text="lib*.so" color="#3b82f6" width="85px" />
      </ArchitectureArrow>
    </Row>
  </ArchitectureLayerLabel>
  <ArchitectureBoundary userLabel="User Space" kernelLabel="Kernel Space" />
  <ArchitectureLayerLabel label="System Call Interface" labelWidth="150px">
    <ArchitectureLayer></ArchitectureLayer>
  </ArchitectureLayerLabel>
  <ArchitectureLayerLabel label="Kernel" labelWidth="150px">
    <ArchitectureLayer>
      <Row>
        <ArchitectureItem text="Process Mgmt" color="#059669" />
        <ArchitectureItem text="Memory Mgmt" color="#059669" />
        <ArchitectureItem text="File System" color="#059669" />
        <ArchitectureItem text="Network Stack" color="#059669" />
        <ArchitectureItem text="Audio" color="#059669" />
        <ArchitectureItem text="Device Mgmt" color="#059669" />
      </Row>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>
</div>

<style>
.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0.5rem;
}
</style>

---
currentNav: "Tracing"
---

# Library and System Call Tracing

Tracing the library and system calls within processes can provide useful information. On linux the following utilities support this.

- `ltrace` tracing library calls
- `strace` tracing system calls

---
currentNav: "Lab 2"
---

## Lab 2

[https://hacs408e.umd.edu/schedule/week-04/lab-2/](https://hacs408e.umd.edu/schedule/week-04/lab-2/)

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

Homework 2 is due next week.

Quiz 1 is next week at the beginning of class.