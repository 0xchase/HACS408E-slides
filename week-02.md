---
title: Platform and Code Analysis
layout: title-with-image
description: Identifying system components and properties
buttonText: Start Week 2
imageText: Week 2
slides:
  - Review
  - Platforms
  - Linux
  - Reverse Engineering
  - File Identification
  - Lab 1
  - File Extraction
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

Some text goes here.

<CourseTimeline currentWeek="2" />

<WeekComparison 
  lastWeekSummary="File triage and extraction techniques, including magic bytes identification and file carving."
  lastWeekHomework="Lab exercises on file identification and extraction"
  thisWeekSummary="Platform analysis, reverse engineering fundamentals, and file identification methods."
  thisWeekHomework="Lab exercises on file identification and carving"
/>

---
currentNav: "Platforms"
---

# Platforms

Recent years has seen a proliferation of many different devices and platforms. The first step to reverse engineering one is understanding the platform.

<Row>
  <Column><img src="/images/iot-router.png" /></Column>
  <Column><img src="/images/iot-camera.png" /></Column>
  <Column><img src="/images/iot-fridge.png" /></Column>
  <Column><img src="/images/iot-watch.png" /></Column>
  <Column><img src="/images/balloon.png" /></Column>
</Row>

<v-clicks>

When analyzing a device we ask a variety of questions. 

- **Hardware**: What kind of device is it? What hardware components does it have?
- **Operating System**: What's the operating system? What version is it? Has it been modified?
- **Applications**: What services does it run? What ports? What dependencies?

</v-clicks>

---
currentNav: "Platforms"
---

# Operating System Architecture

Most operating systems follow this general architecture.

<div class="architecture-container">
  <ArchitectureLayerLabel label="User Applications" labelWidth="150px">
    <ArchitectureGrid>
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
    </ArchitectureGrid>
  </ArchitectureLayerLabel>

  <ArchitectureBoundary userLabel="User Space" kernelLabel="Kernel Space" />

  <ArchitectureLayerLabel label="System Call Interface" labelWidth="150px">
    <ArchitectureLayer></ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Kernel" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="Process Mgmt" color="#059669" />
        <ArchitectureItem text="Memory Mgmt" color="#059669" />
        <ArchitectureItem text="File System" color="#059669" />
        <ArchitectureItem text="Network Stack" color="#059669" />
        <ArchitectureItem text="Audio" color="#059669" />
        <ArchitectureItem text="Device Mgmt" color="#059669" />
      </ArchitectureGrid>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Device Drivers" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="Block Drivers" color="#dc2626" />
        <ArchitectureItem text="Network Drivers" color="#dc2626" />
        <ArchitectureItem text="FS Drivers" color="#dc2626" />
        <ArchitectureItem text="Char Drivers" color="#dc2626" />
      </ArchitectureGrid>
    </ArchitectureLayer>
  </ArchitectureLayerLabel>

  <ArchitectureLayerLabel label="Hardware" labelWidth="150px">
    <ArchitectureLayer>
      <ArchitectureGrid>
        <ArchitectureItem text="CPU" color="#6b7280" />
        <ArchitectureItem text="Memory" color="#6b7280" />
        <ArchitectureItem text="Storage" color="#6b7280" />
        <ArchitectureItem text="Network" color="#6b7280" />
        <ArchitectureItem text="Audio" color="#6b7280" />
      </ArchitectureGrid>
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
currentNav: "Platforms"
---

# Test Your Comprehension

Should have a custom Q/A component.

<v-clicks depth="2">

- What's the interface between user and kernel mode?
- Some other question?
- Some other question?
- Some other question?

</v-clicks>

---
currentNav: "Linux"
---

# We'll Cover

Should have a custom Q/A component.

- Applications and kernel
- File system (interesting directories)
- Security relevant (passwords, users, ssh keys, etc)

---
currentNav: "Linux"
---

# Linux Directory Structure

When analyzing a linux platform, it's useful to have a general understanding of the directory structure.

