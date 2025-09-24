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
  - Lab 1
  - Code Analysis
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

# Hardware

The first step is usually understanding the hardware.

<ScrollableView height="400px">
  <img src="/images/router-board.png" style="height=100%; object-fit" />
</ScrollableView>

---
currentNav: "Platforms"
---

# Operating System

Some devices run the firmware directly (Arduino, Network Card, Motherboard, SSD, some IOT devices), but these days most have an operating system, whose primary purpose is providing an interface between user applications and the hardware.

<Row>
  <Column><img src="/images/windows.png"/></Column>
  <Column><img src="/images/macos.png" /></Column>
  <Column><img src="/images/linux.png" /></Column>
  <Column><img src="/images/ios.png" /></Column>
  <Column><img src="/images/android.png" /></Column>
  <Column><img src="/images/templeos.png" /></Column>
</Row>

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

Here's some questions.

<v-clicks depth="2">

- What's the *difference* between user and kernel mode?
- What's the *interface* between user and kernel mode?
- Which of these are handled by the user processes vs. the kernel?
  - `printf` formatting
  - Command parsing
  - Process creation
  - Heap management
  - Device drivers

</v-clicks>

---
currentNav: "Linux"
---

# Linux

Since most customized platforms run a linux variant, we'll focus on it as our operating system for platform analysis.

We'll look at

- Versioning
- File system locations to triage
- Application triage

---
currentNav: "Linux"
---

# System Versions

One critical piece of information for most platforms is its *version*.

Where can I find the operating system version?

<v-click>
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

</v-click>
<v-click>
Where can I find the kernel version?
</v-click>
<v-click>

```
$ cat /proc/version
Linux version 5.9.0-41-generic (buildd@...) (gcc (Ubuntu 13.3.0-6ubuntu2) 13.3.0) #41-Ubuntu SMP PREEMPT_DYNAMIC Fri Aug 16 12:34:56 UTC 2025
```

What [can I do](https://www.exploit-db.com/exploits/50808) with this information?
</v-click>


---
currentNav: "Linux"
---

# Linux Directory Structure

When analyzing a linux platform, it's useful to have a general understanding of the directory structure.

<Row>
  <Column>
  Some things to look for.

  - Where are user files (documents, downloads, etc)?
  - Where are the executables?
  - Where are libraries like libc?
  - Where's the list of users/groups?
  - Where are password hashes?
  - Where might I find other key material?

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
currentNav: "Linux"
---

# Startup Scripts

To get a comprehensive understanding of a system's services, it's useful to start with the system boot scripts.

**systemd**

<ScrollableView height="150px">

```
# /etc/systemd/system/myapp.service
[Unit]
Description=MyApp service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=myapp
Group=myapp
WorkingDirectory=/opt/myapp
EnvironmentFile=-/etc/default/myapp
# e.g. in /etc/default/myapp: MYAPP_PORT=8080 EXTRA_FLAGS="--verbose"
ExecStartPre=/usr/bin/mkdir -p /var/log/myapp /var/lib/myapp
ExecStart=/usr/local/bin/myapp --port=${MYAPP_PORT:-8080} ${EXTRA_FLAGS}
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

# (Optional) hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/myapp /var/log/myapp
```

</ScrollableView>

**initd**

<ScrollableView height="150px">

```
#!/bin/sh
# /etc/init.d/myapp
### BEGIN INIT INFO
# Provides:          myapp
# Required-Start:    $remote_fs $syslog $network
# Required-Stop:     $remote_fs $syslog $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: MyApp daemon
# Description:       Starts the myapp background service
### END INIT INFO

PATH=/sbin:/usr/sbin:/bin:/usr/bin
NAME=myapp
DAEMON=/usr/local/bin/myapp
DAEMON_OPTS="--port ${MYAPP_PORT:-8080} ${EXTRA_FLAGS}"
PIDFILE=/var/run/$NAME.pid
USER=myapp
LOGFILE=/var/log/$NAME.log
ENVFILE=/etc/default/$NAME

. /lib/lsb/init-functions
[ -r "$ENVFILE" ] && . "$ENVFILE"

do_start() {
    start-stop-daemon --start --quiet --background \
      --make-pidfile --pidfile "$PIDFILE" \
      --chuid "$USER" \
      --exec "$DAEMON" -- $DAEMON_OPTS >> "$LOGFILE" 2>&1 || return 2
}

do_stop() {
    start-stop-daemon --stop --quiet --pidfile "$PIDFILE" \
      --retry TERM/30/KILL/5 || return 2
    rm -f "$PIDFILE"
}

do_status() {
    status_of_proc -p "$PIDFILE" "$DAEMON" "$NAME"
}

case "$1" in
  start)   log_daemon_msg "Starting $NAME"; do_start;  log_end_msg $? ;;
  stop)    log_daemon_msg "Stopping $NAME"; do_stop;   log_end_msg $? ;;
  restart|force-reload)
           log_daemon_msg "Restarting $NAME"; do_stop; sleep 1; do_start; log_end_msg $? ;;
  status)  do_status; exit $? ;;
  *)       echo "Usage: $0 {start|stop|restart|force-reload|status}"; exit 2 ;;
esac
exit 0
```

</ScrollableView>

---
currentNav: "Lab 1"
---

## Lab 1

Firmware startup analysis.

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "Code Analysis"
---

# What to look for

You may want to further analyze an application you discover. In the rest of this course we'll mostly be analyzing compiled applications, but sometimes you'll have source available if it's written in a scripting language or is open source.

- Languages
- Frameworks
- Dependencies
- Versions
  - Public vulnerabilities

---
currentNav: "Code Analysis"
---

# Analysis Strategies

There's a variety of strategies for analyzing source code.

- Reading through the code: open it in `vscode`
- Running the application
  - `python3 -m http.server`
  - `npm run dev`
- Code analysis tools
  - Large language model
  - Query langauges like `CodeQL`

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

First homework is due next week.

I will be in Nevada wilderness from Thursday through next Monday.