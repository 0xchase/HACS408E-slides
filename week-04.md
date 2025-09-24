---
title: Binary Analysis II
layout: title-with-image
description: Assembly, calling conventions, and dynamic analysis
buttonText: Start Week 4
imageText: Week 4
slides:
  - Review
  - Executables
  - Assembly
  - System V
  - Loading
  - Dynamic Analysis
  - Lab 1
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

# Assembly Review

Low-level programming language that is translated into the the architecture's byte-code. Here we will use the x86_64 architecture.

**Common Architectures**

- Intel x86/x86_64: Used by most desktop computers
- ARM: Used by mobile devices, IOT devices, and (increasingly) desktop computers
- MIPS: Used mostly by IOT devices

---
currentNav: "Review"
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
currentNav: "Review"
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

# Registers

- General purpose: `rax`, `rbx`, `rcx`, `rdx`, `rsi`, `rdi`, `rsp`, `rbp`, `r8`-`r15`
- Special purpose: counters, flags, floating point arithmetic, etc.
- Can access different portions of the same register

![Registers](/images/registers.svg)

---
currentNav: "Assembly"
---

# General Purpose Registers

These registers may be used for any purpose but generally follow these conventions.

| Name | 64-bit | 32-bit | 16-bit | Use |
|------|--------|--------|--------|-----|
| Accumulator | `rax` | `eax` | `ax` | Used for the return value of functions |
| Base | `rbx` | `ebx` | `bx` | Used as a pointer to data |
| Counter | `rcx` | `ecx` | `cx` | Used in loops and shift operations |
| Data | `rdx` | `edx` | `dx` | Used in I/O operations and arithmetic |
| Source Index | `rsi` | `esi` | `si` | Points to source data in string operations |
| Destination Index | `rdi` | `edi` | `di` | Points to destination in string operations |
| Stack Pointer | `rsp` | `esp` | `sp` | Points to the top of the stack |
| Base Pointer | `rbp` | `ebp` | `bp` | Points to the base of the current stack frame |

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

<Row>
  <Column>
    <h3>cdecl (32-bit)</h3>
    <p><strong>Arguments:</strong> All passed on the stack (right-to-left)</p>
    <ul>
      <li>Stack: <code>[arg3][arg2][arg1][return_addr]</code></li>
      <li>Caller cleans up stack</li>
    </ul>
    <p><strong>Return Values:</strong></p>
    <ul>
      <li><code>eax</code> - Integer return value</li>
      <li><code>edx:eax</code> - 64-bit return value</li>
    </ul>
  </Column>
  <Column>
    <h3>System V (64-bit)</h3>
    <p><strong>Arguments:</strong> First 6 in registers, rest on stack</p>
    <ul>
      <li>Registers: <code>rdi, rsi, rdx, rcx, r8, r9</code></li>
      <li>Stack: Additional arguments</li>
    </ul>
    <p><strong>Return Values:</strong></p>
    <ul>
      <li><code>rax</code> - Integer return value</li>
      <li><code>rdx:rax</code> - 128-bit return value</li>
      <li><code>xmm0</code> - Floating point return value</li>
    </ul>
  </Column>
</Row>

*Why might newer calling conventions use registers instead of the stack for passing arguments?*

---
currentNav: "Assembly"
---

# Registers across function calls

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
currentNav: "Dynamic Analysis"
---

# Dynamic Analysis

Last week we introduced static analysis. This can be laborious for large binaries, so it's useful to analyze a program when it's running. GDB is one strategy.

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
currentNav: "Dynamic Analysis"
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
currentNav: "Dynamic Analysis"
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
currentNav: "Dynamic Analysis"
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

[https://hacs408e.umd.edu/schedule/week-04/lab-2/](https://hacs408e.umd.edu/schedule/week-04/lab-2/)

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

Second homework is due next week.