<Row>
  <Column>
  Some things to look for.

  <v-clicks depth="2">

  - Where are user files (documents, downloads, etc)?
  - Where are the executables?
  - Where are libraries like libc?
  - Where's the list of users/groups?
  - Where are password hashes?
  - Where might I find other key material?

  </v-clicks>

  </Column>
  <Column>
    <ScrollableView height="360px">
      <DirectoryEntry name="/" description="Root directory" :expanded="true">
        <DirectoryEntry name="bin" description="Essential binaries" :expanded="false">
          <FileEntry name="bash" description="Bourne Again Shell" />
          <FileEntry name="ls" description="List directory contents" />
          <FileEntry name="cp" description="Copy files" />
          <FileEntry name="mv" description="Move/rename files" />
          <FileEntry name="rm" description="Remove files" />
        </DirectoryEntry>
        <DirectoryEntry name="sbin" description="System binaries" :expanded="false">
          <FileEntry name="init" description="System initialization" />
          <FileEntry name="mount" description="Mount filesystems" />
          <FileEntry name="umount" description="Unmount filesystems" />
          <FileEntry name="ifconfig" description="Network interface config" />
        </DirectoryEntry>
        <DirectoryEntry name="etc" description="Configuration files" :expanded="false">
          <FileEntry name="passwd" description="User accounts" />
          <FileEntry name="shadow" description="Encrypted passwords" />
          <FileEntry name="hosts" description="Hostname resolution" />
          <FileEntry name="fstab" description="Filesystem table" />
          <DirectoryEntry name="systemd" description="System service configs">
            <FileEntry name="system.conf" description="System configuration" />
            <FileEntry name="user.conf" description="User configuration" />
          </DirectoryEntry>
        </DirectoryEntry>
        <DirectoryEntry name="home" description="User directories" :expanded="false">
          <DirectoryEntry name="alice" description="Alice's home directory">
            <FileEntry name=".bashrc" description="Bash configuration" />
            <FileEntry name=".profile" description="User profile" />
            <DirectoryEntry name="Documents" description="User documents" />
            <DirectoryEntry name="Downloads" description="Downloaded files" />
          </DirectoryEntry>
          <DirectoryEntry name="bob" description="Bob's home directory" />
        </DirectoryEntry>
        <DirectoryEntry name="usr" description="User programs" :expanded="false">
          <DirectoryEntry name="bin" description="User binaries" :expanded="false">
            <FileEntry name="gcc" description="GNU Compiler Collection" />
            <FileEntry name="python3" description="Python interpreter" />
            <FileEntry name="git" description="Version control" />
            <FileEntry name="vim" description="Text editor" />
          </DirectoryEntry>
          <DirectoryEntry name="lib" description="Libraries" :expanded="false">
            <FileEntry name="libc.so.6" description="C standard library" />
            <FileEntry name="libssl.so.1.1" description="SSL library" />
            <DirectoryEntry name="python3.8" description="Python libraries">
              <FileEntry name="os.py" description="Operating system interface" />
              <FileEntry name="sys.py" description="System parameters" />
            </DirectoryEntry>
          </DirectoryEntry>
          <DirectoryEntry name="include" description="Header files" :expanded="false">
            <FileEntry name="stdio.h" description="Standard I/O" />
            <FileEntry name="stdlib.h" description="Standard library" />
            <FileEntry name="string.h" description="String functions" />
          </DirectoryEntry>
          <DirectoryEntry name="share" description="Shared data" :expanded="false">
            <DirectoryEntry name="man" description="Manual pages">
              <FileEntry name="man1" description="User commands" />
              <FileEntry name="man2" description="System calls" />
              <FileEntry name="man3" description="Library functions" />
            </DirectoryEntry>
          </DirectoryEntry>
        </DirectoryEntry>
        <DirectoryEntry name="var" description="Variable data" :expanded="false">
          <DirectoryEntry name="log" description="Log files" :expanded="false">
            <FileEntry name="syslog" description="System log" />
            <FileEntry name="auth.log" description="Authentication log" />
            <FileEntry name="kern.log" description="Kernel log" />
          </DirectoryEntry>
          <DirectoryEntry name="cache" description="Cache files" />
          <DirectoryEntry name="tmp" description="Temporary files" />
          <DirectoryEntry name="spool" description="Spool directories" />
        </DirectoryEntry>
        <DirectoryEntry name="tmp" description="Temporary files" />
        <DirectoryEntry name="opt" description="Optional software" :expanded="false">
          <DirectoryEntry name="google" description="Google software">
            <DirectoryEntry name="chrome" description="Chrome browser" />
          </DirectoryEntry>
          <DirectoryEntry name="microsoft" description="Microsoft software">
            <DirectoryEntry name="vscode" description="Visual Studio Code" />
          </DirectoryEntry>
        </DirectoryEntry>
        <DirectoryEntry name="proc" description="Process information" :expanded="false">
          <FileEntry name="cpuinfo" description="CPU information" />
          <FileEntry name="meminfo" description="Memory information" />
          <FileEntry name="version" description="Kernel version" />
          <DirectoryEntry name="1" description="Process 1 (init)">
            <FileEntry name="cmdline" description="Command line" />
            <FileEntry name="status" description="Process status" />
            <FileEntry name="fd" description="File descriptors" />
          </DirectoryEntry>
        </DirectoryEntry>
        <DirectoryEntry name="sys" description="System information" :expanded="false">
          <DirectoryEntry name="kernel" description="Kernel parameters">
            <FileEntry name="version" description="Kernel version" />
            <FileEntry name="hostname" description="System hostname" />
          </DirectoryEntry>
          <DirectoryEntry name="devices" description="Device information" />
          <DirectoryEntry name="fs" description="Filesystem information" />
        </DirectoryEntry>
        <DirectoryEntry name="dev" description="Device files" :expanded="false">
          <FileEntry name="null" description="Null device" />
          <FileEntry name="zero" description="Zero device" />
          <FileEntry name="random" description="Random number generator" />
          <FileEntry name="urandom" description="Non-blocking random" />
          <FileEntry name="tty" description="Terminal device" />
          <FileEntry name="sda" description="First SATA disk" />
          <FileEntry name="sda1" description="First partition" />
        </DirectoryEntry>
        <DirectoryEntry name="boot" description="Boot files" :expanded="false">
          <FileEntry name="vmlinuz" description="Kernel image" />
          <FileEntry name="initrd.img" description="Initial RAM disk" />
          <FileEntry name="grub" description="GRUB bootloader" />
        </DirectoryEntry>
        <DirectoryEntry name="lib" description="Essential libraries" :expanded="false">
          <FileEntry name="ld-linux-x86-64.so.2" description="Dynamic linker" />
          <FileEntry name="libc.so.6" description="C standard library" />
          <FileEntry name="libm.so.6" description="Math library" />
        </DirectoryEntry>
        <DirectoryEntry name="mnt" description="Mount points" />
        <DirectoryEntry name="media" description="Removable media" />
        <DirectoryEntry name="run" description="Runtime data" />
      </DirectoryEntry>
    </ScrollableView>
  </Column>
</Row>

---
currentNav: "Linux"
---

# System Versions

One critical piece of information for most platforms is its *version*.

Operating system version.

```
$ cat /etc/issue
Ubuntu 24.04.1 LTS \n \l
```

```
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="24.04.1 LTS (Noble Numbat)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 24.04.1 LTS"
VERSION_ID="24.04"
```

Kernel version.

```
$ cat /proc/version
Linux version 5.9.0-41-generic (buildd@...) (gcc (Ubuntu 13.3.0-6ubuntu2) 13.3.0) #41-Ubuntu SMP PREEMPT_DYNAMIC Fri Aug 16 12:34:56 UTC 2025
```

What [can I do](https://www.exploit-db.com/exploits/50808) with this information?

---
currentNav: "Linux"
---

# Application Versions

What are some ways we might get an application's version?

<v-click>
<b>For a Binary File</b>

```
$ strings launchctl | grep -i "version "
Darwin Bootstrapper Control Interface Version 7.0.0: Fri Jul 11 20:01:57 PDT 2025; root:libxpc_executables-2894.140.12~26/launchctl/RELEASE_ARM64E
[%s]: entitlements blob has unexpected version %lld
```

```
$ strings bash | grep -i version
GNU bash, version %s-(%s)
display-shell-version
    version, type `enable -n test'.  On systems supporting dynamic
BASH_VERSION
Version information for this Bash.
The type of CPU this version of Bash is running under.
```

**Configuration Files**

- Sometimes have useful information
- No rules here

</v-click>

---
currentNav: "Reverse Engineering"
---

# Topics for this course

We don't have time to cover every aspect of software reverse engineering. These will be our focus.

- Identify and characterize arbitrary files
- Analyze source code and compiled binaries
- Some coverage of Linux and Windows internals
- Network protocols
- Malware Analysis
- Vulnerability Analysis and Exploitation
- Modern Applications and Languages

---
currentNav: "Reverse Engineering"
---

# Jobs that use Reverse Engineering

Since this is an *applied* course, we're focused on skills that are immediately applicable in the workforce. Quiz questions will be inspired by questions I've gotten in interviews.

- Security Researcher
- Malware Analyst
- Forensic Analyst
- Incident Response
- Vulnerability Analyst
- Security Operations Center Analyst
- Computer Network Operations Developer
- **Software Engineer**
- ...

---
layout: section
title: "Lab Setup"
currentNav: "Lab Setup"
---

---
currentNav: "File Identification"
---

# File Identification

**Scenario**: You're given a file of an unknown type. How can you identify it to begin your analysis?

<v-clicks depth="2">

- Double click it and see what happens
  - Might not work for all files
  - Could be malicious
- Look for the extension extension (`.exe`, `.pdf`, `.`)
  - Might not have one
  - Malware authors might alter it to make a malicious file appear legitimate
- Thankfully, most file types have a publically documented "magic bytes" 
  - These are a signature (usually 4-8 bytes) that identify different file types
  - At the beginning of the file

</v-clicks>

---
currentNav: "File Identification"
---

## Identifying Magic Bytes

You can dump the hex of a file using the `xxd` utility.

```
chase@Chases-MacBook-Pro ~ % xxd /bin/ls | head
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

**Note**: Magic bytes aren't infallible. `0xcafebabe` is used to identify both Mach-O binaries and Java classes.

```
chase@Chases-MacBook-Pro ~ % file /bin/ls
/bin/ls: Mach-O universal binary with 2 architectures
```

---
currentNav: "Lab 1"
---

## Lab 1

File identification.

[https://hacs408e.umd.edu/schedule/week-01/lab-1/](https://hacs408e.umd.edu/schedule/week-01/lab-1/)

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "File Extraction"
---

## File Carving

Sometimes a single binary blob will have multiple files embedded in it. We can use `dd` to carve those files from the blob.

`dd if=example.bin of=output.bin skip=SKIP_BYTES bs=1 count=SIZE`

```c [example.bin] {all|6|11|6-10|11|16|11-15|16|22|16-21|22|all}{maxHeight: '330px',lines: true}
00000000: AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99  ........"3DUfw..
00000010: 00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF  .."3DUfw........
00000020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001010: FF EE DD CC BB AA 99 88 77 66 55 44 33 22 11 00  ........wfUD3"..
00001020: 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52  .PNG......IHDR
00002000: 00 00 02 80 00 00 01 E0 08 06 00 00 00 75 71 3C  ..............uq<
00002010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00002020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00003000: 4C 00 00 00 04 67 41 4D 41 00 00 B1 8F 0B FC 61  L....gAMA......a
00003010: FF D8 FF E0 00 10 4A 46 49 46 00 01 02 01 00 60  ......JFIF.....`
00003020: 00 60 00 00 FF DB 00 43 00 08 06 06 07 06 05 08  .`.....C........
00004000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00005000: 50 4B 03 04 14 00 06 00 08 00 00 00 21 00 B3 AC  PK..........!...
00005010: 8D 4E 00 00 00 00 00 00 00 00 00 00 08 00 1C 00  .N..............
00005020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006010: 74 65 73 74 2E 74 78 74 55 54 09 00 03 E8 3D 75  test.txtUT....=u
00006020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00007000: 7F 45 4C 46 02 01 01 00 00 00 00 00 00 00 00 00  .ELF............
00007010: 02 00 3E 00 01 00 00 00 78 00 40 00 00 00 00 00  ..>.....x.@.....
00007020: 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  @...............
00008000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
```

---
currentNav: "Lab 2"
---

## Lab 2

[https://hacs408e.umd.edu/schedule/week-01/lab-2/](https://hacs408e.umd.edu/schedule/week-01/lab-2/)

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

First homework is due next week.